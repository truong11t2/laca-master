import {
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
  Spinner,
  Alert,
  Image,
  Heading,
  Divider,
  Link,
  Spacer,
  Text,
  Flex,
  Box,
  VStack,
  Button,
} from "@chakra-ui/react";
import { Link as ReactLink, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlogPostsByCategory, getNextPage } from "../redux/actions/blogPostActions";
// import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const BlogScreen = () => {
  const { category: curCategory } = useParams();

  const blogPostInfo = useSelector((state) => state.blogPosts);
  const { blogPosts, loading, error, pageTitle, lastId, status, nextPage, pageNumber, category } = blogPostInfo;
  const dispatch = useDispatch();

  useEffect(() => {
    if (curCategory !== category) {
      window.scroll(0, 0);
    }
    dispatch(getBlogPostsByCategory(curCategory, lastId, nextPage, category));
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [curCategory, dispatch, nextPage, pageNumber]);

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      dispatch(getNextPage());
    }
  };

  return (
    <VStack spacing="30px" minHeight="100vh">
      <Heading fontSize="5xl" mb="16">
        {pageTitle}
      </Heading>
      <>
        <Heading>{curCategory.charAt(0).toUpperCase() + curCategory.slice(1)} Blogs</Heading>
        {blogPosts.map((post) => (
          <Box key={post._id} maxW={{ base: "3xl", lg: "7xl" }} px={{ base: "6", md: "8", lg: "20" }} py="6">
            <Stack direction={{ base: "column", lg: "row" }} spacing="7">
              <Image src={post.image} minW={{ lg: "400px" }} maxH="280px" loading={<Spinner />} fit="cover" />
              <Flex direction="column">
                <Text fontSize="2xl" fontWeight="semibold" mb="3">
                  {post.title}
                </Text>
                <Text noOfLines="5" fontSize="lg">
                  {post.content}
                </Text>
                <Spacer />
                <Divider />
                <Flex width="full" py="2">
                  <Box display={{ base: "none", md: "flex" }}>
                    <Text>by {post.author}</Text>
                    <Text mx="2">|</Text>
                    <Text>{new Date(post.createdAt).toDateString()}</Text>
                    <Text mx="2">|</Text>
                  </Box>
                  <Text>
                    Category:
                    <Link pl="1" as={ReactLink} to={`/blog/${post.category}`}>
                      {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </Link>
                  </Text>
                  <Spacer />
                  <Link as={ReactLink} to={`/${post._id}`}>
                    Read more...
                  </Link>
                </Flex>
                <Divider />
              </Flex>
            </Stack>
          </Box>
        ))}
        {loading ? (
          <Stack direction="row" spacing="4">
            <Spinner mt="20" thickness="2px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
          </Stack>
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>We are sorry!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <></>
        )}
      </>
    </VStack>
  );
};

export default BlogScreen;
