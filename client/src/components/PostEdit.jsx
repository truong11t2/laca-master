import {
  Input,
  Image,
  Spinner,
  Spacer,
  Textarea,
  Container,
  VStack,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  AccordionPanel,
  Accordion,
  Select,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { updatePost, removePost } from "../redux/actions/blogPostActions";
import ImageUpload from "./ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styleEditor.css";

const PostEdit = ({ _id, content, title, category, country, introduction, image }) => {
  const [postContent, setPostContent] = useState(content);
  const [postTitle, setPostTitle] = useState(title);
  const [postImage, setPostImage] = useState(image);
  const [postCategory, setPostCategory] = useState(category);
  const [postCountry, setPostCountry] = useState(country);
  const [postIntroduction, setPostIntroduction] = useState(introduction);

  const blogPostInfo = useSelector((state) => state.blogPosts);
  const { updateButtonLoading, removeButtonLoading } = blogPostInfo;

  //Quill
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      // [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      ["link", "image", "video"],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ],
  };

  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(
      updatePost({
        _id,
        content: postContent,
        title: postTitle,
        category: postCategory,
        image: postImage,
        country: postCountry,
        introduction: postIntroduction,
      })
    );
  };

  const handleRemove = () => {
    dispatch(removePost(_id));
  };

  return (
    <Container maxW="5xl">
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb="4">
            <VStack pb="5" direction={{ base: "column", lg: "row" }} spacing="7">
              <Image src={postImage} minW={{ lg: "400px" }} maxH="280px" fit="contain" />
              <ImageUpload setPostImage={setPostImage} />
              <Input value={postTitle} onChange={(e) => setPostTitle(e.target.value)} size="sm" mb="3" />
              <Select
                defaultValue={postCategory.charAt(0).toUpperCase() + postCategory.slice(1)}
                size="sm"
                onChange={(e) => setPostCategory(e.target.value)}
              >
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="Oceania">Oceania</option>
                <option value="America">America</option>
                <option value="Africa">Africa</option>
              </Select>
              <Input value={postCountry} onChange={(e) => setPostCountry(e.target.value)} size="sm" mb="3" />
              <Textarea placeholder="Introduction about the post with 5 lines" onChange={(e) => setPostIntroduction(e.target.value)} />
              <ReactQuill
                placeholder="Start writing something..."
                value={postContent}
                onChange={(newValue) => setPostContent(newValue)}
                modules={modules}
              />
            </VStack>
            <Button
              loadingText="Updating Post..."
              isLoading={updateButtonLoading}
              minW={{ base: "full", md: "140px" }}
              colorScheme="green"
              mr={{ md: "10" }}
              onClick={() => handleSave()}
            >
              Save
            </Button>
            <Button
              loadingText="Removing Post..."
              isLoading={removeButtonLoading}
              minW={{ base: "full", md: "140px" }}
              colorScheme="red"
              mt={{ base: "10", md: "0" }}
              onClick={() => handleRemove()}
            >
              Remove Post
            </Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

export default PostEdit;
