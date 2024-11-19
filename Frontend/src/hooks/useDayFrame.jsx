import { CardReserva } from "../components";

export const useDayFrame = (day) => {
  const renderHabilFrames = (infoDay) => {
    return (
      <>
        <label htmlFor="actividad" className="custom-placeholder-day">9:00-9:45 :</label>
        <CardReserva info={infoDay?.one} />
        <label htmlFor="actividad" className="custom-placeholder-day">10:00-10:45 :</label>
        <CardReserva info={infoDay?.two} />
        <label htmlFor="actividad" className="custom-placeholder-day">11:00-11:45 :</label>
        <CardReserva info={infoDay?.three} />
        <label htmlFor="actividad" className="custom-placeholder-day">12:00-12:45 :</label>
        <CardReserva info={infoDay?.four} />
        <label htmlFor="actividad" className="custom-placeholder-day">17:00-17:45 :</label>
        <CardReserva info={infoDay?.five} />
        <label htmlFor="actividad" className="custom-placeholder-day">18:00-18:45 :</label>
        <CardReserva info={infoDay?.six} />
        <label htmlFor="actividad" className="custom-placeholder-day">19:00-19:45 :</label>
        <CardReserva info={infoDay?.seven} />
        <label htmlFor="actividad" className="custom-placeholder-day">20:00-20:45 :</label>
        <CardReserva info={infoDay?.eight} />
      </>
    );
  };

  const renderFestivoFrames = (infoDay) => {
    return (
      <>
        <label htmlFor="actividad" className="custom-placeholder-day">9:00-9:45 :</label>
        <CardReserva info={infoDay?.one} />
        <label htmlFor="actividad" className="custom-placeholder-day">10:00-10:45 :</label>
        <CardReserva info={infoDay?.two} />
        <label htmlFor="actividad" className="custom-placeholder-day">11:00-11:45 :</label>
        <CardReserva info={infoDay?.three} />
        <label htmlFor="actividad" className="custom-placeholder-day">12:00-12:45 :</label>
        <CardReserva info={infoDay?.four} />
        <label htmlFor="actividad" className="custom-placeholder-day">13:00-13:45 :</label>
        <CardReserva info={infoDay?.five} />
      </>
    );
  };

  const renderFindeFrames = (infoDay) => {
    return (
      <>
        <label htmlFor="actividad" className="custom-placeholder-day">10:00-10:45 :</label>
        <CardReserva info={infoDay?.one} />
        <label htmlFor="actividad" className="custom-placeholder-day">11:00-11:45 :</label>
        <CardReserva info={infoDay?.two} />
        <label htmlFor="actividad" className="custom-placeholder-day">12:00-12:45 :</label>
        <CardReserva info={infoDay?.three} />
      </>
    );
  };

  return { renderFestivoFrames, renderFindeFrames, renderHabilFrames };
};

