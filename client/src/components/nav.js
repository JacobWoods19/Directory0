import React, { useEffect } from 'react';
import { supabase } from '../supabaseClient';
export default function NavBar(props) {
    const [showSubmit, setShowSubmit] = React.useState(true);
    useEffect(() => {
        //if we are in the login page, we don't want to show the submit button
        if (window.location.href.includes("login")) {
            setShowSubmit(false);
        }
    }, [])
    return (

        <div class="flex justify-between p-5 bg-slate-900">

            <a href="/"><img src="Logo.png" class="w-32 object-contain"></img></a>

            <div class="flex items-center">
                {showSubmit ? (
                    <a class="bg-white text-slate-800  text-sm hover:bg-slate-400 font-bold py-2 px-4 rounded" href="/add_website">
                        Submit
                    </a>
                ) : null}

                {
                    props?.session?.data.session?.user ? (
                        showSubmit ? (
                            <btn class="bg-red-500 text-slate-800 cursor-pointer text-sm hover:bg-red-600 font-bold py-2 px-4 m-2 rounded " href="/add_website" onClick={() =>
                                supabase.auth.signOut()
                                    //clear local storage
                                    .then(() => localStorage.clear())
                                    //refresh page
                                    .then(() => window.location.replace("/"))
                            }>
                                Logout </btn>
                        ) : (
                            null)
                    ) :
                        showSubmit ? (
                            <btn class="bg-green-500 text-slate-800 cursor-pointer text-sm hover:bg-green-600 font-bold py-2 px-4 m-2 rounded" href="/add_website" onClick={
                                () => window.location.replace("/login")
                            }>
                                Login </btn>
                        ) : (null)}
                <btn className='bg-white text-slate-800 cursor-pointer text-sm hover:bg-slate-200 font-bold py-2 px-2  rounded' onClick={() => {
                    if (props?.session?.data.session?.user) {
                        window.location.href = "/saved"
                    }
                    else {
                        window.location.href = "/login"
                    }
                }}>
                    <img src="bookmark_fill.png" className='w-5 h-5' ></img>
                </btn>

            </div>
        </div>
    )
}