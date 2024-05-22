import { Link } from "react-router-dom"
import './Home.css'; 
import "./Nav.css"
import { About, ActivitiesHomeCard } from "../components";

export const Home = () =>{
    return (
      <>
     
            <About />
            <ActivitiesHomeCard/>
           
       
      </>
    );
}