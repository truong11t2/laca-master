import { Box, Flex, Heading, HStack, Icon, Image, Link, Stack, useColorModeValue, Text } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import { Link as ReactLink } from "react-router-dom";

const AboutScreen = () => (
  <Box maxW="8xl" mx="auto" px={{ base: "0", lg: "12" }} py={{ base: "0", lg: "12" }} minH="6xl">
    <Stack direction={{ base: "column-reverse", lg: "row" }} spacing={{ base: "0", lg: "20" }}>
      <Box
        width={{ lg: "sm" }}
        transform={{ base: "translateY(-50%)", lg: "none" }}
        bg={{ base: useColorModeValue("blue.50", "blue.900"), lg: "transparent" }}
        mx={{ base: "6", md: "8", lg: "0" }}
        px={{ base: "6", md: "8", lg: "0" }}
        py={{ base: "6", md: "8", lg: "12" }}
      >
        <Stack spacing={{ base: "8", lg: "10" }}>
          <Stack spacing={{ base: "2", lg: "4" }}>
            {/*             <Flex>
              <Icon as={GiWorld} h="12" w="12" color="blue.500" />
              <Text px="5" fontSize="4xl" fontWeight="extrabold">
                La Cà
              </Text>
            </Flex> */}

            <Heading fontWeight="normal" size={{ base: "sm", md: "md" }} color="gray.500">
              <span style={{ fontWeight: "bold" }}>Xin chào, Mình là Trường - Một người yêu thích du lịch.</span> Mình hay la cà một mình để tận hưởng sự tự do. 
              Blog này là nơi mình muốn chia sẻ những thông tin mình cảm thấy hữu ích cho những người cùng sở thích. 
            </Heading>

            <Heading fontWeight="normal" size={{ base: "sm", md: "md" }} color="gray.500">
              Nếu bạn là người đam mê du lịch, thích chia sẽ những kỷ niệm đáng nhớ thì đây cũng có thể là một nơi để bạn có thể thử.
              Liên hệ với mình <Link as={ReactLink} to="/contact" color="blue.500">tại đây</Link> để nhận được quyền viết bài trên blog.
            </Heading>
            <Heading fontWeight="normal" size={{ base: "sm", md: "md" }} color="gray.500">Chúc một ngày tốt lành!</Heading>
          </Stack>
          <HStack>
            <Link as={ReactLink} to="/blog/all" color="blue.500" fontWeight="bold" fontSize="xl">
              Khám Phá Blog
            </Link>
            <Icon color="blue.500" as={FaArrowRight} />
          </HStack>
        </Stack>
      </Box>
        <Flex flex="1" overflow="hidden">
        <Image src="/images/landing.jpg" alt="Lovely Image" maxH="550px" minW="300px" objectFit="cover" flex="1" />
      </Flex>
    </Stack>
  </Box>
);

export default AboutScreen;
