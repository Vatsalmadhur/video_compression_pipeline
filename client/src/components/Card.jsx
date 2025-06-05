import React from "react";
export default function Card({ originalName, status }) {
  return (
    <>
      <div className="w-full h-[70px] rounded-md shadow-md flex gap-4 items-center p-3 border border-[var(--pink-dark)]">
        <div className=" max-w-[50%] min-w-[50%] ">
          {originalName}
        </div>
        <div className="text-sm text-black px-2 py-1 bg-[var(--pink-light)] rounded-md text-center min-w-[20%] ">
          {status.toUpperCase()}
        </div>
        <p className="text-[var(--pink-dark)] underline min-w-[20%] text-end " >{status === "ready" ? "View" : ""}</p>
      </div>
    </>
  );
}
