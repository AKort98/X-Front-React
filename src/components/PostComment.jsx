import React from "react";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { storage } from "../../firebase";
import { motion } from "framer-motion";
import { BiPoll } from "react-icons/bi";
import { FaUpload } from "react-icons/fa";
import { GiFactory } from "react-icons/gi";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function PostComment({ data }) {
  const [showReply, setShowReply] = useState(false);
  const [loading, setloading] = useState(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const submitComment = async () => {
    try {
      setloading(true);
      const url = await handleUpload();

      const response = await fetch(
        `http://localhost:8080/user/postComment?tweetId=${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: content, imageUrl: url }),
        },
      );
      if (response.ok) {
        setloading(false);
        setContent("");
        queryClient.invalidateQueries("comments");
      }

      if (!response.ok) {
        setContent("");
        setloading(false);
      }
    } catch (error) {
      setContent("");
      setloading(false);
    }
  };

  const handleUpload = async () => {
    if (!image) return null;

    try {
      const storageRef = ref(storage, `${image.name}`);
      await uploadBytes(storageRef, image);
      console.log(`Image ${image.name} has been uploaded`);

      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="border-b-[0.5px] border-gray-700 p-4">
      <div className="flex gap-4">
        <img src={user.avatar} alt="avatar" className="size-12 rounded-full" />
        <div className="flex w-full flex-col">
          {showReply ? (
            <motion.div
              initial={{ x: -10 }} // Start position (below the initial position)
              animate={{ x: 0 }} // End position (at the initial position)
              transition={{ duration: 0.5 }} // Animation duration
              className="text-white"
            >{`replying to @${data.tweet.user.username}`}</motion.div>
          ) : undefined}
          <textarea
            placeholder="Post your reply"
            className="w-full bg-transparent text-xl text-white focus:outline-none"
            onFocus={() => setShowReply(true)}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {showReply ? (
            <div className="mt-6 flex items-end justify-between">
              <div className="flex w-1/3 justify-between gap-3">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => setImage(e.target.files[0])}
                  hidden={true}
                ></input>
                <FaUpload
                  className="cursor-pointer text-blue-700"
                  onClick={handleButtonClick}
                />
                <GiFactory className="cursor-pointer text-blue-700" />
                <BiPoll className="cursor-pointer text-blue-700" />
                <FaUpload className="cursor-pointer text-blue-700" />
              </div>
              <div className="">
                <button
                  className="rounded-3xl bg-blue-500 px-5 py-1 disabled:opacity-50"
                  disabled={loading || content === ""}
                  onClick={submitComment}
                >
                  {loading ? "posting" : "Post"}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PostComment;
