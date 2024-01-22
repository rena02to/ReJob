import "./SelectCustom.css";

const SelectCustom = ({ label, options, ...props }) => {
  return (
    <div className="campo mt-4">
      <label>
        {label} <span>*</span>
      </label>
      <select className="select-estiloso" {...props}>
        <option value="">Selecione...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCustom;
