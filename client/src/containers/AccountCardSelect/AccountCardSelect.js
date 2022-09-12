import React, { useState } from "react";
import { CardHeading } from "../../components/Cards/CardHeading";
import { CardFooter } from "../../components/Cards/CardFooter";
import { CardWrapper } from "../../components/Cards/CardWrapper";
import { AccountCardDetails } from '../../components/Cards/AccountCardDetails';
import { Radio } from 'antd';

const plainOptions = ['Select'];

export const AccountCardSelect = () => {

    const [state, setState] = useState(null);

    return (
        <CardWrapper>
            <CardHeading>
                {/* Account */}
                <Radio.Group options={plainOptions} onChange={() => setState('account name')} />
            </CardHeading>
            <AccountCardDetails amount={10000} accountName={"Bank Account"} />
            <CardFooter>
                2022 Sep 01
            </CardFooter>
        </CardWrapper>
    )
}