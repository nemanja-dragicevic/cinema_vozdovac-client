const MovieBackground = ({ base64Image }) => {
  if (base64Image === null) return null;
  if (base64Image !== null) console.log("Ima");
  // Remove the data:image/jpeg;base64, prefix from the base64 string
  const base64WithoutPrefix = base64Image.replace(
    /^data:image\/[a-z]+;base64,/,
    ""
  );

  // Decode the base64 string
  const decodedImage = atob(base64WithoutPrefix);

  // Create a Uint8Array from the decoded string
  const bytes = new Uint8Array(decodedImage.length);
  for (let i = 0; i < decodedImage.length; i++) {
    bytes[i] = decodedImage.charCodeAt(i);
  }

  // Create a blob from the bytes
  const blob = new Blob([bytes], { type: "image/jpeg" });

  // Create a URL for the blob
  const imageUrl = URL.createObjectURL(blob);
  return (
    <div
      className="blur_back bright_back"
      style={{ backgroundImage: `url(${imageUrl})` }}
    ></div>
  );
};

export default MovieBackground;
