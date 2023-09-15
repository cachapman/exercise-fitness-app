import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, FloatingLabel, Row } from "react-bootstrap";
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

  // Dispatch user information to complete register action when form is submitted
  const onSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
    } else {
      try {
        const response = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({...response}));
        navigate("/dashboard");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div className="py-3 mt-3">
        <FormContainer>
          <div className="justify-content-md-center">
            <div className="p-2">
              <h1>
                <FaUser /> Register
              </h1>
            </div>
            <div className="p-2">
              <h3>Sign up today for member access!</h3>
            </div>
            <div className="p-2">
              <h6>Please enter all the required fields.</h6>
            </div>
          </div>
          <Form onSubmit={onSubmit}>
            <FloatingLabel className="my-2" controlId="floatingInput" label="Username">
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
            
            <FloatingLabel className="my-2" controlId="passwordConfirm" label="Confirm Password">
              <Form.Control 
                type="password"
                value={passwordConfirm}
                placeholder="Confirm Password"
                onChange={(event) => setPasswordConfirm(event.target.value)}
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
                Already have an account? <Link to="/login">Click here to Login</Link>
              </Col>
            </Row>
          </Form>
        </FormContainer>
      </div>
    </>
  );
};

export default Register;