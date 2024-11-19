import './TestimonialsHomeCard.css';

export const TestimonialsHomeCard = () => {
  return (
    <div id="testimonios" className="testimonial-home-card-container">
      <h3>Qué dicen nuestros alumnos...</h3>
      <div className="testimonial-gallery">
        <div className="testimonial-card">
          <img className="testimonial-image " src="meryl.jpeg" alt="Testimonial"></img>
          <p className="testimonial-box">
            "Me encantan las instalaciones y los monitores. Los vestuarios son ideales,
            espaciosos y modernos. Además tiene sauna para rematar de la mejor forma un
            día de entrenamiento".
          </p>
          <p className='"testimonial-name'>Meryl S.</p>
        </div>

        <div className="testimonial-card">
          <img
            className="testimonial-image "
            src="leo di caprio.jpeg"
            alt="Testimonial"
          ></img>
          <p className="testimonial-box">
            "Es fantástico poder entrenar cualquier día de la semana, sin importar si es
            festivo o fin de semana, siempre tienes el gimnasio abierto para entrenar! Y
            siempre con monitores que te asesoran"
          </p>
          <p className='"testimonial-name'>Leo Di Caprio</p>
        </div>

        <div className="testimonial-card">
          <img className="testimonial-image " src="steve.jpeg" alt="Testimonial"></img>
          <p className="testimonial-box">
            "Lo que más me gusta es poder organizar mis reservas de manera online, y que
            además pueda escribir a los monitores para resolver mis dudas y que siempre me
            atiendan de la mejor manera!"
          </p>
          <p className='"testimonial-name'>Steve J.</p>
        </div>

        <div className="testimonial-card">
          <img className="testimonial-image " src="theRock.jpeg" alt="Testimonial"></img>
          <p className="testimonial-box">
            "Uno de los gimnasio más completos en los que he estado. Cuentan con lo último
            en maquinaria y materiales, y además con grandes pesos para poder entrenar la
            fuerza a cualquier nivel!"
          </p>
          <p className='"testimonial-name'>Emilio</p>
        </div>

        <div className="testimonial-card">
          <img className="testimonial-image " src="jordan.jpeg" alt="Testimonial"></img>
          <p className="testimonial-box">
            "Las clase de pádel son increíbles, y las pistas están en perfecto estado.
            Puedes seguir las clases, o reservar pistas y entrenar más por tu cuenta! Me
            encantan los torneos!"
          </p>
          <p className='"testimonial-name'>M. Jordan</p>
        </div>

        <div className="testimonial-card">
          <img className="testimonial-image " src="nadal.jpeg" alt="Testimonial"></img>
          <p className="testimonial-box">
            "Algo que me encanta es poder compartir mis marcas y mi entrenamiento con otras personas 
            del gym! Además los monitores nos dan recomendaciones y consejos cada día".
          </p>
          <p className='"testimonial-name'>R. Nadal</p>
        </div>
      </div>
    </div>
  );
};
