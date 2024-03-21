const FormInput = ({ label, size, name, type, placeHolder, defaultValue }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">
          {label || "default label"}
        </span>
      </label>
      <input
        className={`input input-bordered ${size}`}
        type={type || "text"}
        placeholder={placeHolder || ""}
        name={name || ""}
        defaultValue={defaultValue || ""}
      />
    </div>
  );
};

export default FormInput;
