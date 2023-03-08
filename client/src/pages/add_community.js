import React from 'react';
import NavBar from '../components/nav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class AddCommunity extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            url: "",
            string_tags: "",
            channel: "",
            tags: []
        };
        this.formSubmit = this.formSubmit.bind(this);
    }
    componentDidUpdate() {
        if (!this.props.session){
            window.location.href = "/login";
        }
    } 
    formSubmit(e) {
        e.preventDefault();
        let title = document.getElementById("title").value;
        let url = document.getElementById("url").value;
        let description = document.getElementById("description").value;
        let tag = document.getElementById("tag").value;
    
        //upload to database
        async function addWebsite() {
            let data_body = JSON.stringify({
                name: title,
                url: url,
                description: description,
                tag: tag,
            })
            console.log(data_body)
            const response = await fetch('http://localhost:8000/api/communities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data_body

            });
            if (response.status === 200) {
                // clear form
                document.getElementById("title").value = "";
                document.getElementById("url").value = "";
                document.getElementById("description").value = "";
                document.getElementById("tag").value = "";
                toast("Added Community! After review, it will be added to the site. Thank you!");
            }
            else{
                toast("Error adding. Please try again.");
            }
            const data = await response.json();
            return data;
        }
        addWebsite().then((data) => {
            console.log(data);
            // window.location.href = "/search";
        }
        );
    }

    render() {
       return(
        <div className='p-5 bg-gray-900 min-h-screen'>
            <ToastContainer />
            <h1 className='text-2xl py-3 font-bold text-white'>Add Community</h1>
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
            <li class="mr-2">
                <a href="/add_website" class="inline-block p-4 rounded-t-lg">Website</a>
            </li>
            <li class="mr-2">
                <a href="/add_video" class="inline-block p-4 text-gray-400 rounded-t-lg dark:text-gray-500">YT Video</a>
            </li>
            <li class="mr-2">
                <a href="/add_project" class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 ">Project</a>
            </li>

            <li>
                <a href="/add_community" class="inline-block text-blue-600 bg-gray-100 p-4 rounded-t-lg hover:bg-gray-50 active">Community</a>
            </li>
        </ul>
        <form className='p-5' onSubmit={this.formSubmit}>

        <div class="mb-6">
            <label for="title" class="block mb-2 text-sm font-medium text-white">Community Name</label>
            <input type="title" id="title" class="bg-slate-600 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Me at the zoo"required></input>
        </div>
        <div class="mb-6">
            <label for="url" class="block mb-2 text-sm font-medium text-white">URL</label>
            <input type="url" id="url" class="bg-slate-600 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="https://youtu.be/dQw4w9WgXcQ"required></input>
        </div>
        <div class="mb-6">
            <label for="description" class="block mb-2 text-sm font-medium text-white">Description</label>
            <input type="description" id="description" class="bg-slate-600 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="A website for learning about computer science!"  required></input>
        </div>
        <div class="mb-6">
            <label for="description" class="block mb-2 text-sm font-medium text-white" >Topic</label>
            <input type="description" id="tag" class="bg-slate-600 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="AI, Python, C++"required></input>
        </div>

        
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
        </div>
       )
       }
}
export default AddCommunity;