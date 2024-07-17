export function decode(base64Image) {
  const decodedImage = atob(base64Image);

  const bytes = new Uint8Array(decodedImage.length);
  for (let i = 0; i < decodedImage.length; i++) {
    bytes[i] = decodedImage.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: "image/jpeg" });

  return URL.createObjectURL(blob);
}

export function base64ToBlob(base64String) {
  const byteCharacters = atob(base64String);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: "image/png" }); // Adjust type as needed
}
