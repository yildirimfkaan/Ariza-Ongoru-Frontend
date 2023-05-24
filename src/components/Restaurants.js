import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Row, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

function Restaurants() {
  return (
    <>
      <Row className="justify-content-center">
        <Col className="d-flex justify-content-center p-2">
          <NavLink
            as={Link}
            to={"/chartPage"}
            className="shadow mx-2"
          >
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={require("../img/ibss.png").default}
                alt="aliocak"
              />
              <Card.Body></Card.Body>
            </Card>
          </NavLink>
          
        </Col>
        
      </Row>
    </>
  );
}

export default Restaurants;
