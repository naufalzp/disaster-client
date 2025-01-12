import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className='bg-indigo-900 p-4'>
            <div className='p-4 text-center text-white'>
                <h1 className='text-2xl font-bold'>Admin Berita</h1>
            </div>
            <div className='p-4'>
                <nav>
                    <ul>
                        <li>
                            <Link
                                to='/admin'
                                className='block px-4 py-2 bg-indigo-800 rounded mb-4 text-white hover:underline'
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/admin/disasters'
                                className='block px-4 py-2 bg-indigo-800 rounded mb-4 text-white hover:underline'
                            >
                                Disasters
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
