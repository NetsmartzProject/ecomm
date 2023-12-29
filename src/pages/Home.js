// import { Link } from "react-router-dom";
import ProductList from "../app/Product-List/ProductList";
import Navbar from "../navbar/Navbar";


function Home() {
    return ( 
        <>
         <Navbar>
         <ProductList/>
         </Navbar>
        </>
    );
}

export default Home;