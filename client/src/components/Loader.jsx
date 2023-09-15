import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <Spinner 
      animation="border"
      variant="secondary"
      style={{
        width: "50px",
        height: "50px",
        margin: "auto",
        display: "block",
      }}
    ></Spinner>
  )
};

export default Loader;