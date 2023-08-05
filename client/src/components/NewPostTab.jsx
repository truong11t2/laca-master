import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  Stack,
  Text,
  Input,
  Select,
  Textarea,
  Image,
  Container,
  Button,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import ImageUpload from "./ImageUpload";
import { createNewBlogPost } from "../redux/actions/blogPostActions";
import { useNavigate } from "react-router-dom";
import Editor from "./Editor";

const NewPostTab = () => {
  const [postImage, setPostImage] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postCountry, setPostCountry] = useState("");
  const [postIntroduction, setPostIntroduction] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();

  const blogPostInfo = useSelector((state) => state.blogPosts);
  const { blogPostCreated, error, updateButtonLoading } = blogPostInfo;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const navigate = useNavigate();

  useEffect(() => {
    if (blogPostCreated) {
      toast({
        title: "Blog post published",
        description: "Please have a look on it.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      //Redirecting to post
      navigate("/" + blogPostCreated[0]._id);
    }
  }, [postImage, postContent, postTitle, postCategory, blogPostCreated, toast, navigate]);

  const handlePublishPost = () => {
    if (postImage === "" || postCategory === "" || postContent === "" || postTitle === "" || postCountry === "" || postIntroduction === "") {
      toast({
        title: "Post could not be published",
        description: "Please fill out all fields and make sure that you have provided an image.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      dispatch(
        createNewBlogPost({
          image: postImage,
          category: postCategory,
          content: postContent,
          title: postTitle,
          country: postCountry,
          introduction: postIntroduction,
          author: userInfo.name,
        })
      );
    }
  };

  return (
    <Container maxW="5xl" py={{ base: 12, md: 24 }} px={{ base: 0, md: 8 }} minH="4xl">
      <Stack spacing="5">
        <Text>Create new Blog</Text>
        <Input placeholder="Title" size="lg" onChange={(e) => setPostTitle(e.target.value)} />
        <Select placeholder="Choose a Category" size="lg" onChange={(e) => setPostCategory(e.target.value)}>
          <option value="Europe">Châu Âu</option>
          <option value="Asia">Châu Á</option>
          <option value="Oceania">Châu Đại Dương</option>
          <option value="America">Châu Mỹ</option>
          <option value="Africa">Châu Phi</option>
        </Select>
        <Input placeholder="Country" size="lg" onChange={(e) => setPostCountry(e.target.value)} />
        <Textarea placeholder="Introduction about the post with 5 lines" onChange={(e) => setPostIntroduction(e.target.value)} />
        <Editor
          value={postContent}
          onChange={(newValue) => setPostContent(newValue)}
        />
        <ImageUpload setPostImage={setPostImage} />
        <Image src={postImage} minW={{ lg: "400px" }} maxH="280px" fit="contain" />
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>We are sorry</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button
          colorScheme="blue"
          onClick={() => handlePublishPost()}
          isLoading={updateButtonLoading}
          loadingText="Uploading"
        >
          Publish Post
        </Button>
      </Stack>
    </Container>
  );
};

export default NewPostTab;
