import AdminProductList from "../app/Admin/AdminProductList";
import Navbar from "../navbar/Navbar";


function AdminHome() {
    return ( 
        <>
         <Navbar>
         <AdminProductList/>
         
         </Navbar>
        </>
    );
}

export default AdminHome;