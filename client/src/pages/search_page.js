import React, { useEffect } from 'react';

import NavBar from '../components/nav';
import Search from '../components/search';
import Card from '../components/card';
class SearchPage extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            search_term: "",
            search_results: []
        };
  }
  loadSearchResults() {
    async function getSearchResults() {
      const response = await fetch('http://localhost:8000/api/websites/sorted');
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
      //call api and set state1
      this.loadSearchResults();
  }
  render(){
    return (
      <div className="Search">

        <div>
        <h1 className='pt-5 px-5 font-bold text-xl text-slate-700'>Find the best resources for learning how to code!</h1>
        <hr className='px-5'></hr>
        <Search></Search>
        <div className='p-5'>
        <h1 className='text-2xl py-3 font-bold'>Top Websites</h1>
          <hr></hr>
          <div className='py-5'>
          {this.state.search_results.map((result) => {
            return (<div className='py-2'><Card className ="my-5" title= {result.name} description = {result.description} url = {result.url} tags = {result.tags} upvotes = {result.upvotes}></Card> <hr></hr></div>)
          })}
          </div>
        </div>
        </div>
      </div>
    );
  }
}
export default SearchPage;