import React from "react";
import { Link, Container, Heading, Text } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

const CopyRightScreen = () => {
  return (
    <Container maxW="5xl" minH="100vh" mt="20">
      <Heading size="1xl" textAlign="center" pt={10} pb={10}>
        BẢN QUYỀN
      </Heading>
      <Text pb={10} >
        <i>VỚI MỤC ĐÍCH CHIA SẺ KINH NGHIỆM DU LỊCH CHO TẤT CẢ MỌI NGƯỜI MỘT CÁCH MIỄN PHÍ. 
        NHỮNG BÀI VIẾT TRÊN LACA.FUN CÓ THỂ ĐƯỢC CHIA SẺ VÀ SỬ DỤNG LẠI NHƯNG PHẢI CHÚ THÍCH NGUỒN GỐC
        TỪ LACA.FUN</i>
      </Text>

      <Text>Chính sách riêng tư của laca.fun. <Link as={ReactLink} to="/privacy" color="blue.500">Xem tại đây</Link></Text>
      <Text>Điều khoản sử dụng của laca.fun. <Link as={ReactLink} to="/terms-and-conditions" color="blue.500">Xem tại đây</Link></Text>
      
    </Container>
  );
};

export default CopyRightScreen;
