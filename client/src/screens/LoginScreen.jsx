import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Stack,
  useBreakpointValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
  //Checkbox,
  Link,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import PasswordField from "../components/PasswordField";
import TextField from "../components/TextField";
import { login } from "../redux/actions/userActions";
import { Link as ReactLink } from "react-router-dom";
import getGoogleUrl from "../components/oauth2/getGoogleUrl";
import { ExternalLinkIcon } from '@chakra-ui/icons';

const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  //for admin
  //const redirect = "/admin-console";
  //for user
  const redirect = -1;
  const toast = useToast();

  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;

  const headingBR = useBreakpointValue({ base: "sm", md: "md" });
  const boxBR = useBreakpointValue({ base: "transparent", md: "bg-surface" });

  useEffect(() => {
    window.scroll(0, 0);
    if (userInfo) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate(redirect);
      }
      toast({ description: "Đăng nhập thành công.", status: "success", isClosable: true });
    }
  }, [userInfo, redirect, error, navigate, location.state, toast]);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Email không hợp lệ.").required("Địa chỉ email là bắt buộc."),
        password: Yup.string()
          .min(1, "Mật khẩu quá ngắn - chứa ít nhất 6 ký tự")
          .required("Mật khẩu là bắt buộc."),
      })}
      onSubmit={(values) => {
        dispatch(login(values.email, values.password));
      }}
    >
      {(formik) => (
        <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", md: "8" }} minH="4xl">
          <Stack spacing="0">
              <Stack py={{ base: "6", md: "6" }} spacing={{ base: "2", md: "3" }} textAlign="center">
                <Heading size={headingBR}>Đăng Nhập</Heading>
              </Stack>
            <Box
              py={{ base: "0", md: "8" }}
              px={{ base: "4", md: "10" }}
              bg={{ boxBR }}
              boxShadow={{ base: "none", md: "xl" }}
            >
              <Stack pb={{ base: "2", md: "6" }} spacing="6">
                <Box as='button' borderRadius='md' bg={mode("#3182ce", "#90cdf4")} color='white' px={4} h='48px'>
                  <Link href={getGoogleUrl()} isExternal={false}>
                    Google <ExternalLinkIcon mx='2px' />
                  </Link>
                </Box>
              </Stack>
              <Stack spacing="6" as="form" onSubmit={formik.handleSubmit}>
                {error && (
                  <Alert
                    status="error"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                  >
                    <AlertIcon />
                    <AlertTitle>Có lỗi xảy ra. Thành thật xin lỗi!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing="5">
                  <FormControl>
                    <TextField type="text" name="email" placeholder="abc@gmail.com" label="Email*" />
                    <PasswordField type="password" name="password" placeholder="Nhập mật khẩu" label="Mật khẩu*" />
                    {/* <Checkbox>Remember me</Checkbox> */}
                    <Link as={ReactLink} to="/forgotpassword" color={'blue.400'}>Quên mật khẩu?</Link>
                  </FormControl>
                </Stack>
                <Stack spacing="6">
                  <Button colorScheme="blue" size="lg" fontSize="md" isLoading={loading} type="submit">
                    Đăng nhập
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default LoginScreen;
