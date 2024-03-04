const MovieBackground = ({ small, base64Image }) => {
  if (base64Image === null) return null;

  const decodedImage = atob(base64Image);

  const bytes = new Uint8Array(decodedImage.length);
  for (let i = 0; i < decodedImage.length; i++) {
    bytes[i] = decodedImage.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: "image/jpeg" });

  const imageUrl = URL.createObjectURL(blob);
  return small ? (
    <img className="locandina" src={imageUrl} alt="Movie"></img>
  ) : (
    <div
      className="blur_back bright_back"
      style={{ backgroundImage: `url(${imageUrl})` }}
    ></div>
  );
};

export default MovieBackground;
