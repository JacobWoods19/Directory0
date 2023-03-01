import React, { useEffect } from 'react';

import NavBar from '../components/nav';
import Search from '../components/search';
import Card from '../components/card';
class SearchResultPage extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            search_term: "",
            search_results: []
        };
  }
  loadSearchResults() {
    async function getSearchResults() {
      const search_term = window.sessionStorage.getItem("search");
      const response = await fetch('http://localhost:8000/api/websites/search?' + new URLSearchParams(
          {
              tag: search_term
          }
      ));
      const data = await response.json();
      return data;
    }
    getSearchResults().then((data) => {
      console.log(data)
      this.setState({search_results: data});
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
      <div className="Search">

        <div>
        <Search></Search>
        <div className='p-5'>
        <h1 className='text-2xl py-3 font-bold'>Results</h1>
          <hr></hr>
          
          {this.state.search_results.map((result) => {
            return (<div><Card className ="my-5" title= {result.title} description = {result.description} url = {result.url} tags = {result.tags} upvotes = {result.upvotes}></Card> <hr></hr></div>)
          })}
        </div>
        </div>
      </div>
    );
  }
}
export default SearchResultPage;