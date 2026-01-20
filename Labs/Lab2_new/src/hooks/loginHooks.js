import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../context/LoginContext";

export function useLogin() {
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const { login } = useLoginContext();

  const handleLogin = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    setValidated(true);

    const data = new FormData(form);

    if (data.get("username") === "admin" && data.get("password") === "123456") {
      login(data.get("username"));
      setError("");
      navigate("/home");
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  const handleCancel = () => {
    setError("");
    setValidated(false);
    if (formRef.current) formRef.current.reset();
  };

  return {
    error,
    validated,
    formRef,
    handleLogin,
    handleCancel,
  };
}
