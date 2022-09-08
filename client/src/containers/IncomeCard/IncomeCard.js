import React from "react";
import { CardHeading } from "../../components/Cards/CardHeading";
import { CardWrapper } from "../../components/Cards/CardWrapper";
import { AnalyticCardDetails } from "../../components/Cards/AnalyticCard/AnalyticCardDetails";
import { CustomLineChart } from "../../components/Cards/AnalyticCard/LineChart";


export const IncomeCard = () => {
    return (
        <CardWrapper>
            <CardHeading>
                Incomes
            </CardHeading>
            <AnalyticCardDetails />
            <CustomLineChart />
        </CardWrapper>
    )
}