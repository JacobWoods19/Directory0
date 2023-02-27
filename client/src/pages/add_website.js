import React from 'react';

class AddWebsite extends React.Component{
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
    formSubmit(e) {
        e.preventDefault();
        let title = document.getElementById("title").value;
        let url = document.getElementById("url").value;
        let description = document.getElementById("description").value;
        let string_tags = document.getElementById("tags").value;
        let tags = string_tags.split(",");
        //upload to database
        async function addWebsite() {
            let data_body = JSON.stringify({
                name: title,
                url: url,
                description: description,
                tags: tags,
                price: 0
            })
            console.log(data_body)
            const response = await fetch('http://localhost:8000/api/website', {
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
        <form className='p-5' onSubmit={this.formSubmit}>

        <div class="mb-6">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Title</label>
            <input type="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Plans for the Death Star"required></input>
        </div>
        <div class="mb-6">
            <label for="url" class="block mb-2 text-sm font-medium text-gray-900">Website</label>
            <input type="url" id="url" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="https://google.com"required></input>
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
       )
       }
}
export default AddWebsite;