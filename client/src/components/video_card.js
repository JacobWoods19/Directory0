
import React, { useEffect } from 'react';
import { useState } from 'react';
export default function VideoCard (props) {
    // video id state
    const [id, setid] = useState("");
    useEffect(() => {
        // get video id from url
        if (props.url.includes("youtu.be")) {
            setid(props.url.split("youtu.be/")[1]);
            return;
        }
        const video_id = props.url.split("v=")[1];
        return setid(video_id);
    }, []);
    return (
     
      <div class="antialiased w-73 outline outline-slate-100 outline-2 rounded-lg shadow bg-slate-800 hover:bg-slate-700 content-center p-2 ">
        <img src = {`https://img.youtube.com/vi/${id}/mqdefault.jpg`} className='w-full rounded-lg shadow-lg'></img>
        <h1 class="text-lg font-bold text-slate-50 pt-5">{props.title}</h1>
        <a href= {props.url} className="text-blue-500 font-semibold underline text-sm">{props.url}</a>
        <p class="text-md font-semibold  text-slate-200">{props.description}</p>
        

        <div className = "">
        </div>
        <button class="my-3 py-2 px-5 shadow-md no-underline rounded-full bg-blue-500 text-white font-sans font-bold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">Free</button>

        <button class=" my-3 py-2 px-5 shadow-md no-underline rounded-full bg-blue-500 text-white font-sans font-bold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">{props.tag}</button>
      </div>
  
    );
  }