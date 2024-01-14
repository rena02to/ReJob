import "./TextareaCustom.css";

const TextareaCustom = ({ label, ...props }) => {
    return (
        <div className="campo textareaCustom">
            <label htmlFor={props.id}>{label} <span>*</span></label>
            <textarea {...props} />
        </div>
    );
}
 
export default TextareaCustom;