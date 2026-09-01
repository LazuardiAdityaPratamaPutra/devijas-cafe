import styles from "./Login.module.css";
import Input from "../../ui/Input";
import Button from "../../ui/Button/Button";
import backgroundLogin from "../../../assets/background-login.jpg";
import type { FormEvent } from "react";
import login from "../../../services/auth.service";
import { setLocalStorage } from "../../../utils/storage";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const payload = {
      email: form.email.value,
      password: form.password.value,
    };
    const result = await login(payload);
    setLocalStorage("auth", result.token);
    navigate("/dashboard", {replace: true});
  };
  return (
    <main className={styles.login}>
      <img
        src={backgroundLogin}
        alt="Background Login De Vijas"
        className={styles.img}
      />
      <div className={styles.card}>
        <h1 className={styles.header}>Welcome Back</h1>
        <h4 className={styles.desc}>Please enter your details</h4>
        <form className={styles.form} onSubmit={handleLogin}>
          <Input
            label="Email"
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <Input
            label="Password"
            name="password"
            id="password"
            type="password"
            placeholder="*********"
            required
          />
          <Button type="submit" fullWidth>Login</Button>
        </form>
      </div>
    </main>
  );
};

export default Login;
