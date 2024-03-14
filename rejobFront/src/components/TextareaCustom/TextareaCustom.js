import "./TextareaCustom.css";

const TextareaCustom = ({ label, maxWidth, ...props }) => {
  return (
    <div className="campo textareaCustom" style={{ maxWidth }}>
      <label htmlFor={props.id}>
        {label} <span>*</span>
      </label>
      <textarea {...props} />
      <span className="countChar">
        {props.countchar}/{props.charmax}
      </span>
    </div>
  );
};

export default TextareaCustom;
