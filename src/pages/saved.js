import React from "react";
import Card from "../components/card";
class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved_ids: [],
      saved: []
    };

    // Move fetchSavedItem call here
    var saved_ids = localStorage.getItem("bookmarkedProjects");
    if (saved_ids) {
      saved_ids = JSON.parse(saved_ids);
      this.setState({ saved_ids: saved_ids });
    }
    for (const project of saved_ids) {
      this.fetchSavedItem(project);
    }
  }

  fetchSavedItem(fetch_id) {
    async function getSearchResults(url, id) {
      const response = await fetch(url + "?" + new URLSearchParams({ id: id }));
      const data = await response.json();
      return data;
    }
    getSearchResults("https://api.directory0.org/api/search/id", fetch_id).then((data) => {
      //append to saved
      this.setState({ saved: this.state.saved.concat(data) });
    });
  }

  render() {
    return (
      <div className="bg-slate-900 min-h-screen">
        <h1 className="pt-5 px-5 font-bold text-lg text-white">Saved</h1>
        <div className=" p-5">
          {this.state.saved.map((result) => {
            return (
              <div className="py-2">
                <Card
                  key={result._id}
                  className="my-5"
                  title={result.name}
                  description={result.description}
                  url={result.url}
                  tag={result.tag}
                  upvotes={result.upvotes}
                  session={this.props.session}
                  id={result._id}
                  type={result.type}
                ></Card>
              </div>
            );

          })}
        </div>
      </div>
    );
  }
}
export default Saved;