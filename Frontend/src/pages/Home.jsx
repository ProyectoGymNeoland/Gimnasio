import { Link } from "react-router-dom"
import './Home.css'; 
import { About, ActivitiesHomeCard, TestimonialsHomeCard, WallPreview } from "../components";

export const Home = () =>{
    return (
      <>
     
            <About />
            <WallPreview />
            <ActivitiesHomeCard/>
            <TestimonialsHomeCard/>
           
       
      </>
    );
}