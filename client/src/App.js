import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import BlogScreen from "./screens/BlogScreen";
import ContactScreen from "./screens/ContactScreen";
import SingleBlogScreen from "./screens/SingleBlogScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AdminScreen from "./screens/AdminScreen";
import Footer from "./components/Footer";
import AboutScreen from "./screens/AboutScreen";
import HomeScreen from "./screens/HomeScreen";
import NotFoundScreen from "./screens/NotFoundScreen";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/blog/:category" element={<BlogScreen />}></Route>
            <Route path="/:id" element={<SingleBlogScreen />}></Route>
            <Route path="/contact" element={<ContactScreen />}></Route>
            <Route path="/login" element={<LoginScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/admin-console" element={<AdminScreen />}></Route>
            <Route path="/about" element={<AboutScreen />}></Route>
            {/* <Route path="/" element={<HomeScreen />}></Route> */}
            <Route path="/" element={<Navigate to="/blog/latest" replace={true} />}></Route>
            <Route path="/404" element={<NotFoundScreen />}></Route>
            <Route path="*" element={<Navigate to="/404" replace={true} />}></Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </ChakraProvider>
  );
};

export default App;
