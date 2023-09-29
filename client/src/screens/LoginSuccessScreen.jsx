import React from "react";
import { useEffect } from "react";
import { requestToken } from "../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { Container, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const LoginSuccessScreen = () => {
  const dispatch = useDispatch(); 
  const { token } = useParams();
  //const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    if (userInfo) {
      // go back to prevous page before login
        const previousPageUrl = JSON.parse(localStorage.getItem("previousPage"))
        //console.log(previousPageUrl);
        //navigate(previousPageUrl);
        window.location.replace(previousPageUrl);
        //window.history.go(-3)
      }
    }
    , [userInfo]);

  useEffect(() => {
    window.scroll(0, 0);
    // make request to get token for access
    dispatch(requestToken(token));
    }, []);

  return (
    <Container maxW="5xl" minH="100vh" mt="20">
      <Heading size="1xl" textAlign="center" pt={10} pb={10}>
        Đăng nhập thành công! Vui lòng chờ chuyển trang.
      </Heading>
    </Container>
  );
};

export default LoginSuccessScreen;
