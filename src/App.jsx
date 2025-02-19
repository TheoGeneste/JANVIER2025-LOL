import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import NavBar from './Components/NavBar';
import ChampionsPage from './Pages/ChampionsPage';
import ChampionDetailsPage from './Pages/ChampionsDetailsPage';
import ItemsPage from './Pages/ItemsPage';

function App() {
  return <>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/champions' element={<ChampionsPage />}/>
        <Route path='/champion/:name' element={<ChampionDetailsPage />}/>
        <Route path='/items' element={<ItemsPage />}/>
      </Routes>
    </BrowserRouter>
  </>;
}

export default App
