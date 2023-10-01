import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../redux/actions/blogPostActions";
import { removeVietnameseTones } from "../utils/utils";

const ImageUpload = ({ setPostImage, folderName, cover }) => {
  const dispatch = useDispatch();
  const blogPostInfo = useSelector((state) => state.blogPosts);
  const { coverUrl } = blogPostInfo;

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const createFolderName = (folderName) => {
    let str = removeVietnameseTones(folderName);
    str = str.replace(/ /g, "-");
    return str;
  }
  const handleFileUpload = async (e) => {
    let folder = createFolderName(folderName);
    const file = e.target.files[0];
    // const base64 = await convertToBase64(file);
    // setPostImage(base64);
    let formData = new FormData();
    
    if(cover === "true") {
      let ext = file.name.split('.').pop();
      formData.append("file", file, "cover." + ext);
    } else {
      formData.append("file", file);
    }
    formData.append("folder", folder);
      
    dispatch(uploadFile(formData, setPostImage));
  };

  return (
    <form>
      <input type='file' label='Image' accept='.jpeg, .png, .jpg, .webp' onChange={(e) => handleFileUpload(e)} />
    </form>
  );
};

export default ImageUpload;
