import Swal from 'sweetalert2'  
import { useState } from 'react';

export const useErrorPassword = (res, setRes, setOkForgot ) => {

    if (res?.status === 307) {
        ("Password reset link sent");
        Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Password reset link sent ✅",
            showConfirmButton: false,
            timer: 1500,
        });
        setOkForgot(()=>true)
        setRes(()=>({}))
    }


    if (res?.status === 200) {
        ("Password updated successfully");
        Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Password updated successfully ✅",
            showConfirmButton: false,
            timer: 1500,
        });
        setOkForgot(()=>true)
        setRes(()=>({}))
    }

    if (res?.status === 404 && res?.response?.data === "User no register") {
        setRes(()=>({}))

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "User not registered ❎",
            showConfirmButton: false,
            timer: 1500,
        });
    }

    if (res?.status === 404 && res?.response?.data === "dont send email and dont update user") {
        setRes(()=>({}))
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to send email and update user ❎",
            showConfirmButton: false,
            timer: 1500,
        });

    }

    if (res?.status === 500) {
    setRes(() => ({}));
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Internal Server Error ❎",
            showConfirmButton: false,
            timer: 1500,
        });
    }

};
