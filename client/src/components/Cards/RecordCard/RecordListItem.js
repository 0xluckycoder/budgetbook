import React from "react";
import { RecordListItemLeft } from "./RecordListItemLeft";
import { RecordListItemAmount } from "./RecordListItemAmount";
import { RecordListItemRight } from "./RecordListItemRight";

import style from './recordListItem.module.scss';

export const RecordListItem = () => {
    return (
        <div className={style.recordListItem}>
            <RecordListItemLeft name="Food" percentage="30%" />
            <RecordListItemAmount>200</RecordListItemAmount>
            <RecordListItemRight />
        </div>
    );
}