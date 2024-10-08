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
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { updatePost, removePost } from "../redux/actions/blogPostActions";
import ImageUpload from "./ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
//import "./editor/styleEditor.css";
// import Editor from "./Editor";
import TinyMCE from "./editor/TinyMCE";
import { removeVietnameseTones } from "../utils/utils";

const PostEdit = ({ _id, content, title, category, country, introduction, image, slug }) => {
  const [coverImage, setCoverImage] = useState(image);
  const [postContent, setPostContent] = useState(content);
  const [postTitle, setPostTitle] = useState(title);
  const [postImage, setPostImage] = useState("");
  const [postCategory, setPostCategory] = useState(category);
  const [postCountry, setPostCountry] = useState(country);
  const [postIntroduction, setPostIntroduction] = useState(introduction);

  const blogPostInfo = useSelector((state) => state.blogPosts);
  const { updateButtonLoading, removeButtonLoading, saveButtonLoading } = blogPostInfo;

  //Quill
  // const modules = {
  //   toolbar: [
  //     ["bold", "italic", "underline", "strike"], // toggled buttons
  //     ["blockquote", "code-block"],

  //     // [{ header: 1 }, { header: 2 }], // custom button values
  //     [{ list: "ordered" }, { list: "bullet" }],
  //     [{ script: "sub" }, { script: "super" }], // superscript/subscript
  //     [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  //     [{ direction: "rtl" }], // text direction

  //     [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  //     [{ header: [1, 2, 3, 4, 5, 6, false] }],

  //     ["link", "image", "video"],

  //     [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  //     [{ font: [] }],
  //     [{ align: [] }],

  //     ["clean"], // remove formatting button
  //   ],
  // };

  const dispatch = useDispatch();

  const handleSave = (isPublish) => {
    // Create slug from title
    var slug = removeVietnameseTones(postTitle);
    slug = slug.replace(/ /g, "-").toLowerCase();

    dispatch(
      updatePost({
        _id,
        content: postContent,
        title: postTitle,
        category: postCategory,
        image: coverImage,
        country: postCountry,
        introduction: postIntroduction,
        isPublish: isPublish,
        slug: slug,
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
              <Text>Upload cover image</Text>
              <Image src={coverImage} minW={{ lg: "400px" }} maxH="280px" fit="contain" />
              <ImageUpload setPostImage={setCoverImage} folderName={postTitle} cover="true" />
              <Input value={postTitle} onChange={(e) => setPostTitle(e.target.value)} size="sm" mb="3" />
              <Select
                defaultValue={postCategory.charAt(0).toUpperCase() + postCategory.slice(1)}
                size="sm"
                onChange={(e) => setPostCategory(e.target.value)}
              >
                <option value="Europe">Châu Âu</option>
                <option value="Asia">Châu Á</option>
                <option value="Oceania">Châu Đại Dương</option>
                <option value="America">Châu Mỹ</option>
                <option value="Africa">Châu Phi</option>
              </Select>
              <Input value={postCountry} onChange={(e) => setPostCountry(e.target.value)} size="sm" mb="3" />
              <Textarea value={postIntroduction} placeholder="Introduction about the post with 5 lines" onChange={(e) => setPostIntroduction(e.target.value)} />
{/*               <Editor
                value={postContent}
                onChange={(newValue) => setPostContent(newValue)}
              /> */}
              <TinyMCE
                value={postContent}
                onEditorChange={(newValue) => setPostContent(newValue)}
              />
              <Text>Upload images for content</Text>
                <ImageUpload setPostImage={setPostImage} folderName={postTitle} />
              <Text>{postImage}</Text>
            </VStack>
            <Button
              loadingText="Saving Post..."
              isLoading={saveButtonLoading}
              minW={{ base: "full", md: "140px" }}
              colorScheme="blue"
              mr={{ md: "10" }}
              mt={{ base: "10", md: "0" }}
              onClick={() => handleSave(false)}
            >
              Save
            </Button>
            <Button
              loadingText="Publishing Post..."
              isLoading={updateButtonLoading}
              minW={{ base: "full", md: "140px" }}
              colorScheme="green"
              mr={{ md: "10" }}
              mt={{ base: "10", md: "0" }}
              onClick={() => handleSave(true)}
            >
              Publish
            </Button>
            <Button
              loadingText="Removing Post..."
              isLoading={removeButtonLoading}
              minW={{ base: "full", md: "140px" }}
              colorScheme="red"
              mr={{ md: "10" }}
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
