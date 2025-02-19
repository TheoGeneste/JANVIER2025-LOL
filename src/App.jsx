import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import NavBar from './Components/NavBar';
import ChampionsPage from './Pages/ChampionsPage';
import ChampionDetailsPage from './Pages/ChampionsDetailsPage';
import ItemsPage from './Pages/ItemsPage';
import ItemDetailsPage from './Pages/ItemDetailsPage';
import ChampionsByTagPage from './Pages/ChampionsByTagPage';
import SummonersPage from './Pages/SummonersPage';
import ProfileIcons from './Pages/ProfileIconsPage';
import Game from './Pages/Game';
import { ToastContainer } from 'react-toastify';

function App() {
  return <>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/champions' element={<ChampionsPage />} />
        <Route path='/champions/:tag' element={<ChampionsByTagPage />} />
        <Route path='/champion/:name' element={<ChampionDetailsPage />} />
        <Route path='/items' element={<ItemsPage />} />
        <Route path='/item/:name' element={<ItemDetailsPage />} />
        <Route path='/summoners' element={<SummonersPage />} />
        <Route path='/icons' element={<ProfileIcons />} />
        <Route path='/game' element={<Game />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  </>;
}

export default App
