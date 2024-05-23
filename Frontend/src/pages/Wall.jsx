import { ButtonCreateWall } from "../components/ButtonCreateWall";
import { ComponenteWall } from "../components/ComponenteWall";
import { useAuth } from "../context/authContext";


export const Wall = () =>{

  const {user} = useAuth()

    return (
      <>
        <ComponenteWall></ComponenteWall>
      </>
    );
}