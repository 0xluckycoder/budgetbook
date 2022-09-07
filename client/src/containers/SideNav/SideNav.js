import React from "react";

import { SideNavItem } from "../../components/SideNavItem/SideNavItem";
import { SideNavWrapper } from "../../components/SideNavWrapper/SideNavWrapper";

import Dashboard from '../../assets/SideNav/dashboard.svg';
import Bell from '../../assets/SideNav/bell.svg';
import Charts from '../../assets/SideNav/charts.svg';
import Payment from '../../assets/SideNav/payment.svg';
import Setting from '../../assets/SideNav/settings.svg';

export const SideNav = () => {
    return (
        <SideNavWrapper>
            <SideNavItem icon={Dashboard} name={"Home"} />
            <SideNavItem icon={Bell} name={"Bell"} />
            <SideNavItem icon={Charts} name={"Charts"} />
            <SideNavItem icon={Payment} name={"Payment"} />
            <SideNavItem icon={Setting} name={"Settings"} />
        </SideNavWrapper>
    );
}