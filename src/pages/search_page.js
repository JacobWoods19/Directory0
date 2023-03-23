import React, { useEffect } from 'react';

import NavBar from '../components/nav';
import Search from '../components/search';
import Card from '../components/card';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import LanguageCard from '../components/language_card';
import LanguageCards from '../components/language_cards';
import CommunityCard from '../components/community_card';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_term: "",
      website_results: [],
      course_results: [],
      project_results: [],
      general_results: [],
      community_results: [],
    };
  }
  loadSearchResults() {
    async function getSearchResults(url) {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
    getSearchResults('https://directory0.org/api/websites/sorted').then((data) => {
      // console.log(data)
      this.setState({ website_results: data });
    });

    getSearchResults('https://directory0.org/api/projects/sorted').then((data) => {
      // console.log(data)
      this.setState({ project_results: data });
    });
    getSearchResults('https://directory0.org/api/general').then((data) => {
      // console.log(data)
      this.setState({ general_results: data });
    });
    getSearchResults('https://directory0.org/api/communities/sorted').then((data) => {
      // console.log(data)
      this.setState({ community_results: data });
    });

  }
  componentDidRefresh() {
    console.log("SESSION" + this.props.session)
  }
  componentDidMount() {

    this.loadSearchResults();
  }
  render() {
    return (
      <div className="bg-slate-900">
        <div>
          <h1 className='pt-5 px-5 font-bold text-2xl text-white'>Find the best free resources online for learning how to code!</h1>

          <Search></Search>
          <div className='p-5 flex-mx-auto'>
            <LanguageCards> </LanguageCards>
            <h1 className='pt-5 font-bold text-md text-white'>Great Communities To Discover</h1>
            <div className='pt-5 grid grid-cols-1 gap-9 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {this.state.community_results.map((result) => {
                return (<div className='py-2'><CommunityCard className="my-5" title={result.name} description={result.description} url={result.url} tag={result.tag} upvotes={result.upvotes} session={this.props.session} id={result._id} type="communities"></CommunityCard></div>)
              })}
            </div>
          </div>
          <div className='p-5'>
            <div className='border shadow rounded-lg p-5'>
              <h1 className='text-lg py-3 font-bold text-white '>Great General Resources</h1>
              <div className='grid grid-cols-1 gap-9 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {this.state.general_results.map((result) => {
                  return (<div className='py-2'><Card className="my-5" title={result.name} description={result.description} url={result.url} tag={result.tag} upvotes={result.upvotes} session={this.props.session} id={result._id} type="general"></Card></div>)
                })}
              </div>
            </div>
            <h1 className='text-lg py-3 font-bold text-white '>Top Websites</h1>
            {this.state.website_results.map((result) => {
              return (<div className='py-2'><Card className="my-5" title={result.name} description={result.description} url={result.url} tag={result.tag} upvotes={result.upvotes} session={this.props.session} id={result._id} type="websites"></Card></div>)
            })}
            <h1 className='text-lg py-3 font-bold text-white '>Top Projects</h1>
            <div className='grid grid-cols-1 gap-9 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {this.state.project_results.map((result) => {
                return (<div className='py-2'><Card className="my-5" title={result.name} description={result.description} url={result.url} tag={result.tag} upvotes={result.upvotes} session={this.props.session} id={result._id} type="projects"></Card></div>)
              })}
            </div>

          </div>
        </div>
      </div>
    );
  }
}
export default SearchPage;