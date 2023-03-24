import React from 'react';
import NavBar from '../components/nav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class AddWebsite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            url: "",
            string_tags: "",
            tags: []
        };
        this.formSubmit = this.formSubmit.bind(this);

    }
    // on load of page, get all tags
    componentDidUpdate() {
        if (!this.props.session?.data?.session) {
            window.location.href = "/login";
        }
    }
    formSubmit(e) {
        e.preventDefault();
        let title = document.getElementById("title").value;
        let url = document.getElementById("url").value;
        let description = document.getElementById("description").value;
        var tag = document.getElementById("tag").value.toLowerCase();
        // convert all words to capitalized in tag
        if (tag == "sql" || tag== "css" || tag == "html") {
            tag = tag.toUpperCase();
        }
        else{
            tag = tag.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        }
        //upload to database
        async function addWebsite() {
            let data_body = JSON.stringify({
                name: title,
                url: url,
                description: description,
                tag: tag,
            })
            const response = await fetch('https://api.directory0.org/api/websites', {
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
                toast("Added Website! After review, it will be added to the site. Thank you!");
            }
            else {
                toast("Error adding. Please try again.");
            }
            const data = await response.json();
            return data;
        }
        addWebsite().then((data) => {
            // window.location.href = "/search";
        }
        );
    }

    render() {
        return (
            <div className='p-5 bg-slate-900 min-h-screen'>
                <ToastContainer />
                <h1 className='text-2xl py-3 font-bold text-white'>Add Website/Link</h1>
                <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
                    <li class="mr-2">
                        <a href="/add_website" class="inline-block text-blue-600 bg-gray-100 p-4 rounded-t-lg hover:bg-gray-50 active">Website/Link</a>
                    </li>

                    <li class="mr-2">
                        <a href="/add_project" class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 ">Project</a>
                    </li>
                    <li>
                        <a href="/add_community" class="inline-block p-4 text-gray-400 rounded-t-lg dark:text-gray-500">Community</a>
                    </li>
                </ul>
                <form className='p-5' onSubmit={this.formSubmit}>

                    <div class="mb-6">
                        <label for="title" class="block mb-2 text-sm font-medium text-white">Title</label>
                        <input type="title" id="title" class="bg-slate-600 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Plans for the Death Star" required></input>
                    </div>
                    <div class="mb-6">
                        <label for="description" class="block mb-2 text-sm font-medium text-white">Description</label>
                        <input type="description" id="description" class="bg-slate-600 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="A website for learning about computer science!" required></input>
                    </div>
                    <div class="mb-6">
                        <label for="url" class="block mb-2 text-sm font-medium text-white">Website</label>
                        <input type="url" id="url" class="bg-slate-600 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="https://google.com" required></input>
                    </div>
                    <div class="mb-6">
                        <label for="description" class="block mb-2 text-sm font-medium text-white" >Tag</label>
                        <input type="description" id="tag" class="bg-slate-600 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="i.e AI, Python, C++" required></input>
                    </div>

                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        )
    }
}
export default AddWebsite;