import React from "react";
import { BiCamera } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { useState, useRef } from "react";
import userStore from "../../zustand/userStore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import { useQueryClient } from "react-query";

function EditProfile({ data }) {
  const fileInputRef = useRef(null);
  const avatarRef = useRef(null);
  const { close } = userStore();
  const [remove, setRemove] = useState(false);
  const [headerToUpload, setHeaderToUpload] = useState();
  const [avatarToUpload, setAvatarToUpload] = useState();
  const [disableButton, setDisableButton] = useState(false);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    displayname: data.user.displayname,
    description: data.user.description,
    location: data.user.location || "",
    header: data.user.header,
    avatar: data.user.avatar,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const removeImage = () => {
    if (formData.header) {
      URL.revokeObjectURL(formData.header); // Clean up object URL
    }
    setRemove(true);
    setFormData({ ...formData, header: "remove" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleHeaderChange = (e) => {
    setHeaderToUpload(e.target.files[0]);
    const header = URL.createObjectURL(e.target.files[0]);
    setFormData({ ...formData, header: header });
    setRemove(false);
  };
  const handleAvatarChange = (e) => {
    setAvatarToUpload(e.target.files[0]);
    const avatar = URL.createObjectURL(e.target.files[0]);
    setFormData({ ...formData, avatar: avatar });
  };

  const handleUpload = async () => {
    if (!headerToUpload) return null;

    try {
      const storageRef = ref(storage, `${headerToUpload.name}`);
      await uploadBytes(storageRef, headerToUpload);
      console.log(`Image ${headerToUpload.name} has been uploaded`);

      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarToUpload) return null;

    try {
      const storageRef = ref(storage, `${avatarToUpload.name}`);
      await uploadBytes(storageRef, avatarToUpload);
      console.log(`Image ${avatarToUpload.name} has been uploaded`);

      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const saveProfile = async () => {
    setDisableButton(true);
    const newUrl = await handleUpload();
    const newAvatarUrl = await handleAvatarUpload();

    const requestPayload = {
      displayName: formData.displayname,
      description: formData.description,
      header: formData.header,
      avatar: formData.avatar,
    };

    if (newUrl !== null) {
      requestPayload.header = newUrl;
    }
    if (newAvatarUrl !== null) {
      requestPayload.avatar = newAvatarUrl;
    }

    if (formData.header === null) {
      requestPayload.header = "remove";
    }

    const response = await fetch("http://localhost:8080/user/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(requestPayload),
    });

    if (response.ok) {
      setDisableButton(false);
      queryClient.invalidateQueries("username");
      close();
    }
  };

  return (
    <div className="relative flex h-dvh flex-col overflow-y-auto rounded-2xl bg-black md:h-[500px] md:w-[580px]">
      <div className="fixed z-10 flex w-[580px] items-center gap-8 rounded-2xl bg-transparent p-4 text-white backdrop-blur-md">
        <button onClick={close}>
          <CgClose size={24} />
        </button>
        <span className="flex-grow text-xl font-semibold">Edit Profile</span>
        <button
          className="rounded-2xl bg-white px-4 py-1 font-semibold text-black disabled:opacity-25"
          onClick={saveProfile}
          disabled={formData.displayname === "" || disableButton}
        >
          Save
        </button>
      </div>
      <div className="relative mt-16">
        <div className="relative">
          {formData.header !== null && formData.header !== "remove" ? (
            <img
              src={formData.header}
              alt="header"
              className="object-contain opacity-55"
            />
          ) : (
            <div className="h-[193px] w-full bg-black"></div>
          )}
          <div className="absolute left-[40%] top-[40%] flex gap-8">
            <input
              type="file"
              hidden={true}
              ref={fileInputRef}
              accept="image/*"
              multiple={false}
              onChange={(e) => handleHeaderChange(e)}
            />
            <button
              className="w-full"
              onClick={() => fileInputRef.current.click()}
            >
              <BiCamera
                size={24}
                className="size-10 rounded-full bg-[#00000062] p-2 text-white hover:bg-[#b8b4b423]"
              />
            </button>
            <button className="w-full" onClick={removeImage} hidden={remove}>
              <CgClose className="size-10 rounded-full bg-[#00000062] p-2 text-white hover:bg-[#b8b4b423]" />
            </button>
          </div>
        </div>
        <div className="relative">
          <img
            src={formData.avatar}
            alt=""
            className="absolute bottom-[-50px] left-4 size-24 rounded-full opacity-50"
          />
          <button className="absolute bottom-[-50px] left-4 flex size-24 items-center justify-center rounded-full hover:opacity-30">
            <BiCamera
              color="white"
              size={24}
              onClick={() => avatarRef.current.click()}
            />
            <input
              type="file"
              accept="image/*"
              multiple={false}
              hidden={true}
              ref={avatarRef}
              onChange={(e) => handleAvatarChange(e)}
            />
          </button>
        </div>
      </div>
      <form className="mt-14 flex w-full flex-col gap-2 p-4">
        <div className="flex flex-col">
          <span
            className={`text-lg ${formData.displayname === "" ? "text-red-600" : "text-gray-700"} `}
          >
            Name
          </span>
          <input
            type="text"
            className={`rounded-md border-[1px] border-gray-700 bg-transparent p-2 font-semibold text-white focus:border-blue-600 focus:outline-none ${formData.displayname === "" ? "border-red-600 focus:border-red-600" : ""} `}
            value={formData.displayname}
            onChange={handleChange}
            name="displayname"
            required
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg text-gray-700">Bio</span>
          <textarea
            className="rounded-md border-[1px] border-gray-700 bg-transparent p-2 font-semibold text-white focus:border-blue-600 focus:outline-none"
            value={formData.description}
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg text-gray-700">Location</span>
          <input
            type="text"
            className="rounded-md border-[1px] border-gray-700 bg-transparent p-2 font-semibold text-white focus:border-blue-600 focus:outline-none"
            value={formData.location}
            placeholder="Location"
            name="location"
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
