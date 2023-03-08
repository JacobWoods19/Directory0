import React from "react";
import { useState } from "react";
function getFaviconFromUrl (url) {
    var url = new URL(url);
    // console.log(url.protocol + "//" + url.hostname + "/favicon.ico")
    return url.protocol + "//" + url.hostname + "/favicon.ico";
  }
  
class CommunityCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            language: props.language,
            icon: props.icon,
            description: props.description,
        }
    }
    render (){
        return(
            <div class=" outline outline-slate-100 outline-2  rounded-lg shadow-lg bg-slate-800 hover:bg-slate-700  w-100">
            <div className= "flex justify-between">
              <div className='p-3'>
                <div className='flex'>
                <div className = "flex justify-center items-center">
                </div>
                  <div>
                    <a href= {this.props.url}>
                    <div className='inline-flex '>        
                    <img src={getFaviconFromUrl(this.props.url)} className = "w-6 h-6" onError={({ currentTarget }) => {
                    currentTarget.onerror = null; 
                    currentTarget.src="defaulcon.png";}}/>   
                      <h1 class = "text-white font-semibold px-2">{this.props.name}</h1>
                        </div>
                        <h2 class = "text-slate-100  font-semibold text-sm sm:text-xs">{this.props.description}*</h2>
                        <p className="text-blue-500 font-semibold underline pt-3 text-sm">{this.props.url.slice(0,30) + "..."}</p>
                        </a>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        
        )
    }

}
export default CommunityCard ;