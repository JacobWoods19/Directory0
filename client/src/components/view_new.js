import React from "react";
import { useState } from "react";
class NewButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    onUpdate = () => {
        if (this.props.is_new) {
            document.getElementById("new").classList.add("bg-blue-500");
        } else {
            document.getElementById("new").classList.add("bg--900");
        }
    }
    handleClick = () => {
        window.location.href = "/new";
    }
    render() {
        return (
            <div className="grid place-items-center">
                <div className="flex inline-flex">
                    {
                        this.props.is_new ?
                            <div id="top" class=" p-2 bg-slate-700 text-white font-bold text-xs cursor-pointer" onClick={() =>
                                window.location.href = "/result"
                            }>
                                Top
                            </div>
                            :
                            <div id="top" class=" p-2 text-white bg-blue-500 font-bold text-xs" onClick={() =>
                                window.location.href = "/result"
                            }>
                                Top
                            </div>
                    }

                    {
                        this.props.is_new ?
                            <div id="new" class=" p-2 text-white bg-blue-500 font-bold text-xs" onClick={() =>
                                window.location.href = "/new"
                            }>
                                New
                            </div>
                            :
                            <div id="new" class=" p-2 bg-slate-700 text-white font-bold text-xs cursor-pointer" onClick={() =>
                                window.location.href = "/new"
                            }>
                                New
                            </div>
                    }
                </div>
            </div>
        )
    }
}
export default NewButton;