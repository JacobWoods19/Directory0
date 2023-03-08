import logo from './logo.svg';
import './App.css';
import './index.css';
import SearchResultPage from './pages/search_result_page';
import SearchPage from './pages/search_page';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/nav';
import AddWebsite from './pages/add_website';
import AddYTVideo from './pages/add_video';
import AddProject from './pages/add_project';
import AddCommunity from './pages/add_community'; 
import Login from './pages/login';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Saved from './pages/saved';
import Footer from './components/footer';
function App() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    document.title = "Directory0 | Learn To Code "
    supabase.auth.getSession().then((session) => {
      setSession(session);
      console.log("App session: " + JSON.stringify(session));
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      // if (session){
      //   setSession(session);
      // }
    }
    
    )
  }, [])
  //TODO: On component mount, if the user is logged in add upvoted history and saved history to local storage
  return (
    <div>
    <NavBar showSubmit= "true" session= {session}></NavBar>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage session = {session}/>}> 
        </Route>
        <Route path="/result" element={<SearchResultPage session = {session}/>}></Route>
        <Route path="/add_website" element={<AddWebsite session = {session}></AddWebsite>}></Route>
        <Route path="/add_video" element={<AddYTVideo session = {session}></AddYTVideo>}></Route>
        <Route path="/add_project" element={<AddProject session = {session}></AddProject>}></Route>
        <Route path="/add_community" element={<AddCommunity session = {session}></AddCommunity>}></Route>
        <Route path="/saved" element={<Saved session = {session}></Saved>}></Route>
        <Route path="/login" element={<Login session = {session}></Login>}></Route>
      </Routes>

    </BrowserRouter>
    <Footer></Footer>
    </div>
  );
}

export default App;
