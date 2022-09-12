import React from "react";
import { CardWrapper } from "../../components/Cards/CardWrapper";
import { CardHeading } from "../../components/Cards/CardHeading";
import { Pie } from "@ant-design/charts";
import { LargeCardWrapper } from "../../components/Cards/LargeCard/LargeCardWrapper";

export const AccountTotalCard = () => {
    const data = [
        {
          type: 'Personal',
          value: 27,
        },
        {
          type: 'Bank',
          value: 25,
        },
        {
          type: 'Investment',
          value: 18,
        },
        {
          type: 'Insurance',
          value: 15,
        },
        {
          type: 'Real Estate',
          value: 10,
        }
      ];
      const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
          type: 'inner',
          offset: '-50%',
          content: '{value}',
          style: {
            textAlign: 'center',
            fontSize: 14,
          },
        },
        interactions: [
          {
            type: 'element-selected',
          },
          {
            type: 'element-active',
          },
        ],
        statistic: {
          title: false,
          content: {
            style: {
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            content: '10000',
          },
        },
      };

    return (
        <LargeCardWrapper>
            <CardHeading>Accounts Total</CardHeading>
            <Pie {...config} />
        </LargeCardWrapper>
    );
}
