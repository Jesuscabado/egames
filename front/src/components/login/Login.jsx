import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Axios from "axios";
import "./Login.scss";
import NavBar from "../navBar/NavBar";
import Footer from "../Footer/Footer";
import "./Login.scss";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const id = searchParams.get("id");
    if (token) {
      localStorage.setItem("infoUser", JSON.stringify({ token, id }));
      setSearchParams("");
      navigate("/");
    }
  });
  const getData = async (email, password) => {
    try {
      const response = await Axios.post(
        "https://api.hyruleshop.jesuscabado.com/api/auth/login",
        {
          email,
          password,
        }
      );
      goTo("/");
      console.log(response);
      localStorage.setItem("infoUser", JSON.stringify(response.data));
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data);
      }
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    getData(email, password);
  };

  const goTo = (url) => {
    navigate(url);
  };

  return (
    <div>
      <NavBar></NavBar>
      <br />
      <br />
      <p>{errorMessage}</p>
      <div className="login-container">
        <h1 className="login-tittle">Login</h1>
        <form action="" onSubmit={submit} className="form">
          <label htmlFor="email">Email </label>
          <input type="email" name="email" id="email" />
          <br />
          <br />
          <label htmlFor="password">Password </label>
          <input type="password" name="password" id="password" />
          <br />
          <button>Iniciar sesión</button>
        </form>
        <a href="https://api.hyruleshop.jesuscabado.com/api/auth/google">
          Iniciar sesión con Google
        </a>
        <br />
        <Link to="/register">¿No tienes cuenta? ¡Pues créate una!</Link>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
