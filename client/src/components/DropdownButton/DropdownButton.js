import React from "react";
import {  Dropdown, Menu, Button } from 'antd';

export const DropdownButton = ({ state, setState, dropdownValues }) => {

    const dropdownItems = dropdownValues.map((item, index) => {
        return {
            key: `${index + 1}`,
            label: <a target="_blank" onClick={() => setState(item.value)} rel="noopener noreferrer"> {item.value}</a>
        }
    });

    const menu = <Menu items={dropdownItems} />

    return (
        <Dropdown overlay={menu} placement="bottomLeft">
            <Button className="themed-button">{state}</Button>
        </Dropdown>
    )
}