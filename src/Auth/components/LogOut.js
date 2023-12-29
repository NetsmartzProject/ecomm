import { useEffect } from "react";
import { selectLoggedInUser, signOutAsync } from "../AuthSlice";
import { useSelector,useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
function  Logout() {
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedInUser)

    useEffect(()=>{
       dispatch(signOutAsync())
    })
    //but useEffect runs after render , so we have to delay our navigation part
    return (
        <>
      {!user  && <Navigate to='/Login' replace={true}></Navigate>}
      
      </>
    );
}

export default Logout;