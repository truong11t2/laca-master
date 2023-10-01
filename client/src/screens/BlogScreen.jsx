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
  Center,
} from "@chakra-ui/react";
import { Link as ReactLink, useParams, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlogPostsByCategory, getNextPage, resetPost } from "../redux/actions/blogPostActions";
// import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const BlogScreen = () => {
  const { category: curCategory } = useParams();

  const blogPostInfo = useSelector((state) => state.blogPosts);
  const { blogPosts, loading, error, pageTitle, lastId, status, nextPage, pageNumber, category } = blogPostInfo;
  const dispatch = useDispatch();

  const location = useLocation();
  
  useEffect(() => {
      if (curCategory !== category) {
        //console.log(blogPostInfo);
        window.scroll(0, 0);
        dispatch(resetPost());
      }
      if(status !== 201) {
      dispatch(getBlogPostsByCategory(curCategory, lastId, nextPage, category));
      }
      
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
  }, [curCategory, dispatch, nextPage, pageNumber, status]);

  //Reset blog post when changing route
  useEffect(() => {
    dispatch(resetPost());
  }, [dispatch, location])

  const onScroll = () => {
    // const scrollTop = document.documentElement.scrollTop;
    // const scrollHeight = document.documentElement.scrollHeight;
    // const clientHeight = document.documentElement.clientHeight;

    // if ((scrollTop + clientHeight >= scrollHeight) && (status !== 201)) {
    //   dispatch(getNextPage());
    // }
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight

    if (window.scrollY >= scrollableHeight) {
        dispatch(getNextPage());
    }
  };

  return (
    <VStack spacing="30px" minHeight="100vh">
      <Heading fontSize="5xl" mb="6">
        {pageTitle}
      </Heading>
      <>
        <Heading>{/* {curCategory.charAt(0).toUpperCase() + curCategory.slice(1)} */} Bài Viết Mới Nhất</Heading>
        {blogPosts.map((post) => (
          post.isPublish ? (
          <Box key={post._id} maxW={{ base: "3xl", lg: "5xl" }} px={{ base: "6", md: "8", lg: "20" }} py="6">
            <Stack direction={{ base: "column", lg: "row" }} spacing="7">
              <Center>
                <Link as={ReactLink} to={`/${post.slug}`}>
                  <Image src={post.image} minW={{ lg: "350px" }} height={{ lg: "230px" }} loading={<Spinner />} fit="cover" />
                </Link>
              </Center>
              <Flex direction="column">
                <Link as={ReactLink} to={`/${post.slug}`}>
                  <Text fontSize="2xl" fontWeight="semibold" mb="3">
                    {post.title}
                  </Text>
                </Link>
                <Text noOfLines="5" fontSize="lg">
                  {post.introduction}
                </Text>
                <Spacer />
                <Divider />
                <Flex width="full" py="2">
                  <Box display={{ base: "none", md: "flex" }}>
                    <Text>Tác giả: {post.author}</Text>
                    <Text mx="2">|</Text>
                    <Text>{new Date(post.updatedAt).toDateString().split(' ').slice(1).join(' ')}</Text>
                    <Text mx="2">|</Text>
                  </Box>
                  <Text>
                    Khu vực:
                    <Link pl="1" as={ReactLink} to={`/blog/${post.category}`}>
                      {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </Link>
                  </Text>
                  <Spacer />
                  <Link as={ReactLink} to={`/${post.slug}`}>
                    Xem thêm...
                  </Link>
                </Flex>
                <Divider />
              </Flex>
            </Stack>
          </Box>
          ):(<></>)
          
        ))}
        {loading ? (
          <Stack direction="row" spacing="4">
            <Spinner mt="20" thickness="2px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
          </Stack>
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Có lỗi xảy ra!</AlertTitle>
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
