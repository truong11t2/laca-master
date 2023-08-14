import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Input,
  Stack,
  Text,
  useColorModeValue as mode,
  Box,
  Flex,
  Icon,
  useToast,
  FormControl,
  Image,
} from "@chakra-ui/react";
import { FaTwitter, FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import { Link, Link as ReactLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, subscribe } from "../redux/actions/userActions";
import { useState } from "react";
import { CheckIcon } from '@chakra-ui/icons';

const Footer = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const [email, setEmail] = useState('');
  const [state, setState] = useState('initial');
  const [error, setError] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
    toast({ description: "Bạn đã đăng xuất.", status: "success", isClosable: true });
  };

  return (
    <Box w="100%" bg={mode("blue.200", "blue.900")}>
      <Container as="footer" role="contentinfo" maxW="7xl">
        <Stack direction={{base: 'column', md:'row'}}>
          <Box pt={3} w='100%'>
            <Link to="/">
              <Image src="../../images/logo-1.png" boxSize='100px' objectFit='cover'></Image>
            </Link>
            {userInfo ? (
              <Button mt={3} variant="link" onClick={logoutHandler} alignSelf="flex-start">
                Đăng xuất
              </Button>
            ) : (
              <Button mt={3} variant="link" as={ReactLink} to="/login" alignSelf="flex-start">
                Đăng nhập
              </Button>
            )}
          </Box>
          <Box pt={3} w='100%' >
            <Text mb={2} fontSize='m' fontWeight='semibold'>
              Quy định
            </Text>
            <Stack spacing='3' shouldWrapChildren>
              <Button variant='link' as={ReactLink} to="/privacy">Chính sách riêng tư</Button>
              <Button variant='link' as={ReactLink} to="/terms">Điều khoản sử dụng</Button>
              <Button variant='link' as={ReactLink} to="/copyright">Bản quyền</Button>
            </Stack>
          </Box>
          <Box pt={3} w='100%'>
            <Text fontSize="m" fontWeight="semibold" color="subtle">
              Nhận thông tin mới nhất
            </Text>
            <Stack pt='10px' pb='0px' spacing="0" direction={{ base: "column", sm: "column" }} maxW={{ lg: "360px" }} 
              as={'form'}
              onSubmit={(e) => {
                e.preventDefault();
                setError(false);
                setState("submitting");
                dispatch(subscribe(email));
                //console.log(email);
                //console.log("Owesome, you will receive lastest news from us.")
                setState('success');
              }
            }>
              <FormControl>
                <Input placeholder="Địa chỉ email" type="email" required value={email} disabled={state !== 'initial'} onChange={(e) => setEmail(e.target.value)}/>
              </FormControl>
              <FormControl>
                <Button variant="primary" flexShrink={0}
                  isLoading={state === "submitting"}
                  type={state === "success" ? "button" : "submit"} >
                  {state === 'success' ? <CheckIcon /> : 'Theo dõi'}
                </Button>
              </FormControl>
            </Stack>
            <Text mb={1} textAlign={'left'} color={error ? 'red.500' : 'gray.500'}>
              {error
                ? 'Oh Lỗi xảy ra! 😢 Vui lòng thử lại sau.'
                : "Yên tâm. Sẽ không có thư rác! ✌️"}
            </Text>
          </Box>
        </Stack>
        <Divider />
        <Stack
          pt="5"
          pb="5"
          /* justify="space-between" direction={{ base: "column-reverse", md: "row" }}  */ align="center"
        >
          <Text fontSize="sm" color="subtle">
            &copy; {new Date().getFullYear()} La Cà{/* . All rights reserved. */}
          </Text>

          {/* <ButtonGroup variant='ghost'>
            <IconButton as='a' href='#' icon={<FaFacebook />} />
            <IconButton as='a' href='#' icon={<FaInstagram />} />
            <IconButton as='a' href='#' icon={<FaTwitter />} />
            <IconButton as='a' href='#' icon={<FaYoutube />} />
          </ButtonGroup> */}
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
