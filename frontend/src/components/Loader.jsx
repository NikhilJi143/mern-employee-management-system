import "../assets/styles/loader.css";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="loader-container">
      <div className="loader"></div>

      <p>{text}</p>
    </div>
  );
};

export default Loader;
