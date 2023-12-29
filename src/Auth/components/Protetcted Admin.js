import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectLoggedInUser } from "../AuthSlice";
import { Navigate } from "react-router-dom";

function ProtetctedAdmin({children}) {
    console.log(children,"chldren from login")
    const user= useSelector(selectLoggedInUser)
    console.log(user," from protetcted Route ")
   if(!user){
    return  <Navigate to='/login' replace={true}></Navigate>
   }

   if(user && user.role!=='admin'){
    return  <Navigate to='/' replace={true}></Navigate>
   }
    return children;
}

export default ProtetctedAdmin;