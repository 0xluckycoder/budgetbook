import React from "react";
import { TopNav } from '../../containers/TopNav/TopNav';
import { SideNav } from '../../containers/SideNav/SideNav';

const Home = () => {
    return (
        <div>
            <TopNav hamburger={true} />
            <h1>Home Page</h1>
            <h1>Home Page</h1>
            <h1>Home Page</h1>
            <SideNav />
        </div>
    );
}

export default Home;