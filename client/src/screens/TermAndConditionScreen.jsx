import React from "react";
import { Link, Container, Heading, Text } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

const TermAndConditionScreen = () => {
  return (
    <Container maxW="5xl" minH="100vh" mt="20">
      <Heading size="1xl" textAlign="center" pt={10} pb={10}>
        ĐIỀU KHOẢN SỬ DỤNG
      </Heading>
      <Text pb={5} >
        <i>BẠN PHẢI ĐỌC NHỮNG ĐIỀU KHOẢN SỬ DỤNG DƯỚI ĐÂY TRƯỚC KHI SỬ DỤNG TRANG WEB NÀY. 
        VIỆC SỬ DỤNG TRANG WEB NÀY XÁC NHẬN VIỆC CHẤP THUẬN VÀ TUÂN THỦ CÁC ĐIỀU KHOẢN VÀ ĐIỀU KIỆN DƯỚI ĐÂY.</i>
      </Text>
      <Text pt={2} pb={2}>
        Bằng cách truy cập và/hoặc sử dụng laca.fun, người truy cập, người dùng hoặc 
        người dùng đã đăng ký (gọi tắt là "người dùng") thừa nhận đã đọc, 
        hiểu và đồng ý chịu sự ràng buộc bởi các Điều Khoản Sử Dụng được quy định dưới đây.
      </Text>
      <Text>Người dùng có thể tham khảo thêm Chính sách riêng tư tại <Link as={ReactLink} to="/privacy" color="blue.500">đây</Link>
      </Text>
      <Text pt={2} pb={2}>
        Xin lưu ý rằng laca.fun có thể thay đổi, sửa đổi, bổ sung và loại bỏ các Điều Khoản này vào bất 
        cứ thời điểm nào mà không cần thông báo trước. Người dùng phải đọc các Điều Khoản này một cách định kỳ. 
        Bằng việc tiếp tục truy cập laca.fun sau khi đã có những thay đổi đối với các 
        Điều Khoản, người dùng đồng ý và chấp thuận với những thay đổi đó.
      </Text>
      <h4>1. Lời khuyên du lịch</h4>
      <Text></Text>
        laca.fun chỉ là nơi cung cấp thông tin, hoặc những chia sẻ để người dùng có thêm thông tin khi du lịch
        đến những địa điểm được đề cập trên laca.fun. 
        Người dùng có toàn quyền quyết định và chịu trách nhiệm về những quyết định của mình khi du lịch.
      <Text pt={2} pb={2}>
        Bằng cách đề cập các điểm đến cụ thể, laca.fun không tuyên bố hoặc bảo đảm rằng việc đến 
        các điểm này là nên hoặc không có rủi ro và laca.fun không chịu trách nhiệm pháp lý 
        về thiệt hại hay tổn thất có thể xảy ra do việc du lịch đến các địa điểm đó. Trong mọi trường hợp 
        laca.fun sẽ không chịu trách nhiệm pháp lý về bất kỳ sự cố bất lợi xảy ra trong suốt chuyến đi 
        hoặc sự lưu trú của người dùng. Người dùng tự chịu trách nhiệm về việc lựa chọn chuyến du lịch, lộ trình 
        và điểm đến, cho toàn bộ hành trình của người dùng.
    </Text>
      
      <h4>2. Tương tác trên laca.fun</h4>
      <Text pt={2} pb={2}>
        Tất cả những bài viết, bình luận từ người dùng phải tuân thủ những quy định về pháp luật của
        Nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam và nước sở tại của người dùng.
      </Text>
      <Text pt={2} pb={2}>
        Những bài viết, bình luận không được vi phạm thuần phong mỹ tục của Việt Nam, tôn trọng những
        cá nhân, tổ chức, tập thể. laca.fun không chấp nhận những nội dung đả kích chính trị, tôn giáo. 
        Bài viết, bình luận không được xúc phạm bất kỳ cá nhân, tập thể hay bên thứ ba, 
        không dùng từ ngữ thiếu chuẩn mực. Ban quản trị laca.fun có quyền xem xét và đánh giá bài viết, 
        bình luận có vi phạm những điều trên hay không. Nếu vi phạm người dùng có thể bị cấm đăng bài, bình luận 
        và những bài viết, bình luận vi phạm sẽ bị loại bỏ.
      </Text>
      
    </Container>
  );
};

export default TermAndConditionScreen;
