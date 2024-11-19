import { Outlet } from 'react-router-dom';
import './App.css';
import { NavLink } from "react-router-dom";
import { HeaderNav } from './components/HeaderNav';
import Header from './components/Header';
import { Footer } from './components';

function App() {
  return (
<>
    <Header>
        <HeaderNav>
        </HeaderNav>
    </Header>
    <main className="main-content main-container">
        <Outlet />
    </main>
   <Footer/>
    
</>
    
  );
}

export default App;

