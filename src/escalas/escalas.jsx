import React from 'react';
import { Tabs } from 'antd';
import Efectos from './efectos';
import Sintomatologia from './sintomatologia';
import SintomatologiaResults from './sintomatologiaResults';
import EfectosResults from './efectosResults';
const { TabPane } = Tabs;

const onChange = (key) => {
    console.log(key);
};

export default function Escalas() {
    return (
        <div>
            <Tabs defaultActiveKey="1" onChange={onChange} tabPosition='left'>
            <TabPane tab="Efectos" key="1">
                <Efectos />
            </TabPane>
            <TabPane tab="Resultados Efectos" key="2">
                <EfectosResults />
            </TabPane>
            <TabPane tab="Sintomatologia" key="3">
                <Sintomatologia />
            </TabPane>
            <TabPane tab="Resultados Sint..." key="4">
                <SintomatologiaResults />
            </TabPane>
        </Tabs>
        </div>
        
    )
}
