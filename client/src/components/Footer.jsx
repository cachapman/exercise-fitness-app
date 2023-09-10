import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import FooterLogo from "../assets/icons/human-bones.png";

const Footer = () => {
  return (
    <footer>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="bottom" collapseOnSelect>
        <Container>
          <Nav className="mx-auto">
            <LinkContainer to="/dashboard">
              <Nav.Link >
                <img src={FooterLogo} alt="footer-logo" width="auto" height="55px" />
                <Navbar.Text>Stronger Body and Mind Fitness by Wu</Navbar.Text>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </footer>
  )
};

export default Footer;