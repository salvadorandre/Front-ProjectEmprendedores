import {Outlet } from "react-router";

export const MainLayout = () =>{
    return(
        <div>
            <nav>Navbar</nav>
            <main>
                <Outlet/>
            </main>
        </div>
    );
};