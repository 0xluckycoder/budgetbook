import React, { useState, useContext, createContext } from "react";
import { TopNav } from "../TopNav/TopNav";
import { SideNav } from "../SideNav/SideNav";

export const SideNavContext = createContext();

export const AppLayout = ({ children }) => {

    const [active, setActive] = useState(false);

    return (
        <div>
            <SideNavContext.Provider value={{active , setActive}}>
                <TopNav hamburger={true} userName={"Johnathan"} />
                <SideNav />
                <div className="app-layout">
                    <div className="container">
                        {children}
                    </div>
                </div>
            </SideNavContext.Provider>
        </div>
    );
}