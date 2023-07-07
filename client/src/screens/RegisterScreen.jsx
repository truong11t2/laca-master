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
import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import PasswordField from "../components/PasswordField";
import TextField from "../components/TextField";
import { register } from "../redux/actions/userActions";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirect = "/";
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
      toast({ description: "Register successful.", status: "success", isClosable: true });
    }
  }, [userInfo, redirect, error, navigate, location.state, toast]);

  return (
    <Formik
      initialValues={{ firstname: "", lastname: "", email: "", password: "", confirmPassword: "" }}
      validationSchema={Yup.object({
        firstname: Yup.string()
          .min(2, "First name is too short - must contain at least 2 characters.")
          .required("First name is required."),
          lastname: Yup.string()
          .min(2, "Last name is too short - must contain at least 2 characters.")
          .required("Last name is required."),
        email: Yup.string().email("Invalid email.").required("An email address is required."),
        password: Yup.string()
          .min(6, "Password is too short - must contain at least 6 characters.")
          .required("Password is required."),
        confirmPassword: Yup.string()
          .min(6, "Password is too short - must contain at least 6 characters.")
          .required("Please retype your password.")
          .oneOf([Yup.ref("password"), null], "Password must match"),
      })}
      onSubmit={(values) => {
        dispatch(register(values.firstname, values.lastname, values.email, values.password));
      }}
    >
      {(formik) => (
        <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", md: "8" }} minH="4xl">
          <Stack spacing="8">
            <Stack spacing="6">
              <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                <Heading size={headingBR}>Register account</Heading>
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
                    <TextField type="text" name="firstname" placeholder="First name" label="First Name*" />
                    <TextField type="text" name="lastname" placeholder="Last name" label="Last Name*" />
                    <TextField type="text" name="email" placeholder="you@example.com" label="Email*" />
                    <PasswordField type="password" name="password" placeholder="Type your password" label="Password*" />
                    <PasswordField
                      type="password"
                      name="confirmPassword"
                      placeholder="Retype your password"
                      label="Confirm Password*"
                    />
                  </FormControl>
                </Stack>
                <Stack spacing="6">
                  <Button colorScheme="blue" size="lg" fontSize="md" isLoading={loading} type="submit">
                    Sign up
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

export default RegisterScreen;
