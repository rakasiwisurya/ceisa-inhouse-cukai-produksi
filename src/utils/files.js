import { notification } from "antd";

export const download = (blob, filename) => {
  const reader = new FileReader();

  reader.onload = () => {
    const arrayBuffer = reader.result;

    const bytes = new Uint8Array(arrayBuffer).subarray(0, 4);
    const hexString = bytes.reduce((acc, byte) => acc + byte.toString(16).padStart(2, "0"), "");

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
      "504b0304": "xlsx",
    };

    const fileExtension = fileSignatures[hexString];

    if (fileExtension) {
      const fileName = `${filename}.${fileExtension}`;

      const tempLink = document.createElement("a");
      const blobUrl = URL.createObjectURL(blob);
      tempLink.href = blobUrl;
      tempLink.setAttribute("download", fileName);
      tempLink.click();
      URL.revokeObjectURL(blobUrl);
    } else {
      console.error("Unknown file type");
      notification.info({ message: "Info", description: "Unknown file type" });
    }
  };

  reader.readAsArrayBuffer(blob);
};

export const downloadFile = (blob, filename) => {
  const blobUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = blobUrl;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  URL.revokeObjectURL(blobUrl);
};
