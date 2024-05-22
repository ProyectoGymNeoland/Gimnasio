import { Link } from "react-router-dom"
import './Home.css'; 
import { About, ActivitiesHomeCard, WallPreview } from "../components";

export const Home = () =>{
    return (
      <>
     
            <About />
            <WallPreview />
            <ActivitiesHomeCard/>
           
       
      </>
    );
}