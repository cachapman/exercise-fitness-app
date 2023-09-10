import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {
  return (
    <div className="py-5 mt-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">Workout Planner</h1>
          <h2 className="text-center mb-4">Faster Results with Smarter Exercises</h2>
          <h3 className="text-center mb-4">Ready to train more effeciently?</h3>
          <div className="d-flex">
            <LinkContainer to="/login">
              <Button variant="primary" className="me-3">
                Login
              </Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button variant="secondary">
                Register
              </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;