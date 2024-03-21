const FormSelect = ({ label, size, name, items, defaultValue }) => {
  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        className={`select select-bordered ${size}`}
        name={name}
        id={name}
        defaultValue={defaultValue}
      >
        {items?.map((item, index) => {
          return (
            <option value={item} key={index}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
