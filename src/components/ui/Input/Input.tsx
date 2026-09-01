import styles from "./Input.module.css";

interface PropTypes {
  label: string,
  name: string,
  id: string,
  type: string,
  placeholder?: string,
  required: true,
  className?: string,
}

const Input = (props: PropTypes) => {
  const {
    label,
    name,
    id,
    type = "text",
    placeholder,
    required,
    className,
  } = props;

  return (
    <label htmlFor={id} className={styles.label}>
      {label}
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        required={required}
        className={`${styles.input} ${className}`}
      />
    </label>
  );
};

export default Input;
