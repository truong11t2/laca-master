import {
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
  Spinner,
  Alert,
  Image,
  Heading,
  Text,
  Flex,
  Container,
  Box,
  VStack,
  Link,
} from "@chakra-ui/react";
import { Link as ReactLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlogPost } from "../redux/actions/blogPostActions";
import NotFoundScreen from "./NotFoundScreen";
import parse from "html-react-parser";
import "../components/comment/comment.css";
import Comments from "../components/comment/Comments";

const SingleBlogScreen = () => {
  const { id } = useParams();
  const blogPostInfo = useSelector((state) => state.blogPosts);
  const { blogPost, loading, error } = blogPostInfo;
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(getBlogPost(id));
  }, [id, dispatch]);

  return (
    <VStack spacing="30px" minH="100vh">
      {loading ? (
        <Stack directin="row" spacing="4">
          <Spinner mt="20" thickness="2px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Stack>
      ) : error ? (
        <NotFoundScreen />
      ) : (
        blogPost && (
          <Container maxW="4xl" py={{ base: "12", md: "24" }} px={{ base: "0", md: "8" }} minH="4xl">
            <Heading textAlign="center" size="lg">
              {blogPost.title}
            </Heading>
            <Flex width="full" py="2" justifyContent="center" px="2">
              <Text> By {blogPost.author}</Text>
              <Text mx="2">|</Text>
              <Text>{new Date(blogPost.createdAt).toDateString()}</Text>
              <Text mx="2">|</Text>
              {/* <Text>{blogPost.category.charAt(0).toUpperCase() + blogPost.category.slice(1)}</Text> */}
              <Link pl="1" as={ReactLink} to={`/blog/${blogPost.category}`}>
                      {blogPost.category.charAt(0).toUpperCase() + blogPost.category.slice(1)}
                    </Link>
            </Flex>
            <Stack p="2">
              <Image src={blogPost.image} />
            </Stack>
            {/*             <Text px="2" mt="5" lineHeight={{ base: "7", md: "8" }} fontSize={{ base: "md", md: "lg" }}>
              {blogPost.content}
            </Text> */}
            {parse(blogPost.content)}

            {/* comment section */}
            <Comments postId={id} currentUser={userInfo} />
          </Container>
        )
      )}
    </VStack>
  );
};

export default SingleBlogScreen;
