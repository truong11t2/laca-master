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
        Bằng cách truy cập và/hoặc sử dụng Trang Web laca.fun ("Trang web"), bạn thừa nhận rằng bạn đã đọc, 
        hiểu và đồng ý chịu sự ràng buộc bởi các Điều Khoản Sử Dụng được quy định dưới đây.
      </Text>
      <Text pt={2} pb={2}>
        Xin lưu ý rằng laca.fun có thể thay đổi, sửa đổi, bổ sung và loại bỏ các Điều Khoản này vào bất 
        cứ thời điểm nào mà không cần thông báo trước. Bạn phải đọc các Điều Khoản này một cách định kỳ. 
        Bằng việc tiếp tục sử dụng Trang Web này sau khi đã có những thay đổi như vậy đối với các 
        Điều Khoản, người truy cập, người dùng hoặc Người Dùng Đã Đăng Ký (“bạn” hay “Người Dùng”) 
        đồng ý và chấp thuận với những thay đổi đó.
      </Text>
      <h4>1. Lời khuyên du lịch</h4>
      <Text></Text>
        Trang web chỉ là nơi cung cấp thông tin, những chia sẻ để người dùng có thêm thông tin trước khi du lịch
        đến những địa điểm được đề cập trên laca.fun. 
        Người dùng có toàn quyền và chịu trách nhiệm về những quyết định của riêng mình khi đến những địa điểm.
      <Text pt={2} pb={2}>
        Bằng cách hiển thị các điểm đến cụ thể, laca.fun không tuyên bố hoặc bảo đảm rằng việc đến 
        các điểm này là nên hoặc không có rủi ro và laca.fun không chịu trách nhiệm pháp lý 
        về thiệt hại hay tổn thất có thể xảy ra do việc du lịch đến các điểm đó. Trong mọi trường hợp 
        laca.fun sẽ không chịu trách nhiệm pháp lý về bất kỳ sự cố bất lợi xảy ra trong suốt chuyến đi 
        hoặc sự lưu trú của bạn. Bạn tự chịu trách nhiệm về việc lựa chọn chuyến du lịch, lộ trình 
        và điểm đến, cho toàn bộ hành trình của bạn.
    </Text>
      
      <h4>2. Tương tác trên laca.fun</h4>
      <Text pt={2} pb={2}>
        Tất cả những bài viết, bình luận từ người dùng phải tuân thủ những quy định về pháp luật của
        Nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam và nước sở tại của người dùng.
      </Text>
      <Text pt={2} pb={2}>
        Những bài viết, bình luận không được vi phạm thuần phong mỹ tục của Việt Nam, tôn trọng những
        cá nhân, tập thể khác, không chấp nhận những nội dung đả kích chính trị, tôn giáo. 
        Bài viết, bình luận không được xúc phạm bất kỳ cá nhân, tập thể hay bên thứ 3, 
        không dùng từ ngữ thiếu chuẩn mực. Tất cả bài viết, bình luận 
        vi phạm những điều này sẽ bị loại bỏ mà không báo trước.
      </Text>
      
    </Container>
  );
};

export default TermAndConditionScreen;
