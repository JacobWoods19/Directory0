import logo from './logo.svg';
import './App.css';
import './index.css';
import Card from './components/card.js';
import Search from './components/search.js';
import NavBar from './components/nav';
function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <div>
      <Search></Search>
      <div className='p-5'>
      <h1 className='text-2xl py-3 font-bold'>Category</h1>
        <hr></hr>
        <Card title = "Test" name= "Test" description = "Test Description"></Card>
      </div>
      </div>
    </div>
  );
}

export default App;
