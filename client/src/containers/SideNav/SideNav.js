import React, { useContext } from "react";

import { SideNavItem } from "../../components/SideNav/SideNavItem";
import { SideNavWrapper } from "../../components/SideNav/SideNavWrapper";

import Dashboard from '../../assets/SideNav/dashboard.svg';
import Bell from '../../assets/SideNav/bell.svg';
import Charts from '../../assets/SideNav/charts.svg';
import Payment from '../../assets/SideNav/payment.svg';
import Setting from '../../assets/SideNav/settings.svg';
import Card from '../../assets/SideNav/card.svg';

import { SideNavContext } from "../../pages/AppLayout";

export const SideNav = () => {

    const { active } = useContext(SideNavContext);

    return (
        <SideNavWrapper isActive={active}>
            <SideNavItem icon={Dashboard} name={"Home"} />
            <SideNavItem icon={Card} name={"Accounts"} />
            <SideNavItem icon={Payment} name={"Payment"} />
            <SideNavItem icon={Bell} name={"Goals"} />
            <SideNavItem icon={Charts} name={"Charts"} />
            <SideNavItem icon={Setting} name={"Settings"} />
        </SideNavWrapper>
    );
}