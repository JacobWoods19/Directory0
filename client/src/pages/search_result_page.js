import React, { useEffect } from 'react';

import NavBar from '../components/nav';
import Search from '../components/search';
import Card from '../components/card';

import CommunityCard from '../components/community_card';
import LanguageCard from '../components/language_card';
import NewButton from '../components/view_new';
class SearchResultPage extends React.Component {
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
      this.setState({ website_results: data });
    });
    getSearchResults('http://localhost:8000/api/videos/search').then((data) => {
      this.setState({ video_results: data });
    });
    getSearchResults('http://localhost:8000/api/courses/search').then((data) => {
      this.setState({ course_results: data });
    });
    getSearchResults('http://localhost:8000/api/projects/search').then((data) => {

      this.setState({ project_results: data });
    });
    getSearchResults('http://localhost:8000/api/communities/search').then((data) => {
      this.setState({ community_results: data });
    });
    getSearchResults('http://localhost:8000/api/info/search').then((data) => {
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
  componentDidMount() {
    const search_term = window.sessionStorage.getItem("search");
    console.log(search_term);
    //call api and set state
    this.loadSearchResults();
  }
  render() {
    return (
      <div className="bg-slate-900 min-h-screen">
        <div>
          <h1 className='pt-5 px-5 font-bold text-md text-white'>Find the best resources for learning how to code!</h1>
          <Search></Search>
          <NewButton is_new={false} ></NewButton>
          <div className='p-5'>
            <div className='flex justify-between'>
              <h1 className='text-2xl py-3 font-bold text-white '> Top {window.sessionStorage.getItem("search")}  Resources</h1>
            </div>
            {this.state.info_card_bool ? <LanguageCard language={this.state.info_result.language} icon={this.state.info_result.image_url} description={this.state.info_result.description}></LanguageCard> : null}
            <h1 className='text-md py-3 font-bold text-white '>{window.sessionStorage.getItem("search")}  Communities</h1>
            <div className='grid grid-cols-1 gap-9 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {this.state.community_results.map((result) => {
                return (<div className='py-2'><CommunityCard className="my-5" title={result.name} description={result.description} url={result.url} tag={result.tag} upvotes={result.upvotes}></CommunityCard></div>)
              })}
            </div>
            <h1 className='text-md py-3 font-bold text-white '>{window.sessionStorage.getItem("search")} Websites</h1>
            {this.state.website_results.map((result) => {
              return (<div className='py-2'><Card className="my-5" title={result.name} description={result.description} url={result.url} tag={result.tag} upvotes={result.upvotes} posted={result.publish_date} id={result._id} session={this.props.session} type="websites"></Card></div>)
            })}
            <h1 className='text-md py-3 font-bold text-white '>{window.sessionStorage.getItem("search")}  Projects</h1>
            <div className='grid grid-cols-1 gap-9 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {this.state.project_results.map((result) => {
                return (<div className='py-2'><Card className="my-5" title={result.name} description={result.description} url={result.url} tag={result.tag} upvotes={result.upvotes} posted={result.publish_date} id={result._id} session={this.props.session} type="projects"></Card></div>)
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SearchResultPage;

