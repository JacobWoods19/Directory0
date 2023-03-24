import React, { useEffect } from 'react';

import NavBar from '../components/nav';
import Search from '../components/search';
import Card from '../components/card';
import CommunityCard from '../components/community_card';
import LanguageCard from '../components/language_card';
import NewButton from '../components/view_new';
class SearchNewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_term: "",
      website_results: [],
      video_results: [],
      course_results: [],
      project_results: [],
      community_results: [],
      info_result: {},
      info_card_bool: true,
      website_pages: 1,
      project_pages: 1,
      community_pages: 1
    };
  }
  loadSearchResults() {
    async function getSearchResults(url) {
      const search_term = window.sessionStorage.getItem("search");
      const response = await fetch(url + '?' + new URLSearchParams(
        {
          tag: search_term,
          limit: 3
        }
      ));
      const data = await response.json();
      return data;
    }
    getSearchResults('https://api.directory0.org/api/websites/search/new').then((data) => {
      console.log("Web data " + data.results)
      this.setState({ website_results: data.results });
    });
    getSearchResults('https://api.directory0.org/api/projects/search/new').then((data) => {
      console.log(data)
      this.setState({ project_pages: this.state.project_pages + 1 })
      this.setState({ project_results: data.results });
    });
    getSearchResults('https://api.directory0.org/api/communities/search/new').then((data) => {
      console.log("Community Results" + data.results)
      this.setState({ project_pages: this.state.community_pages + 1 })
      this.setState({ community_results: data.results });
    });
    getSearchResults('https://api.directory0.org/api/info/search').then((data) => {
      try {
        if (data[0]) {
          this.setState({ info_result: data[0] });
        } else {
          this.setState({ info_result: { language: "none", image_url: "none", description: "none" } });
          this.setState({ info_card_bool: false });
        }
      } catch {
        this.setState({ info_result: { language: "none", image_url: "none", description: "none" } });
        this.setState({ info_card_bool: false });
      }
    });
  }
  loadMoreWebsites() {
    console.log("load more websites")
    async function getSearchResults(url, page) {
      const search_term = window.sessionStorage.getItem("search");
      const response = await fetch(url + '?' + new URLSearchParams(
        {
          tag: search_term,
          page: page,
          limit: 3
        }
      ));
      const data = await response.json();
      return data;
    }
    getSearchResults('https://api.directory0.org/api/websites/search/new', this.state.website_pages + 1).then((data) => {
      console.log("Web data " + data)
      if (data.results.length == 0) {
        alert("No more results")
        return;
      }
      this.setState({ website_results: this.state.website_results.concat(data.results) });
      this.setState({ website_pages: this.state.website_pages + 1 });
    });
  }
  loadMoreProjects() {
    console.log("load more projects")
    async function getSearchResults(url, page) {
      const search_term = window.sessionStorage.getItem("search");
      const response = await fetch(url + '?' + new URLSearchParams(
        {
          tag: search_term,
          page: page,
          limit: 3
        }
      ));
      const data = await response.json();
      return data;
    }
    getSearchResults('https://api.directory0.org/api/projects/search/new', this.state.project_pages).then((data) => {
      console.log("Project data " + data)
      if (data.results.length == 0) {
        alert("No more results")
        return;
      }
      this.setState({ project_results: this.state.project_results.concat(data.results) });
      this.setState({ project_pages: this.state.project_pages + 1 });
    });
  }
  loadMoreCommunities() {
    console.log("load more communities")
    async function getSearchResults(url, page) {
      const search_term = window.sessionStorage.getItem("search");
      const response = await fetch(url + '?' + new URLSearchParams(
        {
          tag: search_term,
          page: page,
          limit: 3
        }
      ));
      const data = await response.json();
      return data;
    }
    getSearchResults('https://api.directory0.org/api/communities/search/new', this.state.project_pages).then((data) => {
      console.log("Community data " + data)
      if (data.results.length == 0) {
        alert("No more results")
        return;
      }
      this.setState({ community_results: this.state.community_results.concat(data.results) });
      this.setState({ community_pages: this.state.community_pages + 1 });
    });
  }

  componentDidMount() {
    const search_term = window.sessionStorage.getItem("search");
    console.log(search_term);
    this.loadSearchResults();
  }
  render() {
    return (
      <div className="bg-slate-900 min-h-screen">
        <div>
          <h1 className='pt-5 px-5 font-bold text-md text-white'>Find the best resources for learning how to code!</h1>
          <Search></Search>
          <NewButton is_new={true} ></NewButton>
          <div className='p-5'>
            <div className='flex justify-between'>
              <h1 className='text-2xl py-3 font-bold text-white '> New {window.sessionStorage.getItem("search")}  Resources</h1>
            </div>
            {this.state.info_card_bool ? <LanguageCard language={this.state.info_result.language} icon={this.state.info_result.image_url} description={this.state.info_result.description}></LanguageCard> : null}
            <h1 className='text-md py-3 font-bold text-white '>{window.sessionStorage.getItem("search")}  Communities</h1>
            {this.state.community_results.map((result) => {
              return (<div className='py-2'><Card className="my-5" title={result.name} description={result.description} url={result.url} tag={result.tag} upvotes={result.upvotes} posted={result.publish_date} id={result._id} session={this.props.session} type="communities"></Card></div>)
            })}
            <button class="text-white bg-slate-600 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 my-2" onClick={() =>
              this.loadMoreWebsites(this.state.website_pages)
            }>Load More</button>
            <h1 className='text-md py-3 font-bold text-white '>{window.sessionStorage.getItem("search")} Websites</h1>
            {this.state.website_results.map((result) => {
              return (<div className='py-2'><Card className="my-5" title={result.name} description={result.description} url={result.url} tag={result.tag} upvotes={result.upvotes} posted={result.publish_date} id={result._id} session={this.props.session} type="websites"></Card></div>)
            })}
            <button class="text-white bg-slate-600 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 my-2" onClick={() =>
              this.loadMoreWebsites(this.state.website_pages)
            }>Load More</button>
            <h1 className='text-md py-3 font-bold text-white '>{window.sessionStorage.getItem("search")}  Projects</h1>
            <div className='grid grid-cols-1 gap-9 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {this.state.project_results.map((result) => {
                return (<div className='py-2'><Card className="my-5" title={result.name} description={result.description} url={result.url} tag={result.tag} upvotes={result.upvotes} posted={result.publish_date} id={result._id} session={this.props.session} type="projects"></Card></div>)
              })}
            </div>
            <button class="text-white bg-slate-600 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 my-2" onClick={() =>
              this.loadMoreProjects(this.state.project_pages)
            }>Load More</button>
          </div>
        </div>
      </div>
    );
  }
}
export default SearchNewPage;

