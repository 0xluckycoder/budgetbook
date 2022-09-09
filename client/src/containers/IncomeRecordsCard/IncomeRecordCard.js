import React from 'react';
import { Button } from 'antd';

import { CardHeading } from '../../components/Cards/CardHeading';
import { RecordListItem } from '../../components/Cards/RecordCard/RecordListItem';
import { RecordCardWrapper } from '../../components/Cards/RecordCard/RecordCardWrapper';
import { RecordListWrapper } from '../../components/Cards/RecordCard/RecordListWrapper';

export const IncomeRecordCard = () => {
    return (
        <RecordCardWrapper>
            <CardHeading>
                Income Records
            </CardHeading>

            <Button className="themed-button">Add</Button>
            
            <RecordListWrapper>
                <RecordListItem />
                <RecordListItem />
                <RecordListItem />
                <RecordListItem />
                <RecordListItem />
                <RecordListItem />
                <RecordListItem />
            </RecordListWrapper>
        </RecordCardWrapper>
    );
}