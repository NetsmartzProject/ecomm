import AdminProductList from "../app/Admin/AdminProductList";
import Navbar from "../navbar/Navbar";

function AdminProductListPage() {
    return (
        <>
        <div>
            <Navbar>
                <AdminProductList></AdminProductList>
            </Navbar>
        </div>
        </>
    );
}

export default AdminProductListPage;