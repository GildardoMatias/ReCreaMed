import React from 'react';
import { Tabs } from 'antd';
import DepresionMenu from './depresion/depresionMenu'
import KetaminaResults from './ketamina/ketaminaResults';
import PostTraumaticoMenu from './estres_post_traumatico/postTraumaticoMenu';
import DolorResults from './dolor/dolorResults';
import SatisfaccionResults from './satisfaccion/satisfaccionResults';
import { usuario } from '../resources';

const onChange = (key) => { console.log(key) };

const { tipo } = usuario || 'PSIQ';

const escalasPsiqMenuItems = [
    { label: 'Ketamina', key: 'item-1', children: <KetaminaResults /> },
    { label: 'Depresion', key: 'item-3', children: <DepresionMenu /> },
    { label: 'Dolor', key: 'item-4', children: <DolorResults /> },
    { label: 'Estres Post Traumatico', key: 'item-5', children: <PostTraumaticoMenu /> },
    { label: 'Escala de Satisfaccion', key: 'item-6', children: <SatisfaccionResults /> },
];
const escalasFisioMenuItems = [
    { label: 'Dolor', key: 'item-4', children: <DolorResults /> },
    { label: 'Escala de Satisfaccion', key: 'item-6', children: <SatisfaccionResults /> },
];

export default function Escalas() {
    return (
        <div>
            <Tabs items={tipo === 'PSIQ' ? escalasPsiqMenuItems : escalasFisioMenuItems} defaultActiveKey="1" onChange={onChange} tabPosition='left' />
        </div>

    )
}
