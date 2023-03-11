import React from "react";
import { useState } from "react";
class NewButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    handleClick = () => {
        window.location.href = "/new";
    }
    render (){
        return(
            <div className="grid place-items-center">
            <div className="flex inline-flex">
            <div class=" p-2 bg-slate-700 text-white font-bold text-xs" onClick={this.handleClick}>
                Top
            </div>
            <div class=" p-2 bg-slate-700 text-white font-bold text-xs" onClick={this.handleClick}>
                New
            </div>
            </div>
            </div>
        )
    }
}
export default  NewButton;