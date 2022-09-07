import React from 'react';
// import { Logo } from '../../components/Logo/Logo';
// import { TopNavWrapper } from '../../components/TopNavWrapper/TopNavWrapper';
// import { HamburgerIcon } from '../../components/HamburgerIcon/HamburgerIcon';
// import { ProfileCard } from '../../components/ProfileCard/ProfileCard';
import { TopNavWrapper } from '../../components/TopNav/TopNavWrapper';
import { NavLeft } from '../../components/TopNav/NavLeft';
import { ProfileCard } from '../../components/TopNav/ProfileCard';

export const TopNav = () => {
    return (
        <TopNavWrapper>
            <NavLeft hamburger={true} />
            <ProfileCard userName="Johnathan" />
        </TopNavWrapper>
    );
}