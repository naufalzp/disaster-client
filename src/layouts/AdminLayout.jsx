import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const AdminLayout = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    if (!user) {
        navigate("/login");
        return null;
    }

    return (
        <div className='flow-row flex min-h-screen'>
            <Sidebar />
            <div className='flex flex-1 flex-col'>
                <Header user={user} />
                <main className='flex-grow bg-white'>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default AdminLayout;
