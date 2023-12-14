import React, { useState, useEffect } from 'react'
import { Container, Nav, Navbar, Form, Button, NavDropdown, Card, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const ListLiga = () => {
  const [ligas, setLigas] = useState([]);

  useEffect(() => {
    getLigas();
  }, [])

  const getLigas = async () => {
    const res = await axios.get("http://localhost:3000/ligas");
    setLigas(res.data);
  }

  const deleteLiga = async (ligaId) => {
    try {
      await axios.delete(`http://localhost:3000/ligas/${ligaId}`)
      getLigas();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <Navbar expand="lg" className="bg-black">
        <Container >
          <Navbar.Brand href="#" className="text-white fw-bold">ZanLeague</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto " navbarScroll>
              <Nav.Link href={'/'} className="text-white">Home</Nav.Link>
              <NavDropdown title={<span className="text-white">Pilih Liga</span>} id="navbarScrollingDropdown">
                <NavDropdown.Item href="#">LaLiga</NavDropdown.Item>
                <NavDropdown.Item href="#">Premier League</NavDropdown.Item>
                <NavDropdown.Item href="#">Seria A</NavDropdown.Item>
                <NavDropdown.Item href="#">All Liga</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 bg-body-secondary"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <div className="w-auto d-flex justify-content-end mt-4">
          <Link to="/addLiga" className="text-decoration-none">
            <Button className="bg-black border-0 mb-2">Add League</Button>
          </Link>
        </div>
        <Row className="mt-4">
          {ligas.map((liga) => (
            <Col md={3} key={liga.id}>
              <Card className="shadow">
                <Image variant="top" src={liga.url} className="SizeImg mx-auto" />
                <Card.Body>
                  <Card.Title>{liga.name}</Card.Title>
                  <Card.Text>{liga.leagues}</Card.Text>
                  <div>
                    <Link to={`editLiga/${liga.id}`}>
                      <Button variant="warning" className="me-2" size="sm">Edit</Button>
                    </Link>
                    <Button variant="danger" size="sm" onClick={() => deleteLiga(liga.id)}>Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

    </section>
  )
}

export default ListLiga