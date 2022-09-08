import React, { useState } from "react";
import { AppLayout } from "../AppLayout";
import { Col, Row } from 'antd';
import styles from './home.module.scss';
import { DropdownButton } from "../../containers/DropdownButton/DropdownButton";

import { AccountCard } from "../../containers/AccountCard/AccountCard";
import { IncomeCard } from "../../containers/IncomeCard/IncomeCard";

const Home = () => {

    const [state, setState] = useState('Yearly');

    const values = [
        {
            value: 'Yearly'
        },
        {
            value: 'Daily'
        },
        {
            value: 'Max'
        }
    ];

    return (
        <AppLayout>
            <h2>Dashboard</h2>
            <div className={styles.home}>

                <DropdownButton state={state} setState={setState} dropdownValues={values} />
                                    
                <Row gutter={20}>
                    <Col lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        <AccountCard />
                    </Col>
                    <Col lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        <div className={styles.box}>
                            <IncomeCard />
                        </div>
                    </Col>
                    <Col lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        <div className={styles.box}>
                            h1
                        </div>
                    </Col>
                </Row>



            </div>
        </AppLayout>
    );
}

export default Home;