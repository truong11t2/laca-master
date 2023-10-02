import React from "react";
import { Link, Container, Heading, Text } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

const PrivacyScreen = () => {
  return (
    <Container maxW="5xl" minH="100vh" mt="20">
      <Heading size="1xl" textAlign="center" pt={10} pb={10}>
        CHÍNH SÁCH QUYỀN RIÊNG TƯ
      </Heading>
      <Text pb={5} align="right" ><i>Sửa đổi lần cuối vào tháng 10 năm 2023</i></Text>
      <Text pt={2} pb={2}>
        Nhằm mang lại trải nghiệm tốt nhất cho người dùng trên trang web laca.fun (La Cà), 
        thông tin nhận dạng cá nhân hoặc dữ liệu cá nhân của người dùng sẽ được thu thập, 
        sử dụng, tiết lộ, xử lý trong khuôn khổ bảo vệ người dùng của laca.fun.
      </Text>
      <Text pt={2} pb={2}>
        laca.fun tin rằng người dùng có quyền được biết về các loại dữ liệu cá nhân mà 
        trang web thu thập cũng như mục đích sử dụng chúng. Sau khi đọc Chính sách Quyền riêng tư này, 
        người dùng sẽ có thể mình tự quyết định việc chia sẻ dữ liệu cá nhân với laca.fun. 
        Dữ liệu cá nhân ở đây đề cập đến mọi thông tin liên quan đến một thể nhân có thể định danh/nhận dạng được
        ("Dữ liệu cá nhân"). Khi truy cập laca.fun, người dùng thừa nhận rằng đã đọc 
        Chính sách Quyền riêng tư này và các <Link as={ReactLink} to="/terms-and-conditions" color="blue.500">
         Điều khoản sử dụng</Link> của laca.fun cũng như đã hiểu 
        toàn bộ nội dung & hậu quả của chúng; người dùng đồng ý và chấp thuận cho laca.fun thu thập, 
        sử dụng, tiết lộ và xử lý Dữ liệu cá nhân theo Chính sách Quyền riêng tư này và/hoặc các 
        <Link as={ReactLink} to="/terms-and-conditions" color="blue.500"> Điều khoản sử dụng</Link>. 
        Hơn nữa, người dùng cũng thừa nhận rằng toàn bộ Dữ liệu cá nhân mà người dùng đã cung cấp hoặc sẽ cung cấp 
        là dữ liệu chính chủ, đúng và chính xác.
      </Text>
      <Text pt={2} pb={2}>
        Tùy từng thời điểm, laca.fun có thể sửa đổi Chính sách Quyền riêng tư này để phản ánh các thay đổi về 
        luật pháp và quy định, thông lệ sử dụng của trang web, các tính năng Hệ thống và/hoặc các tiến bộ công nghệ. 
        Nếu có phiên bản sửa đổi về chính sách thu thập hoặc sử dụng Dữ liệu cá nhân của người dùng thì 
        những nội dung thay đổi sẽ được cập nhật vào Chính sách Quyền riêng tư này và ngày hiệu lực sẽ được ghi chú 
        vào phần đầu văn bản. Do đó, quý khách hàng nên định kỳ xem lại Chính sách Quyền riêng tư này để cập nhật 
        các chính sách và thông lệ mới nhất từ laca.fun. Nếu người dùng không đồng ý với bất kỳ 
        thay đổi hoặc sửa đổi nào đối với Chính sách Quyền riêng tư, người dùng có quyền rời khỏi laca.fun. 
        Người dùng tiếp tục sử dụng Hệ thống sau ngày sửa đổi có hiệu lực, thì người dùng sẽ được xem là đã đồng ý 
        và chấp nhận sửa đổi của Chính sách Quyền riêng tư.
      </Text>
      <h3>
        Chính sách quyền riêng tư này bao gồm những phần sau:
      </h3>
      
      <h4>1. Thu thập thông tin</h4>
      <Text pt={2} pb={2}>
      laca.fun thu thập thông tin khi người dùng đăng ký trên trang web, đăng nhập vào tài khoản. Các thông tin thu thập 
      bao gồm họ tên, địa chỉ email, hình đại diện.
      </Text>

      <h4>2. Sử dụng thông tin</h4>
      <Text pt={2} pb={2}>
        Bất kỳ thông tin laca.fun thu thập từ người dùng sẽ được dùng:
      </Text>
      <ul>
        <li>Đáp ứng riêng theo sở thích riêng cũng như trải nghiệm của người dùng</li>
        <li>Cung cấp các nội dung quảng cáo phù hợp</li>
        <li>Cải thiện trang web laca.fun</li>
        <li>Cải thiện dịch vụ khách hàng cũng như các yêu cầu trợ giúp từ khách hàng</li>
        <li>Liên hệ với người dùng qua email</li>
        <li>Khảo sát lấy ý kiến người dùng</li>
      </ul>

      <h4>3. Chính sách thương mại điện tử</h4>
      <Text pt={2} pb={2}>
        laca.fun sở hữu duy nhất các thông tin được thu thập trên trang web này. Các thông tin cá nhân của người dùng 
        sẽ không được bán, trao đổi cho một bên thứ 3 nào nếu không có sự đồng ý từ người dùng.
      </Text>

      <h4>4. Thông cáo bên thứ 3</h4>
      <Text pt={2} pb={2}>
        laca.fun không bán, giao thương hoặc chuyển đổi các thông tin cá nhân cho bên ngoài. 
        Điều này không bao gồm các bên thứ 3 đáng tin cậy hỗ trợ laca.fun vận hành trang web 
        hoặc dịch vụ của laca.fun khi mà các đối tác này cũng cam kết bảo mật các thông tin này.

        laca.fun tin rằng việc chia sẽ thông tin là cần thiết trong các trường hợp để điều tra, 
        ngăn chặn hoặc thực thi các biện pháp chống lại các hoạt động phạm pháp, 
        gian lận đáng ngờ hoặc các tình huống có thể dẫn tới các nguy hiểm cho người dùng, 
        các hành động vi phạm điều khoản sử dụng hay được yêu cầu bởi pháp luật.

        Các thông tin không riêng tư mặt khác có thể được cung cấp cho bên thứ 3 
        nhằm mục đích quảng cáo, marketing hoặc mục đích khác.
      </Text>
 
      <h4>5. Bảo mật thông tin</h4>
      <Text pt={2} pb={2}>
        laca.fun ứng dụng nhiều biện pháp để bảo mật dữ liệu cá nhân người dùng. Cụ thể, laca.fun 
        sử dụng thuật toán mã hóa cao cấp để bảo mật các lần đăng nhập trực tuyến của người dùng. 
      </Text>

      <h4>6. laca.fun có dùng cookies?</h4>
      <Text pt={2} pb={2}>
        Câu trả lời là không, nhưng laca.fun có thể sử dụng cookies trong tương lai.
        Cookies được laca.fun dự định sử dụng để cải thiện tính tiện dụng.
        Ngoài ra, cookies giúp theo dõi cũng như đáp ứng theo nhu cầu riêng của từng người dùng. 
        Tất cả cookie sử dụng đều không liên quan tới các thông tin cá nhân trên trang web laca.fun.
      </Text>

      <h4>7. Hủy nhận thư</h4>
      <Text pt={2} pb={2}>
        laca.fun sử dụng địa chỉ email được người dùng cung cấp để gửi các thông tin và cập nhật 
        mà người dùng quan tâm như các bài viết mới, quảng cáo...
        Bất kỳ khi nào người dùng muốn hủy nhận thư, người dùng có thể liên lạc với laca.fun qua 
        <Link as={ReactLink} to="/contact" color="blue.500"> liên kết này</Link>.
      </Text>
 
      <h4>8. Đồng ý</h4>
      <Text pt={2} pb={20}>
        Bằng cách sử dụng trang web laca.fun, người dùng đã đồng ý với chính sách riêng tư này.
      </Text>
      
    </Container>
  );
};

export default PrivacyScreen;
