import React from "react";
import { useState } from "react";
class LanguageCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            language: props.language,
            icon: props.icon,
            description: props.description,
        }
    }
    handleClick = () => {
        window.sessionStorage.setItem("search", this.state.language);
        window.location.href = "/result";
    }
    render (){
        return(
            
            <div class="border bg-slate-700 language_card rounded-md p-4 hover:bg-slate-600 cursor-pointer" onClick={this.handleClick}>
                
            </div>

        
        )
    }

}