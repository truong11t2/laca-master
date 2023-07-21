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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import PasswordField from "../components/PasswordField";
import { resetPassword } from "../redux/actions/userActions";

const ResetPasswordScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirect = "/login";
  const toast = useToast();

  const {token} = useParams();
  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;
  const [success, setSuccess] = useState(false);

  const headingBR = useBreakpointValue({ base: "sm", md: "md" });
  const boxBR = useBreakpointValue({ base: "transparent", md: "bg-surface" });

  useEffect(() => {
    window.scroll(0, 0);
    
    if (success) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate(redirect);
      }
      toast({ description: "Mật khẩu đã đổi. Vui lòng đăng nhập.", status: "success", isClosable: true });
    }
  }, [userInfo, error, redirect, navigate, location.state, toast, success]);

  return (
    <Formik
      initialValues={{ firstname: "", lastname: "", email: "", password: "", confirmPassword: "" }}
      validationSchema={Yup.object({
        password: Yup.string()
          .min(6, "Mật khẩu quá ngắn - chứa ít nhất 6 ký tự.")
          .required("Mật khẩu là bắt buộc."),
        confirmPassword: Yup.string()
          .min(6, "Mật khẩu quá ngắn - chứa ít nhất 6 ký tự.")
          .required("Vui lòng nhập lại mật khẩu.")
          .oneOf([Yup.ref("password"), null], "Mật khẩu phải giống nhau"),
      })}
      onSubmit={(values) => {
        dispatch(resetPassword(values.password, token));
        setSuccess(true);
      }}
    >
      {(formik) => (
        <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", md: "8" }} minH="4xl">
          <Stack spacing="8">
            <Stack spacing="6">
              <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                <Heading size={headingBR}>Tạo mới mật khẩu</Heading>
              </Stack>
            </Stack>
            <Box
              py={{ base: "0", md: "8" }}
              px={{ base: "4", md: "10" }}
              bg={{ boxBR }}
              boxShadow={{ base: "none", md: "xl" }}
            >
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
                    <AlertTitle>Có lỗi xảy ra!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing="5">
                  <FormControl>
                    <PasswordField type="password" name="password" placeholder="Nhập mật khẩu" label="Mật khẩu*" />
                    <PasswordField
                      type="password"
                      name="confirmPassword"
                      placeholder="Nhập lại mật khẩu"
                      label="Xác nhận mật khẩu*"
                    />
                  </FormControl>
                </Stack>
                <Stack spacing="6">
                  <Button colorScheme="blue" size="lg" fontSize="md" isLoading={loading} type="submit">
                    Tạo mật khẩu mới
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

export default ResetPasswordScreen;
