import {  toast } from "react-toastify";

//Notification handler user on occurring errors or making action successfully
const showNotificationMessage = ( message='',type='error', delay = 4000) => {
    toast.configure({
      autoClose: delay,
      draggable: false
    });
    return toast[type](message, {position: toast.POSITION.BOTTOM_RIGHT})
};

export default showNotificationMessage;