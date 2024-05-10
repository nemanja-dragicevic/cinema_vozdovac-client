import { decode } from "../utils/decode";

const MovieBackground = ({ small, base64Image, nameClass, toDecode }) => {
  if (base64Image === null) return null;

  var imageUrl = base64Image;
  if (toDecode) imageUrl = decode(base64Image);

  return small ? (
    <img className={nameClass} src={imageUrl} alt="Movie"></img>
  ) : (
    <div
      className={nameClass}
      style={{ backgroundImage: `url(${imageUrl})` }}
    ></div>
  );
};

export default MovieBackground;
