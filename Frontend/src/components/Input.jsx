import './Input.css';

export const Input = ({ setValueInput, value, id, placeholder }) => {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => setValueInput(() => e.target.value)}
      placeholder={placeholder}
      className="input-busqueda"
    />
  );
};
