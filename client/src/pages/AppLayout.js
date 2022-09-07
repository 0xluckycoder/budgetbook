import React, { createContext, useState } from "react";
import { TopNav } from "../containers/TopNav/TopNav";
import { SideNav } from "../containers/SideNav/SideNav";

export const SideNavContext = createContext();

export const AppLayout = ({ children }) => {

    const [active, setActive] = useState(false);

    return (
        <div>
            <SideNavContext.Provider value={{active , setActive}}>
                <TopNav hamburger={true} />
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