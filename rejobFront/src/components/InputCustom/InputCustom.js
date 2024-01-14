import './InputCustom.css'

const InputCustom = ({ label, ...props}) => {
    return ( 
        <div className="campo">
        <label>{label} <span>*</span></label>
        <input {...props} />
      </div>
    );
}
 
export default InputCustom;