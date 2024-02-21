import "./InputCustom.css";

const InputCustom = ({ label, width, ...props }) => {
  return (
    <div
      className="campo"
      style={{
        maxWidth: width,
      }}
    >
      {label && (
        <label>
          {label} <span>*</span>
        </label>
      )}
      <input {...props} />
    </div>
  );
};

export default InputCustom;
