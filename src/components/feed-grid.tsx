"use client";

import React, { useState } from "react";
import { CreatePost } from "./component/create-post";
import { FaPlus } from "react-icons/fa6";
import FeedCards from "./component/feed-cards";

export default function FeedGrid({ userName }: { userName: string }) {
  const [show, setShow] = useState(false);

  return (
    <main className="flex h-screen w-full flex-col text-2xl text-black">
      <FeedCards />
      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="fixed bottom-0 right-0 m-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-black active:scale-95 md:m-8"
        >
          <FaPlus />
        </button>
      ) : (
        <CreatePost userName={userName} setShow={setShow} />
      )}
    </main>
  );
}
