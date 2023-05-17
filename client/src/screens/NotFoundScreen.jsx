import React from "react";
import { Link, Container, Heading } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Container maxW="5xl" minH="100vh" mt="20">
      <Heading size="2xl" textAlign="center" pt={10}>
        Oops! Page not found
      </Heading>
      <Heading size="1xl" textAlign="center" pt={10} pb={10}>
        Please click below link to return home page!
      </Heading>
      <p style={{ textAlign: "center" }}>
        <Link as={ReactLink} to="/blog/all" color="blue.500" fontWeight="bold" fontSize="xl">
          Explore my Blog
        </Link>
      </p>
    </Container>
  );
};

export default NotFoundPage;