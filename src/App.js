import logo from './logo.svg';
import './App.css';
import './index.css';
import SearchResultPage from './pages/search_result_page';
import SearchPage from './pages/search_page';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/nav';
import AddWebsite from './pages/add_website';
import AddProject from './pages/add_project';
import AddCommunity from './pages/add_community';
import Login from './pages/login';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Saved from './pages/saved';
import Footer from './components/footer';
import SearchNewPage from './pages/search_new';
import TOS from './pages/tos';
import Privacy from './pages/privacy';
import {Helmet} from "react-helmet";
import ReactGA from 'react-ga';
function getUpvotes(user_id) {
  async function getUpvotesFromDatabase() {
    const response = await fetch('https://api.directory0.org/api/get_upvotes' + '?' + new URLSearchParams(
      {
        user_id: user_id
      }
    ))

    const data = await response.json();
 
    if (data?.upvotes && data?.upvotes.length > 0) {
      window.localStorage.setItem("upvotedProjects", JSON.stringify(data.upvotes.map((upvote) => upvote.source_id)));
    }
  }
  getUpvotesFromDatabase();
}


function getBookmarks(user_id) {
  async function getUpvotesFromDatabase() {
    const response = await fetch('https://api.directory0.org/api/bookmarked' + '?' + new URLSearchParams(
      {
        user_id: user_id
      }
    ))
    const data = await response.json();
    if (data) {
      window.localStorage.setItem("bookmarkedProjects", JSON.stringify(data.map((bookmark) => bookmark.source_id)));
    }
  }
  getUpvotesFromDatabase();
}

function App() {
  const [session, setSession] = useState(null);
  ReactGA.initialize('UA-194292422-1');
  useEffect(() => {
    document.title = "Directory0 | Learn To Code";
    document.body.style.backgroundColor = "#f5f5f5";
    supabase.auth.getSession().then((session) => {
      setSession(session);
      if (session?.data?.session?.user) {
        getUpvotes(session?.data?.session?.user?.id);
        getBookmarks(session?.data?.session?.user?.id);
        window.dispatchEvent(new Event("storage"));
      }
      else{
        window.localStorage.removeItem("upvotedProjects");
        window.localStorage.removeItem("bookmarkedProjects");
      }
    })

  }, [])
  return (
    <div>
      <Helmet>
        <meta property="og:title" content="Directory0.Org" />
        <meta property="og:description" content="Directory0.org is a directory of the best coding resources. Find the best coding resources for your next project." />
        <meta property="og:image" content="Headerimage.png" />
      </Helmet>
      <NavBar showSubmit="true" session={session}></NavBar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchPage session={session} />}>
          </Route>
          <Route path="/result" element={<SearchResultPage session={session} />}></Route>
          <Route path="/add_website" element={<AddWebsite session={session}></AddWebsite>}></Route>
          <Route path="/add_project" element={<AddProject session={session}></AddProject>}></Route>
          <Route path="/add_community" element={<AddCommunity session={session}></AddCommunity>}></Route>
          <Route path="/saved" element={<Saved session={session}></Saved>}></Route>
          <Route path="/login" element={<Login session={session}></Login>}></Route>
          <Route path="/tos" element={<TOS></TOS>}></Route>
          <Route path="/privacy" element={<Privacy></Privacy>}></Route>
          <Route path="/new" element={<SearchNewPage session={session}></SearchNewPage>}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>

      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
