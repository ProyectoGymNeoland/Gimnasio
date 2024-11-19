import { useDayFrame } from "../hooks";
import './DayDetails.css';


export const DayDetails = ({day})=>{
  const {renderFestivoFrames,renderHabilFrames,renderFindeFrames} =useDayFrame()


  
    const dateForm = new Date(day.dates).toLocaleDateString();
  return(
    <>
    <h1>{day.day}({dateForm})</h1>
  
    <div className="frames_container">
        {day && day.type === "Habil" && renderHabilFrames(day) /** 8 */}
        {day && day.type === "Finde" && renderFindeFrames(day)/** 3*/}
        {day && day.type === "Festivo" && renderFestivoFrames(day)/** 5 */}
    </div>
    </>
  )
}