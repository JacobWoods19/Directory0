import React from "react";
import { useState } from "react";
class LanguageCardLg extends React.Component{
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
            <div class="overflow-y-auto sm:p-0 pt-4 pr-4 pb-20 pl-4 bg-gray-800">
            <div class="flex justify-center items-end text-center min-h-screen sm:block">
                <div class="bg-gray-500 transition-opacity bg-opacity-75"></div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen">​</span>
                <div class= "inline-block text-left bg-gray-900 rounded-lg overflow-hidden align-bottom transition-all transform shadow-2xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                <div class="items-center w-full mr-auto ml-auto relative max-w-7xl md:px-12 lg:px-24">
                    <div class="grid grid-cols-1">
                    <div class="mt-4 mr-auto mb-4 ml-auto bg-gray-900 max-w-lg">
                        <div class="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
                            <image src={this.props.image_url} className="w-28"></image>
                        <p class="mt-8 text-2xl font-semibold leading-none text-white tracking-tighter lg:text-3xl">{this.props.language}</p>
                        <p class="mt-3 text-base leading-relaxed text-center text-gray-200">{this.props.description}</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )
    }

}
export default LanguageCardLg ;