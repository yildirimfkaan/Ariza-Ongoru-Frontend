/* eslint-disable max-len */
import React, { useState } from "react";
import { Form, Col, Button, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import userData from "../data/userData.js";

function Login({ ...props }) {
  //   const { login } = props;
  const [state, setState] = useState({
    data: {
      username: "",
      password: "",
    },
    errors: {},
  });
  const jsonusername = "baris";
  const jsonpassword = "string";
  // console.log(userData[0], userData[1], userData[2]);
  const validate = () => {
    const { data } = state;
    const errors = {};

    if (data.username === "") errors.username = "Username cannot be blank.";
    if (data.password === "") errors.password = "Password cannot be blank.";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { data } = state;
    const errors = validate();
    const payload = {
      data,
      history: props.history,
    };
    if (Object.keys(errors).length === 0) {
      //   login(payload);
      if (
        data.username === userData[0].username &&
        data.password === userData[0].password
      ) {
        setState({
          data: {
            username: "",
            password: "",
          },
          errors: {},
        });
        const index = 0;
        localStorage.setItem("user", userData[0].username);
        localStorage.setItem("index", index);
        localStorage.setItem("userNewAKK1", userData[index].akk);
        
        localStorage.setItem("totalAKK",userData[index].akk)
        window.location = "/";
      }
      if (
        data.username === userData[1].username &&
        data.password === userData[1].password
      ) {
        setState({
          data: {
            username: "",
            password: "",
          },
          errors: {},
        });
        const index = 1;
        localStorage.setItem("user", userData[1].username, index);
        localStorage.setItem("index", index);
        localStorage.setItem("userNewAKK1", userData[index].akk);
        
        localStorage.setItem("totalAKK",userData[index].akk)
        window.location = "/";
      }
      if (
        data.username === userData[2].username &&
        data.password === userData[2].password
      ) {
        setState({
          data: {
            username: "",
            password: "",
          },
          errors: {},
        });
        const index = 2;
        localStorage.setItem("user", userData[2].username, index);
        localStorage.setItem("index", index);
        localStorage.setItem("userNewAKK1", userData[index].akk);
        
        localStorage.setItem("totalAKK",userData[index].akk)
        window.location = "/";
      }
      if (
        data.username === userData[3].username &&
        data.password === userData[3].password
      ) {
        setState({
          data: {
            username: "",
            password: "",
          },
          errors: {},
        });
        const index = 3;
        localStorage.setItem("user", userData[3].username, index);
        localStorage.setItem("index", index);
        localStorage.setItem("userNewAKK1", userData[index].akk); 
        localStorage.setItem("totalAKK",userData[index].akk)
        window.location = "/";
      }
    } else {
      setState({
        errors,
      });
    }
    
    
  };
  const handleChange = (e) => {
    setState({
      data: {
        ...state.data,
        [e.target.id]: e.target.value,
      },
      errors: {
        ...state.errors,
        [e.target.id]: "",
      },
    });
  };

  const { data, errors } = state;

  return (
    <Row className="d-flex justify-content-center align-items-center">
      <Col className="public-layout-col d-flex justify-content-center align-items-center bg-white px-1 py-2">
        <div className="d-flex flex-column justify-content-center aling-items-center px-4 mx-2 public-layout-form">
          <Form id="loginForm" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Enter Username"
                onChange={handleChange}
                value={data.username}
                error={errors.username}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={data.password}
                error={errors.password}
              />
            </Form.Group>
            <Button
              className="mb-4 mt-4 bg-unopad-primary col-sm-12"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default Login;
