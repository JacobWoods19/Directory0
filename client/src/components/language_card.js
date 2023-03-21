import React from "react";
import { useState } from "react";
class LanguageCard extends React.Component {
    constructor(props) {
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
    render() {
        return (

            <div class="border bg-slate-700 language_card rounded-md p-4 hover:bg-slate-600 cursor-pointer" onClick={this.handleClick}>
                <img src={this.props.icon} className="w-28" />
                <h3 class="text-lg font-bold mb-2 text-white"><a src="/result">{this.props.language}</a></h3>
                <p class="text-slate-50">{this.props.description}</p>
            </div>


        )
    }

}
export default LanguageCard;