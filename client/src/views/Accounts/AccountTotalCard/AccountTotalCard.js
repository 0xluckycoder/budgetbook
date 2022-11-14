import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/charts";
import styles from './accountTotalCard.module.scss';

export const AccountTotalCard = ({ accountData }) => {

  const [state, setState] = useState([]);

  const [total, setTotal] = useState(0);
    //     {
    //       type: 'Personal',
    //       value: 27,
    //     },
    //     {
    //       type: 'Bank',
    //       value: 25,
    //     },
    //     {
    //       type: 'Investment',
    //       value: 18,
    //     },
    //     {
    //       type: 'Insurance',
    //       value: 15,
    //     },
    //     {
    //       type: 'Real Estate',
    //       value: 10,
    //     }
    //   ];

      useEffect(() => {

        let totalValue = 0;
        const converted = accountData.map(account => {
          const convertedValue = parseInt(account.value);
          totalValue += convertedValue;
          return {
            ...account,
            value: convertedValue
          }
        });

        setState(converted);
        setTotal(totalValue);
      }, []);

      const config = {
        appendPadding: 10,
        data: state,
        angleField: 'value',
        colorField: 'name',
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
            content: total,
          },
        },
      };

    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardHeading}>
                <p>Accounts Total</p>
            </div>
            {state.length > 0 && <Pie {...config} />}
        </div>
    );
}
