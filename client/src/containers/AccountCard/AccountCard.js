import React from "react";
import { CardHeading } from "../../components/Cards/CardHeading";
import { CardFooter } from "../../components/Cards/CardFooter";
import { CardWrapper } from "../../components/Cards/CardWrapper";
import { AccountCardDetails } from '../../components/Cards/AccountCardDetails';

export const AccountCard = () => {
    return (
        <CardWrapper>
            <CardHeading>
                Account
            </CardHeading>
            <AccountCardDetails amount={10000} accountName={"Bank Account"} />
            <CardFooter>
                2022 Sep 01
            </CardFooter>
        </CardWrapper>
    )
}