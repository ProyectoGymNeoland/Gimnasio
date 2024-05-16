import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import './Register.css';
import { registerUser } from "../services/user.service";
import { useErrorRegister } from "../hooks";
import { useAuth } from "../context/authContext";
import { Link, Navigate } from "react-router-dom";
import { Uploadfile } from "../components";

export const Register = () => {

    //! 1) crear los estados
    const [ res, setRes ] = useState({});
    const [ send, setSend ] = useState(false);
    const [ ok, setOk ] = useState(false);
    const { allUser, setAllUser, bridgeData } = useAuth();
 
    return (
        <p>{JSON.stringify(allUser)}</p>
    )
}
