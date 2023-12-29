import Navbar from "../navbar/Navbar";
import { UserOrders } from "../user/components/Userorder";

function Userorderpage() {
    return (
        <>
        <div>
            <Navbar>
                <h1 className="mx-auto text-2xl">My orders</h1>
                <UserOrders></UserOrders>
            </Navbar>
        </div>
        </>
    );
}

export default Userorderpage;



