import React from 'react';

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
    formSubmit(e) {
        e.preventDefault();
        let title = document.getElementById("title").value;
        let url = document.getElementById("url").value;
        let description = document.getElementById("description").value;
        let string_tags = document.getElementById("tags").value;
        let channel = document.getElementById("channel").value;
        let tags = string_tags.split(",");
        //upload to database
        async function addWebsite() {
            let data_body = JSON.stringify({
                name: title,
                url: url,
                description: description,
                tags: tags,
                channel: channel,
            })
            console.log(data_body)
            const response = await fetch('http://localhost:8000/api/community', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data_body

            });
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
        <div className='p-5'>
            <h1 className='text-2xl py-3 font-bold '>Add Community</h1>
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
            <li class="mr-2">
                <a href="/add_blog" class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 ">Blog</a>
            </li>
            <li>
                <a href="/add_book" class="inline-block p-4 text-gray-400 rounded-t-lg dark:text-gray-500">Book</a>
            </li>
            <li>
                <a href="/add_course" class="inline-block p-4 text-gray-400 rounded-t-lg dark:text-gray-500">Course</a>
            </li>
            <li>
                <a href="/add_community" class="inline-block text-blue-600 bg-gray-100 p-4 rounded-t-lg hover:bg-gray-50 active">Community</a>
            </li>
        </ul>
        <form className='p-5' onSubmit={this.formSubmit}>

        <div class="mb-6">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Community Name</label>
            <input type="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Me at the zoo"required></input>
        </div>
        <div class="mb-6">
            <label for="url" class="block mb-2 text-sm font-medium text-gray-900">URL</label>
            <input type="url" id="url" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="https://youtu.be/dQw4w9WgXcQ"required></input>
        </div>
        <div class="mb-6">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Description</label>
            <input type="description" id="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="A website for learning about computer science!"  required></input>
        </div>
        <div class="mb-6">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900" >Tags (Comma Separated)</label>
            <input type="description" id="tags" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="AI, Python, C++"required></input>
        </div>

        
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
        </div>
       )
       }
}
export default AddCommunity;