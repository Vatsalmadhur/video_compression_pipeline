import React from "react";
export default function Navbar(){
  return(
  <>
<div className="h-[50px] w-screen bg-white border border-b-gray-200 flex justify-between items-center px-5" >
<p className="sm:text-2xl text-lg font-bold text-[var(--pink-dark)]" >Video-Compression-Pipeline</p>
<a href="https://github.com/Vatsalmadhur/video_compression_pipeline">
<button className="text-white bg-[var(--pink-dark)] rounded-md px-6 py-1 font-semibold"> Github</button>
</a>

</div>
  </>
  )
}
