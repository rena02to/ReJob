import "./TextareaCustom.css";

const TextareaCustom = ({ label, ...props }) => {
    return (
        <div className="campo textareaCustom">
            <label htmlFor={props.id}>{label} <span>*</span></label>
            <textarea {...props} />
            <span className="countChar">(Quantidade de caracteres mínima: 500) {props.countchar}/{props.charmax}</span>
        </div>
    );
}
 
export default TextareaCustom;