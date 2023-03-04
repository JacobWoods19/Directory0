import React, { useEffect } from 'react';

import NavBar from '../components/nav';
import Search from '../components/search';
import Card from '../components/card';
import VideoCard from '../components/video_card';
class SearchResultPage extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            search_term: "",
            website_results: [],
            video_results: [],
            course_results: [],
            project_results: []
        };
        
  }
  loadSearchResults() {
    async function getSearchResults(url) {
      const search_term = window.sessionStorage.getItem("search");
    
      const response = await fetch(url + '?' + new URLSearchParams(
          {
              tag: search_term
          }
      ));
      const data = await response.json();
      return data;
    }
    getSearchResults('http://localhost:8000/api/websites/search').then((data) => {
      console.log("Web Return Data: " + data)
      this.setState({website_results: data});
    });
    getSearchResults('http://localhost:8000/api/videos/search').then((data) => {
      console.log("Vid Return Data: " + data)

      this.setState({video_results: data});
    });
    getSearchResults('http://localhost:8000/api/courses/search').then((data) => {
      console.log("Course Return Data: " + data)

      this.setState({course_results: data});
    });
    getSearchResults('http://localhost:8000/api/projects/search').then((data) => {
      console.log("Project Return Data: " + data)

      this.setState({project_results: data});
    });

  }



  componentDidMount() {
      const search_term = window.sessionStorage.getItem("search");  
      console.log(search_term);
      //call api and set state
      this.loadSearchResults();
  }
  render(){
    return (
      <div className="bg-gray-900 min-h-screen">
      <NavBar showSubmit= "true"></NavBar>
        <div>
          <h1 className='pt-5 px-5 font-bold text-md text-white'>Find the best resources for learning how to code!</h1>
          <Search></Search>
          <div className='p-5'> 
              <h1 className='text-md py-3 font-bold text-white '>{window.sessionStorage.getItem("search")} Websites</h1>
              {this.state.website_results.map((result) => {
                return (<div className='py-2'><Card className ="my-5" title= {result.name} description = {result.description} url = {result.url} tag = {result.tag} upvotes = {result.upvotes}posted={result.publish_date} ></Card></div>)
              })}
              <h1 className='text-md py-3 font-bold text-white '>{window.sessionStorage.getItem("search")}  Projects</h1>
              <div className='grid grid-cols-1 gap-9 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {this.state.project_results.map((result) => {
                  return (<div className='py-2'><Card className ="my-5" title= {result.name} description = {result.description} url = {result.url} tag = {result.tag} upvotes = {result.upvotes} posted={result.publish_date}></Card></div>)
                })}
              </div>
              <h1 className='text-md py-3 font-bold text-white '>{window.sessionStorage.getItem("search")}  Videos</h1>
              <div className='grid grid-cols-1 gap-9 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {this.state.video_results.map((result) => {
                  return (<div className='py-2'><VideoCard className ="my-5" title= {result.title} description = {result.description} url = {result.url} tag = {result.tag} upvotes = {result.upvotes}></VideoCard></div>)
                })}
              </div>
          </div>
        </div>
    </div>
    );
  }
}
export default SearchResultPage;

