"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { CreatePost } from "./component/create-post";

export default function CreatePostBtn() {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };
  return (
    <aside className="flex items-center justify-center w-full h-screen px-4">
      {!show ? (
        <button
          onClick={toggleShow}
          className="fixed bottom-0 right-0 m-4 md:m-8 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-black active:scale-95"
        >
          <FaPlus />
        </button>
      ) : (
        <CreatePost />
      )}
    </aside>
  );
}
