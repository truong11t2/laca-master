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
  import { useNavigate, useLocation } from "react-router-dom";
  import TextField from "../components/TextField";
  import { forgotPassword } from "../redux/actions/userActions";
  
  const ForgotPasswordScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    
    const redirect = "/";
    const toast = useToast();
  
    const user = useSelector((state) => state.user);
    const { loading, error, userInfo } = user;
    const [success, setSuccess] = useState(false);

  
    const headingBR = useBreakpointValue({ base: "sm", md: "md" });
    const boxBR = useBreakpointValue({ base: "transparent", md: "bg-surface" });
  
    useEffect(() => {
      if(success) {
        window.scroll(0, 0);
        if (location.state?.from) {
          navigate(location.state.from);
        } else {
          navigate(redirect);
        }
        toast({ description: "Email đã được gửi, có thể trong thư mục Spam. Vui lòng kiểm tra mail để tạo mới mật khẩu. ", status: "success", duration: 8000, isClosable: true });
      }
    }, [redirect, success, navigate, location.state, toast]);
  
    return (
      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email("Email không hợp lệ.").required("Địa chỉ email là bắt buộc."),
        })}
        onSubmit={(values) => {
          dispatch(forgotPassword(values.email));
          setSuccess(true);
        }}
      >
        {(formik) => (
          <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", md: "8" }} minH="4xl">
            <Stack spacing="8">
              <Stack spacing="6">
                <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                  <Heading size={headingBR}>Tạo Mới Mật Khẩu</Heading>
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
                      <AlertTitle>We are sorry!</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Stack spacing="5">
                    <FormControl>
                      <TextField type="text" name="email" placeholder="abc@gmail.com" label="Email*" />
                    </FormControl>
                  </Stack>
                  <Stack spacing="6">
                <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
              </Stack>
                  <Button colorScheme="blue" size="lg" fontSize="md" isLoading={loading} type="submit">
                    Gửi
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
  
  export default ForgotPasswordScreen;
  