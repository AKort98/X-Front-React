import React, { useRef, useState } from "react";
import { BiPoll } from "react-icons/bi";
import { FaSmile, FaUpload } from "react-icons/fa";
import { GiFactory } from "react-icons/gi";
import { useQueryClient } from "react-query";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { CircularProgress } from "@mui/material";
import EmojiPicker from "emoji-picker-react";

function CreatePost() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [emoji, setEmoji] = useState(false);

  const fileInputRef = useRef(null);

  const postTweet = async () => {
    setLoading(true);
    const urls = await uploadImages();
    const response = await fetch("http://localhost:8080/user/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ content: content, images: urls }),
    });
    if (response.ok) {
      queryClient.invalidateQueries("posts");
      setContent("");
      setLoading(false);
      setSelectedImages([]);
      setPreviewUrls([]);
      setWordCount(0);
      return;
    }
    if (!response.ok) {
      setLoading(false);
      setContent("");
    }
  };

  const handleImagepreview = (e) => {
    setSelectedImages(e.target.files);
    const previews = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file),
    );
    setPreviewUrls(previews);
  };

  const handleEmojiClick = (e) => {
    setContent((prevContent) => prevContent + e.emoji);
  };

  const handleInput = (e) => {
    setContent(e.target.value);
    setdisabled(false);
    const wordCount = e.target.value.split("");
    if (wordCount.length > 100) {
      setdisabled(true);
    }
    setWordCount(wordCount.length);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const uploadImages = async () => {
    const files = selectedImages;
    if (!files || files.length === 0) return [];

    const urls = [];

    // Create an array of upload promises
    const uploadPromises = Array.from(files).map(async (file) => {
      const imageRef = ref(storage, `${file.name}`);

      try {
        // Upload the image to Firebase Storage
        await uploadBytes(imageRef, file);
        console.log(`Image ${file.name} has been uploaded`);

        // Retrieve the download URL of the uploaded image
        const downloadURL = await getDownloadURL(imageRef);

        // Add the URL to the array
        urls.push(downloadURL);
      } catch (error) {
        console.error(`Error uploading image ${file.name}:`, error);
      }
    });

    // Wait for all uploads to complete
    await Promise.all(uploadPromises);
    return urls; // Return the array of URLs
  };

  return (
    <div className="flex w-full flex-col gap-2 border-b-[1px] border-b-gray-700 bg-black p-4 text-white">
      <div className="items center flex gap-2">
        <img src={currentUser.avatar} alt="" className="size-9 rounded-full" />
        <div className="mt-2 flex w-full flex-col text-wrap">
          <textarea
            placeholder="What is happening?!"
            className="resize-none overflow-scroll bg-transparent text-xl focus:outline-none"
            value={content}
            onChange={(e) => handleInput(e)}
            rows={2}
          />

          <div className="mx-auto w-[600px]">
            <div className="flex flex-wrap">
              {previewUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Preview ${index}`}
                  className="w-1/2 rounded-sm object-cover"
                />
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div className="flex w-1/3 justify-between gap-3">
              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => handleImagepreview(e)}
                hidden={true}
              ></input>
              <FaUpload
                className="cursor-pointer text-blue-700"
                onClick={handleButtonClick}
              />
              <GiFactory className="cursor-pointer text-blue-700" />
              <BiPoll className="cursor-pointer text-blue-700" />
              <div className="relative">
                <FaSmile
                  className="cursor-pointer text-blue-700"
                  onClick={() => setEmoji((prev) => !prev)}
                />
                <div className="absolute">
                  <EmojiPicker
                    className="absolute left-8 z-10"
                    open={emoji}
                    theme="dark"
                    onEmojiClick={handleEmojiClick}
                    lazyLoadEmojis={true}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              {wordCount > 100 ? (
                <CircularProgress
                  variant="determinate"
                  value={100}
                  color="error"
                />
              ) : (
                <CircularProgress variant="determinate" value={wordCount} />
              )}
              <button
                className="rounded-3xl bg-blue-500 px-5 py-1 disabled:opacity-50"
                disabled={loading || content === "" || disabled}
                onClick={postTweet}
              >
                {loading ? "posting" : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
