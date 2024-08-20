import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "../utils/ProtectedRoutes.jsx";
import PostDetails from "../pages/PostDetails.jsx";
import Home from "../pages/Home.jsx";
import CreateAccount from "../components/CreateAccount.jsx";
import VeifyYourEmail from "../pages/VeifyYourEmail.jsx";
import Signin from "../pages/Signin.jsx";
import Feed from "../pages/Feed.jsx";
import MainLayout from "./MainLayout.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import CommentDetails from "../pages/CommentDetails.jsx";
import ProtectedProfile from "../components/Profile/ProtectedProfile.jsx";
import UserPosts from "../components/Profile/UserPosts.jsx";
import UserReplies from "../components/Profile/UserReplies.jsx";
import UserMedia from "../components/Profile/UserMedia.jsx";
import ForYouPage from "../pages/ForYouPage.jsx";
import Followers from "../pages/Followers.jsx";
import Following from "../pages/Following.jsx";
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
            <Route path="/foryou" element={<ForYouPage />} />
            <Route element={<ProtectedProfile />}>
              <Route path="/:username/Followers" element={<Followers />} />
              <Route path="/:username/following" element={<Following />} />
            </Route>

            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/comment/:commentId" element={<CommentDetails />} />
            <Route element={<ProtectedProfile />}>
              <Route path="/user/:username" element={<ProfilePage />}>
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
