import { notification } from "antd";

export const download = (blob) => {
  // Create a FileReader to read the Blob content
  const reader = new FileReader();

  reader.onload = () => {
    const arrayBuffer = reader.result;

    // Get the first few bytes as a hexadecimal string
    const bytes = new Uint8Array(arrayBuffer).subarray(0, 4);
    const hexString = bytes.reduce((acc, byte) => acc + byte.toString(16).padStart(2, "0"), "");

    // Define common file signatures (magic numbers)
    const fileSignatures = {
      ffd8ffe0: "jpeg",
      "89504e47": "png",
      47494638: "gif",
      "424d": "bmp",
      "49492a00": "tif",
      "4d4d002a": "tiff",
      52494646: "webp",
      "00000100": "ico",
      25504446: "pdf",
      // Add more file signatures as needed
    };

    // Check if the hexString matches any known file signature
    const fileExtension = fileSignatures[hexString];

    if (fileExtension) {
      // If a matching file signature is found, set the file name accordingly
      const fileName = `etiket.${fileExtension}`;

      // Create a temporary link for downloading
      const tempLink = document.createElement("a");
      tempLink.href = window.URL.createObjectURL(blob);
      tempLink.setAttribute("download", fileName);

      // Simulate a click to trigger the download
      tempLink.click();
    } else {
      console.error("Unknown file type");
      notification.info({ message: "Info", description: "Unknown file type" });
    }
  };

  reader.readAsArrayBuffer(blob);
};
