import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import BlogScreen from "./screens/BlogScreen";
import BlogScreenCountry from "./screens/BlogScreenCountry";
import ContactScreen from "./screens/ContactScreen";
import SingleBlogScreen from "./screens/SingleBlogScreen";
import LoginScreen from "./screens/LoginScreen";
import LoginSuccessScreen from "./screens/LoginSuccessScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AdminScreen from "./screens/AdminScreen";
import Footer from "./components/Footer";
import AboutScreen from "./screens/AboutScreen";
import HomeScreen from "./screens/HomeScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/blog/:category" element={<BlogScreen />}></Route>
            <Route
              path="/blog/country/:country"
              element={<BlogScreenCountry />}
            ></Route>
            <Route path="/:id" element={<SingleBlogScreen />}></Route>
            <Route path="/contact" element={<ContactScreen />}></Route>
            <Route path="/login" element={<LoginScreen />}></Route>
            <Route
              path="/login-success/:token"
              element={<LoginSuccessScreen />}
            ></Route>
            <Route
              path="/forgotpassword"
              element={<ForgotPasswordScreen />}
            ></Route>
            <Route
              path="/passwordreset/:token"
              element={<ResetPasswordScreen />}
            ></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/admin-console" element={<AdminScreen />}></Route>
            <Route path="/create-post" element={<AdminScreen />}></Route>
            <Route path="/about" element={<AboutScreen />}></Route>
            {/* <Route path="/" element={<HomeScreen />}></Route> */}
            <Route
              path="/"
              element={<Navigate to="/blog/latest" replace={true} />}
            ></Route>
            <Route path="/404" element={<NotFoundScreen />}></Route>
            <Route
              path="*"
              element={<Navigate to="/404" replace={true} />}
            ></Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </ChakraProvider>
  );
};

export default App;
