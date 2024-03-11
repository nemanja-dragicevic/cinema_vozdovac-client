export function decode(base64Image) {
  const decodedImage = atob(base64Image);

  const bytes = new Uint8Array(decodedImage.length);
  for (let i = 0; i < decodedImage.length; i++) {
    bytes[i] = decodedImage.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: "image/jpeg" });

  return URL.createObjectURL(blob);
}
