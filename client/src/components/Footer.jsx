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
        <Stack
          spacing="8"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          py={{ base: "12", md: "5" }}
        >
          <Stack spacing={{ base: "6", md: "8" }} align="start">
            <Flex alignItems="center" py="5">
              <Link to="/">
              {/* <Icon as={GiWorld} h="10" w="10" />
              <Text px="3" fontSize="2xl" fontWeight="extrabold">
                La Cà
              </Text> */}
                <Image src="../../images/logo-1.png" boxSize='100px' objectFit='cover'></Image>
              </Link>
            </Flex>
          </Stack>
          <Stack direction={{ base: "column-reverse", md: "column", lg: "row" }} spacing={{ base: "12", md: "8" }}>
            {/*             <Stack direction='row' spacing='8'>
              <Stack spacing='4' minW='36' flex='1'>
                <Text fontSize='sm' fontWeight='semibold'>
                  Legal
                </Text>
                <Stack spacing='3' shouldWrapChildren>
                  <Button variant='link'>Privacy</Button>
                  <Button variant='link'>Terms</Button>
                  <Button variant='link'>License</Button>
                </Stack>
              </Stack>
            </Stack> */}
            <Stack spacing="4" >
              <Text fontSize="sm" fontWeight="semibold" color="subtle">
                Nhận thông tin mới nhất
              </Text>
              <Stack spacing="4" direction={{ base: "column", sm: "row" }} maxW={{ lg: "360px" }} 
              as={'form'}
              onSubmit={(e) => {
                e.preventDefault();
                setError(false);
                setState("submitting");
                //Todo: Store email in database
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
              <Text
                mt={0}
                textAlign={'left'}
                color={error ? 'red.500' : 'gray.500'}>
                {error
                  ? 'Oh Lỗi xảy ra! 😢 Vui lòng thử lại sau.'
                  : "Yên tâm. Sẽ không có thư rác! ✌️"}
              </Text>
              {userInfo ? (
                <Button variant="link" onClick={logoutHandler} alignSelf="flex-start">
                  Đăng xuất
                </Button>
              ) : (
                <Button variant="link" as={ReactLink} to="/login" alignSelf="flex-start">
                  Đăng nhập
                </Button>
              )}
            </Stack>
          </Stack>
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
