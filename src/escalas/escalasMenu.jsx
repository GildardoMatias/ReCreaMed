import React from 'react';
import { Tabs } from 'antd';
import DepresionCreateLink from './depresion/depresionCreateLink';
import DepresionResults from './depresion/depresionResults';
import EfectosResults from './ketamina/efectosResults';
import EfectosCreateLink from './ketamina/efectosCreateLink';
import DolorEncuesta from './dolor/dolorEncuesta';
import DolorCreateLink from './dolor/dolorCreateLink';
import DolorResults from './dolor/dolorResults';
import Depresion2Encuesta from './depresion_2/depresion2_encuesta';
import PostTraumaticoEncuesta from './post_traumatico/post_traumatico_encuesta';
const { TabPane } = Tabs;

const onChange = (key) => {
    console.log(key);
};

export default function Escalas() {
    return (
        <div>
            <Tabs defaultActiveKey="1" onChange={onChange} tabPosition='left'>
                <TabPane tab="Ketamina" key="1">
                    <EfectosCreateLink />
                </TabPane>
                <TabPane tab="Resultados Ketamina" key="2">
                    <EfectosResults />
                </TabPane>
                <TabPane tab="Depresion" key="3">
                    <DepresionCreateLink />
                </TabPane>
                <TabPane tab="Resultados Depresion" key="4">
                    <DepresionResults />
                </TabPane>
                <TabPane tab="Depresion 2" key="41">
                    <Depresion2Encuesta />
                </TabPane>
                <TabPane tab="Estres Post Traumatico" key="42">
                    <PostTraumaticoEncuesta />
                </TabPane>
                <TabPane tab="Dolor" key="5">
                    <DolorCreateLink />
                </TabPane>
                <TabPane tab="Resultados Dolor" key="6">
                    <DolorResults />
                </TabPane>
            </Tabs>
        </div>

    )
}
