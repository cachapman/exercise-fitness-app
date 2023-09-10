import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, FloatingLabel, Row } from "react-bootstrap";
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

  // Navigates to dashboard page if login successful
  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
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
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <div className="py-3 mt-3">
      <FormContainer>
        <div className="justify-content-md-center">
          <div className="p-2">
            <h1>
              <FaSignInAlt /> Login
            </h1>
          </div>
          <div className="p-2">
            <h3>Welcome back!</h3>
          </div>
          <div className="p-2">
            <h5>Log in with Username or Email to access your account.</h5>
          </div>
        </div>
        <Form onSubmit={onSubmit}>
          <FloatingLabel className="my-2" controlId="name" label="Username">
            <Form.Control 
              type="text"
              value={name}
              placeholder="Username"
              onChange={(event) => setName(event.target.value)}
            ></Form.Control>
          </FloatingLabel>
            
          <FloatingLabel className="my-2" controlId="email" label="Email Address">
            <Form.Control 
              type="email"
              value={email}
              placeholder="Email Address"
              onChange={(event) => setEmail(event.target.value)}
            ></Form.Control>
          </FloatingLabel>

          <FloatingLabel className="my-2" controlId="password" label="Password">
            <Form.Control 
              type="password"
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            ></Form.Control>
          </FloatingLabel>
        
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
    </div>
  );
};

export default Login;