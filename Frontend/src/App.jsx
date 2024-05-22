import { Outlet } from 'react-router-dom';
import './App.css';
import { NavLink } from "react-router-dom";
import { HeaderNav } from './components/HeaderNav';
import Header from './components/Header';

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
    <footer className="footer footer-container">
        <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
</>
    
  );
}

export default App;
