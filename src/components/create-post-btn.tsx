"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { CreatePost } from "./component/create-post";

export default function CreatePostBtn(props: { userName: string }) {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };
  return (
    <aside className="flex h-screen w-full items-center justify-center px-4">
      {!show ? (
        <button
          onClick={toggleShow}
          className="fixed bottom-0 right-0 m-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-black active:scale-95 md:m-8"
        >
          <FaPlus />
        </button>
      ) : (
        <CreatePost userName={props.userName} setShow={setShow} />
      )}
    </aside>
  );
}
