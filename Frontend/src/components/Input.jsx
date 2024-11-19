import './Input.css';

export const Input = ({ setValueInput, id, placeholder }) => {
  return (
    <input
      id={id}
      type="text"
      onChange={(e) => setValueInput(e.target.value)}
      placeholder={placeholder}
      className="input-busqueda"
    />
  );
};
