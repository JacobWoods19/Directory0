import React from 'react';


export default function Card (props) {
  return (
   
    <div class=" outline outline-slate-100 outline-2  rounded-lg shadow bg-slate-50 w-100">
      <div className= "flex justify-between">
        <div className='p-3'>
          <div className='flex'>
          <div className = "flex justify-center items-center">
          <img src= "https://www.google.com/favicon.ico" className='w-6 h-6'></img>
          </div>
            <div>
              <h1 class = "text-slate-900 font-semibold px-2">{props.title}</h1>
              <h2 class = "text-gray-500 font-semibold px-2 text-sm">{props.description}</h2>
              <a href= "https://google.com" className="text-blue-500 font-semibold underline px-2 text-sm">{props.url}</a>
            </div>
          </div>
        </div>
        <div className = "flex justify-center items-center">
        <h1 class = "text-blue-500 font-semibold px-2 text-2xl"> {props.upvotes}</h1>
        <img src = "medal.svg" className = "w-12 h-12 p-2" alt= "Upvote"></img>
        </div>
      </div>
      <button class="mx-3 my-3 py-1 px-2 shadow-md no-underline rounded-full bg-blue-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">Free</button>
      {
        props.tags.map((tag) => {
          return <button class="mx-3 my-3 py-1 px-2 shadow-md no-underline rounded-full bg-blue-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">{tag}</button>
        }
        )
      }
      {/* <button class="mx-3 my-3 py-1 px-2 shadow-md no-underline rounded-full bg-blue-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">Machine Learning</button>
      <button class="mx-3 my-3 py-1 px-2 shadow-md no-underline rounded-full bg-blue-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">Python</button> */}
    </div>

  );
}
