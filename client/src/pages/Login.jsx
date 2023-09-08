import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // Navigates to home page if login successful
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  // Nagivates to home page when clicked
  const handleBackButton = () => {
    navigate("/");
  };

  // Dispatch user information to complete login action when form is submitted
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await login({ name, email, password }).unwrap();
      dispatch(setCredentials({...response}));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <FormContainer>
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p>Welcome back!</p>
      <p>Log in with Username or Email to access your account.</p>
      <Form onSubmit={onSubmit}>
      <Form.Group className="my-2" controlId="name">
          <Form.Label>Username:</Form.Label>
          <Form.Control 
            type="text"
            value={name}
            placeholder="Enter Username"
            onChange={(event) => setName(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address:</Form.Label>
          <Form.Control 
            type="email"
            value={email}
            placeholder="Enter Email Address"
            onChange={(event) => setEmail(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control 
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(event) => setPassword(event.target.value)}
          ></Form.Control>
        </Form.Group>

        { isLoading && <Loader /> }

        <div className="d-grid gap-2">
          <Button type="submit" variant="primary" size="lg">
            Submit
          </Button>
          <Button type="submit" onClick={handleBackButton} variant="secondary" size="lg">
            Back to Home
          </Button>
        </div>

        <Row className="py-3">
          <Col>
            New User? <Link to="/register">Click here to Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default Login;