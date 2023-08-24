import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  Stack,
  Spinner,
  VStack,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  useToast,
  Flex,
  Button,
} from "@chakra-ui/react";
import { getBlogPostsByCategory, resetLoaderAndFlags, getNextPage, resetPost } from "../redux/actions/blogPostActions";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import PostEdit from "./PostEdit";
import { useLocation } from "react-router-dom";
import "./editor/styleEditor.css";

const EditBlogPost = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const blogPostInfo = useSelector((state) => state.blogPosts);
  const {
    blogPosts,
    loading,
    error,
    blogPostUpdated,
    blogPostRemoved,
    pageTitle,
    lastId,
    status,
    nextPage,
    pageNumber,
    category,
  } = blogPostInfo;

  const location = useLocation();

  useEffect(() => {
      //dispatch(resetLoaderAndFlags());
    if(status !== 201) {
      dispatch(getBlogPostsByCategory("all", lastId, nextPage, category));
    }
    window.addEventListener("scroll", onScroll);
    if (blogPostUpdated) {
      dispatch(resetPost());
      window.scroll(0, 0);
      toast({
        title: "Blog post saved.",
        description: "Blog post has been updated. ",
        status: "success",
        duration: 7000,
        isClosable: true,
      });
    }
    if (blogPostRemoved) {
      dispatch(resetPost());
      window.scroll(0, 0);
      toast({
        title: "Blog post removed.",
        status: "success",
        duration: 7000,
        isClosable: true,
      });
    }
    return () => window.removeEventListener("scroll", onScroll);
  }, [blogPostRemoved, blogPostUpdated, pageNumber, status]);

    //Reset blog post when changing route
    useEffect(() => {
      dispatch(resetPost());
    }, [dispatch, location])
    
  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight && status !== 201) {
      dispatch(getNextPage());
    }
  };

  return (
    <>
      <VStack spacing="30px" size="8xl">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>We are sorry!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {loading ? (
          <Stack direction="row" spacing="4">
            <Spinner mt="20" thickness="2px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
          </Stack>
        ) : (
          <>
            {blogPosts !== undefined &&
              blogPosts.map((post) => (
                <PostEdit
                  key={post._id}
                  content={post.content}
                  image={post.image}
                  createdAt={post.createdAt}
                  author={post.author}
                  category={post.category}
                  country={post.country}
                  introduction={post.introduction}
                  title={post.title}
                  _id={post._id}
                />
              ))}
          </>
        )}
      </VStack>
    </>
  );
};

export default EditBlogPost;
