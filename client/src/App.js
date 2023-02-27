import logo from './logo.svg';
import './App.css';
import './index.css';
import SearchResultPage from './pages/search_result_page';
import SearchPage from './pages/search_page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/nav';
import AddWebsite from './pages/add_website';
function App() {
  return (
    <div>
    <NavBar></NavBar>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage/>}> 
        </Route>
        <Route path="/result" element={<SearchResultPage/>}></Route>
        <Route path="/add_website" element={<AddWebsite></AddWebsite>}></Route>
    
      </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
