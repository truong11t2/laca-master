import React from "react";
import { useEffect } from "react";
import { requestToken } from "../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";

const LoginSuccessScreen = () => {
  const dispatch = useDispatch(); 

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    if (userInfo) {
      // go back to prevous page before login
        window.history.go(-3)
      }
    }
    , [userInfo]);

  useEffect(() => {
    window.scroll(0, 0);
    // make request to get token for access
    dispatch(requestToken());
    }, []);

  return (
    <div></div>
    // <Container maxW="5xl" minH="100vh" mt="20">
    //   <Heading size="1xl" textAlign="center" pt={10} pb={10}>
    //     Đăng nhập thành công!
    //   </Heading>
    // </Container>
  );
};

export default LoginSuccessScreen;
