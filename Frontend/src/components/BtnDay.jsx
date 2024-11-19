import { useNavigate } from 'react-router-dom';

export const BtnDay=({day,className})=>{
    const navigate = useNavigate();
     const handleClick = () => {
        navigate(`/calendar/day/${day._id}`);
    };
    const dateForm = new Date(day.dates).toLocaleDateString();
    return(
        <>
        <figure>
        <button onClick={handleClick} className={className}>
        <figcaption>
          <h2>{dateForm}</h2>
        </figcaption>
      </button>
       </figure>
       </> 
     
    )
}