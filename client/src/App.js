import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "@mui/material/styles";
import themeMuiFont from "./utilities/themeUtils";
import "./index.css";

const App = () => {
  return (
    <ThemeProvider theme={themeMuiFont}>
      <Header />
        <ToastContainer />
        <Container className="my-2">
          <Outlet />
        </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default App;