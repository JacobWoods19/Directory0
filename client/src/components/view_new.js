import React from "react";
import { useState } from "react";
class NewButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    onUpdate = () => {
        if (this.props.is_new){
            document.getElementById("new").classList.add("bg-blues-900");
            document.getElementById("new").classList.remove("bg-slate-700");
            

        } else {
            document.getElementById("new").classList.add("bg-gray-900");
            document.getElementById("new").classList.remove("bg-slate-700");
            document.getElementById("top").classList.add("bg-blue-500");
            document.getElementById("top").classList.remove("bg-gray-900");
        }
    }
    handleClick = () => {
        window.location.href = "/new";
    }
    render (){
        return(
            <div className="grid place-items-center">
            <div className="flex inline-flex">
            <div  id= "top" class=" p-2 bg-slate-700 text-white font-bold text-xs cursor-pointer" onClick={this.handleClick}>
                Top
            </div>
            { }
            <div id= "new" class=" p-2 bg-blue-500 text-white font-bold text-xs cursor-pointer" onClick={this.handleClick}>
                New
            </div>
            </div>
            </div>
        )
    }
}
export default  NewButton;