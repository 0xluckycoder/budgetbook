import React from "react";
import {  Dropdown, Menu, Button } from 'antd';

export const DropdownButton = ({ state, handleDropdownChange, dropdownValues }) => {

    const dropdownItems = dropdownValues.map((item, index) => {
        return {
            key: `${index + 1}`,
            label: <a target="_blank" onClick={() => handleDropdownChange(item.value)} rel="noopener noreferrer">
                {item.value.text}
            </a>
        }
    });
    const menu = <Menu items={dropdownItems} />
    
    return (
        <Dropdown overlay={menu} placement="bottomLeft">
            <Button className="themed-button">{state}</Button>
        </Dropdown>
    )
}