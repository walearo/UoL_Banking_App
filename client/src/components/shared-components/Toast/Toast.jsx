import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

export const Toast = (type = "success", message = "Hi") => {
  //type to show error or success for green or red
  if (type === "error") {
    //error toats
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  } else if (type === "success") {
    //success toast
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  } else {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}
