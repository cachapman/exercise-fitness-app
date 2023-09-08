import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [register, { isLoading }] = useRegisterMutation();

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

  // Dispatch user information to complete register action when form is submitted
  const onSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
    } else {
      try {
        const response = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({...response}));
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>
        <FaUser /> Register
      </h1>
      <p>Please enter all the required fields.</p>
      <p>Sign up today!</p>
      <Form onSubmit={onSubmit}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Username:</Form.Label>
          <Form.Control 
            type="text"
            value={name}
            placeholder="Create Username"
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
            placeholder="Create Password"
            onChange={(event) => setPassword(event.target.value)}
          ></Form.Control>
        </Form.Group>
        
        <Form.Group className="my-2" controlId="passwordConfirm">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control 
            type="password"
            value={passwordConfirm}
            placeholder="Confirm Password"
            onChange={(event) => setPasswordConfirm(event.target.value)}
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
            Already have an account? <Link to="/login">Click here to Login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default Register;