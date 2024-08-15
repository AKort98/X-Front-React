import React from "react";
import InteractWithProfileBar from "./InteractWithProfileBar";
import { useState } from "react";
import { CgClose } from "react-icons/cg";

function ProfileHeader({ data }) {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const previewImage = (url) => {
    setImageUrl(url);
    setOpen(true);
  };

  return (
    <>
      {open && (
        <div className="fixed left-0 top-0 z-50 flex h-dvh w-dvw items-center justify-center bg-[#080808de]">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="absolute left-8 top-8 rounded-full bg-[#02020293] p-2 hover:bg-[#020202cc]"
          >
            <CgClose size={24} color="white" />
          </button>
          <img
            src={imageUrl}
            alt="preview image"
            className="h-[60%] rounded-full"
          />
        </div>
      )}
      <div className="h-[120px] md:h-[250px]">
        <img
          src={
            data.user.header ||
            "https://user-images.githubusercontent.com/513929/53929982-e5497700-404c-11e9-8393-dece0b196c98.png"
          }
          alt=""
          className="h-44 w-full object-cover md:h-60"
        />
        <img
          src={data.user.avatar}
          alt="user avatar"
          className="size-24 translate-x-3 translate-y-[-50px] cursor-pointer rounded-full border-4 border-black object-cover hover:opacity-75 md:size-40 md:translate-x-3 md:translate-y-[-90px]"
          onClick={(e) => previewImage(e.target.src)}
        />
      </div>
      <InteractWithProfileBar data={data} />
    </>
  );
}

export default ProfileHeader;
