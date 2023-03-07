// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% IMPORTACIONES NECESARIAS %%%%%%%%%%%%%%%%%

// Importamos css
import './App.css';

// Importamos Routes y Route
import { Route, Routes } from 'react-router-dom';

// Importamos componentes:
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { EntrySearch } from './components/EntrySearch/EntrySearch';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { OwnProfile } from './components/OwnProfile/OwnProfile';
import { Profile } from './components/Profile/Profile';
import { CreateEntry } from './components/CreateEntry/CreateEntry';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FUNCIÓN App %%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function App() {
  return (
    <div id="app">
      <Header />

      <Routes>
        <Route path="/" element={<EntrySearch />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ownprofile" element={<OwnProfile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/publish" element={<CreateEntry />} />
        <Route path="*" element={<EntrySearch />} />
      </Routes>

      <Footer />
    </div>
  );
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPORTAMOS App %%%%%%%%%%%%%%%%%%%%%%%%%%

export default App;
