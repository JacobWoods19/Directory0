import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_term: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.runSearch = this.runSearch.bind(this);
    }
    handleChange(event) {
        this.setState({ search_term: event.target.value });
    }
    runSearch(event) {
        event.preventDefault();
        console.log("Search")
        if (this.state.search_term == "html" || this.state.search_term == "HTML" || this.state.search_term == "Html") {
            window.location.href = "/result";
            window.sessionStorage.setItem("search", "HTML");
            return;
        }
        if (this.state.search_term == "css" || this.state.search_term == "CSS" || this.state.search_term == "Css") {
            window.location.href = "/result";
            window.sessionStorage.setItem("search", "CSS");
            return;
        }
        if (this.state.search_term == "php" || this.state.search_term == "PHP" || this.state.search_term == "Php") {
            window.location.href = "/result";
            window.sessionStorage.setItem("search", "PHP");
            return;
        }
        // format string to be capitalized
        var search_term = this.state.search_term;
        search_term = search_term.toLowerCase();
        search_term = search_term.charAt(0).toUpperCase() + search_term.slice(1);
        window.location.href = "/result";
        window.sessionStorage.setItem("search", search_term);

    }
    render() {
        return (
            <form className='p-5' onSubmit={this.runSearch}>
                <label for="default-search" class="mb-2 text-sm font-medium text-white sr-only ">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-white border border-gray-300 rounded-lg bg-slate-700 focus:ring-blue-500 focus:border-blue-500  focus:ring-blue-500 focus:border-blue-500" value={this.state.search_term} onChange={this.handleChange} placeholder="Enter topic: i.e Machine learning, Python, C++..." required></input>
                    <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
        )
    }
}

export default Search;