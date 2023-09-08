import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <Spinner 
      animation="border"
      variant="secondary"
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
    ></Spinner>
  )
};

export default Loader;