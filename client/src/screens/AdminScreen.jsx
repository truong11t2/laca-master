import { Box, Stack, Heading, Tabs, TabList, TabPanels, TabPanel, Tab, Container, Link } from '@chakra-ui/react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NewPostTab from '../components/NewPostTab';
import EditBlogPost from '../components/EditBlogPost';
import { Link as ReactLink } from "react-router-dom";

const AdminScreen = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const location = useLocation();

  return userInfo ? (
    <div>
      {userInfo.isAdmin || userInfo.isWriter ? (
      <Box p='20px' minH='100vh'>
      <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
        <Stack pr={{ base: 0, md: 14 }} spacing={{ base: 8, md: 10 }} flex='1.5' mb={{ base: 12, md: 'none' }}>
          <Heading fontSize='2xl' fontWeight='extrabold'>
            Admin Console
          </Heading>
          <Tabs size='md' variant='enclosed'>
            <TabList>
              <Tab>Create a New Blog Post</Tab>
              <Tab>Edit Blog Post</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <NewPostTab />
              </TabPanel>
              <TabPanel>
                <EditBlogPost />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Box>
    )  : (
      <Container maxW="5xl" minH="100vh" mt="20">
      <Heading size="2xl" textAlign="center" pt={10}>
        Oops! Bạn không đủ quyền truy cập trang này!
      </Heading>
      <Heading size="1xl" textAlign="center" pt={10} pb={10}>
        Vui lòng click vào link bên dưới để về trang chủ!
      </Heading>
      <p style={{ textAlign: "center" }}>
        <Link as={ReactLink} to="/blog/all" color="blue.500" fontWeight="bold" fontSize="xl">
          Khám phá Blog
        </Link>
      </p>
    </Container>
    )}
    </div>
    
  ) : (
    <Navigate to='/login' replace={true} state={{ from: location }} />
  );
};

export default AdminScreen;
