export const base64toBlob = (b64Data, contentType) => {
  const binaryData = atob(b64Data);

  const arrayBuffer = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    arrayBuffer[i] = binaryData.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: contentType });
};
