import logo from './logo.svg';
import './App.css';
import './index.css';
import SearchResultPage from './pages/search_result_page';
import SearchPage from './pages/search_page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/nav';
import AddWebsite from './pages/add_website';
import AddYTVideo from './pages/add_video';
import AddProject from './pages/add_project';
import AddCommunity from './pages/add_community';
import AddGeneral from './pages/add_general';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage/>}> 
        </Route>
        <Route path="/result" element={<SearchResultPage/>}></Route>
        <Route path="/add_website" element={<AddWebsite></AddWebsite>}></Route>
        <Route path="/add_video" element={<AddYTVideo></AddYTVideo>}></Route>
        <Route path="/add_project" element={<AddProject></AddProject>}></Route>
        <Route path="/add_community" element={<AddCommunity></AddCommunity>}></Route>
        <Route path="/add_general" element={<AddGeneral></AddGeneral>}></Route>
      
      </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
