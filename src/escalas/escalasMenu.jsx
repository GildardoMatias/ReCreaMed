import React from 'react';
import { Tabs } from 'antd';
import DepresionCreateLink from './depresionCreateLink';
import DepresionResults from './depresionResults';
import EfectosResults from './efectosResults';
import EfectosCreateLink from './efectosCreateLink';
const { TabPane } = Tabs;

const onChange = (key) => {
    console.log(key);
};

export default function Escalas() {
    return (
        <div>
            <Tabs defaultActiveKey="1" onChange={onChange} tabPosition='left'>
                <TabPane tab="Efectos" key="1">
                    <EfectosCreateLink />
                </TabPane>
                <TabPane tab="Resultados Efectos" key="2">
                    <EfectosResults />
                </TabPane>
                <TabPane tab="Depresion" key="3">
                    <DepresionCreateLink />
                </TabPane>
                <TabPane tab="Resultados Depresion" key="4">
                    <DepresionResults />
                </TabPane>
            </Tabs>
        </div>

    )
}
