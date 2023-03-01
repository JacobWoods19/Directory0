import React, { useEffect } from 'react';

function getFaviconFromUrl (url) {
  var url = new URL(url);
  console.log(url.protocol + "//" + url.hostname + "/favicon.ico")
  return url.protocol + "//" + url.hostname + "/favicon.ico";
}
export default function Card (props) {
  useEffect(() => {
    console.log(props);

  }, []);
  return (
   
    <div class=" outline outline-slate-100 outline-2  rounded-lg shadow-lg bg-slate-800 hover:bg-slate-700  w-100">
      <div className= "flex justify-between">
        <div className='p-3'>
          <div className='flex'>
          <div className = "flex justify-center items-center">
          
          </div>
            <div>
              <a href= {props.url}>
              <div className='inline-flex '>        
              <img src={getFaviconFromUrl(props.url)} className = "w-8" onError={({ currentTarget }) => {
              currentTarget.onerror = null; 
              currentTarget.src="defaulcon.png";
  }}
/>   
                <h1 class = "text-white font-semibold px-2">{props.title}</h1>
               
              </div>
              <h2 class = "text-slate-100 font-semibold px-2 text-sm">{props.description}</h2>
              <p className="text-blue-500 font-semibold underline px-2 text-sm">{props.url}</p>
              </a>
            </div>
          </div>
        </div>
        <div className = "flex justify-center items-center">
        <h1 class = "text-yellow-500 font-semibold px-2 text-2xl overflow-visible"> {props.upvotes}🥇</h1>
        
        </div>
      </div>

      {props.price ? (<button class="mx-3 my-3 py-1 px-2 shadow-md no-underline rounded-full bg-blue-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"></button>) : (<button class="mx-3 my-3 py-1 px-2 shadow-md no-underline rounded-full bg-blue-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">Free</button> )}
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
