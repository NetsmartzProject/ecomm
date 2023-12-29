import ProductForm from "../app/Admin/ProductForm";
import Navbar from "../navbar/Navbar";

function AdminProductFormPage() {
    return (
        <>
        <Navbar>
            <ProductForm></ProductForm>
        </Navbar>
        </>
    );
}

export default AdminProductFormPage;