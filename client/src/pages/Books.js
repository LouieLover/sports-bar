import React, { useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Map from "../components/Map";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <Jumbotron>
            <h1>Teams</h1>
          </Jumbotron>
          <form>
            <dropdown
              onChange={() => {}}
              name="title"
              placeholder="Title (required)"
            />
            <dropdown
              onChange={() => {}}
              name="author"
              placeholder="Author (required)"
            />
            <FormBtn
              disabled={!(formObject.author && formObject.title)}
              onClick={() => {}}
            >
              Submit
            </FormBtn>
          </form>
        </Col>
        <Col size="md-6 sm-12">
          <Jumbotron>
            <h1>Team Bars</h1>
          </Jumbotron>
          {books.length ? (
            <List>
              {books.map((book) => {
                return (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => {}} />
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}

          <Map
            onLoad={(map) => {
              const bounds = new window.google.maps.LatLngBounds();
              map.fitBounds(bounds);
            }}
            // onUnmount={(map) => {
            //   // do your stuff before map is unmounted
            // }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Books;
