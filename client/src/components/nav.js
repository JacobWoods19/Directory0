import React from 'react';

export default function NavBar (props) {
    return(

        <div class="flex justify-between p-5">
        <div class="flex justify-center items-center flex-1">
        <a href = "/"><img src="Logo.png" class="w-32 object-contain"></img></a>
        </div>
        <div class="flex items-center">
        {props.showSubmit ? (
        <a class="bg-white text-slate-800  text-sm hover:bg-slate-400 font-bold py-2 px-4 rounded" href = "/add_website">
            Submit
        </a>
        ) : null}
        </div>
        </div>
    )
}