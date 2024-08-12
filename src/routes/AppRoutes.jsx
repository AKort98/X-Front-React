import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "../utils/ProtectedRoutes.jsx";
import PostDetails from "../pages/PostDetails.jsx";
import Home from "../pages/Home.jsx";
import CreateAccount from "../components/CreateAccount.jsx";
import VeifyYourEmail from "../pages/VeifyYourEmail.jsx";
import Signin from "../pages/Signin.jsx";
import Feed from "../pages/Feed.jsx";
import MainLayout from "./MainLayout.jsx";
import { motion } from "framer-motion";
import ProfilePage from "../pages/ProfilePage.jsx";
import UserPosts from "../components/UserPosts.jsx";
import UserReplies from "../components/UserReplies.jsx";
import UserMedia from "../components/UserMedia.jsx";
import ProtectedProfile from "../components/ProtectedProfile.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<CreateAccount />} />
        <Route path="/verify-email" element={<VeifyYourEmail />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Feed />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route element={<ProtectedProfile />}>
              <Route path="/:username" element={<ProfilePage />}>
                <Route path="" element={<UserPosts />} />
                <Route path="replies" element={<UserReplies />} />
                <Route path="media" element={<UserMedia />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
