import { Link } from "react-router-dom"
import './Home.css'; 
import { About, ActivitiesHomeCard, TestimonialsHomeCard, WallPreview } from "../components";
import GymServices from "../components/GymServices";

export const Home = () =>{
    return (
      <>
            <About />
            <WallPreview />
            <GymServices />
            <ActivitiesHomeCard/>
            <TestimonialsHomeCard/>
           
       
      </>
    );
}