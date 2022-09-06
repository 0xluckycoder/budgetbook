import React from "react";
import { TopNav } from '../../components/TopNav/TopNav';

const Home = () => {
    return (
        <div>
            <TopNav hamburger={true} />
            <h1>Home Page</h1>
        </div>
    );
}

export default Home;