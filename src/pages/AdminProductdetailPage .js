import AdminProductDetail from "../app/Admin/components/AdminProductDetail";
import Navbar from "../navbar/Navbar";

function AdminProductDetailPage() {
    return (
        <>
        <div>
            <Navbar>
                <AdminProductDetail></AdminProductDetail>
            </Navbar>
        </div>
        </>
    );
}

export default AdminProductDetailPage;