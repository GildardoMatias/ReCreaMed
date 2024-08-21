import React from 'react';
import { Tabs } from 'antd';
import DepresionMenu from './depresion/depresionMenu'
import KetaminaResults from './ketamina/ketaminaResults';
import PostTraumaticoMenu from './estres_post_traumatico/postTraumaticoMenu';
import DolorResults from './dolor/dolorResults';
import SatisfaccionResults from './satisfaccion/satisfaccionResults';
import { usuario } from '../resources';
import Gad7Results from './gad7/gad7.results';
import Phq9pResults from './phq9p/phq9p.results';
import CssrsResults from './cssrs/cssrs.results';
import ThiResults from './thi/thi.results';
import EmcaResults from './emca/emca.results';
import OwsResults from './ows/ows.results';
import SowsResults from './sows/sows.results';
import PatientsResults from './results/patients.results';
import DocsResults from './docs/docs.results';
import Pcl5Results from './pcl5/pcl5.results';
import Dolor2Results from './dolor_2/dolor2_results';

const onChange = (key) => { console.log(key) };

const { tipo } = usuario || 'PSIQ';

const escalasPsiqMenuItems = [
    { label: 'Resultados', key: 'item-0', children: (usuario && (usuario.rol === 'Enfermero' || usuario.rol === 'Administrador')) ? <PatientsResults /> : <div className='mainContainer'>No cuentas con permisos para ver los resultados agrupados</div> },
    { label: 'Ketamina', key: 'item-1', children: <KetaminaResults /> },
    { label: 'Depresion', key: 'item-3', children: <DepresionMenu /> },
    { label: 'Dolor', key: 'item-4', children: <DolorResults /> },
    { label: 'Estres Post Traumatico', key: 'item-5', children: <PostTraumaticoMenu /> },
    { label: 'Escala de Satisfaccion', key: 'item-6', children: <SatisfaccionResults /> },
    { label: 'GAD-7', key: 'item-7', children: <Gad7Results /> },
    { label: 'PHQ9P', key: 'item-8', children: <Phq9pResults /> },
    { label: 'C-SSRS', key: 'item-9', children: <CssrsResults /> },// Must change
    { label: 'THI', key: 'item-10', children: <ThiResults /> },
    { label: 'DOCS', key: 'item-11', children: <DocsResults /> },
    { label: 'EMCA', key: 'item-12', children: <EmcaResults /> },
    { label: 'OWS', key: 'item-13', children: <OwsResults /> },
    { label: 'SOWS', key: 'item-14', children: <SowsResults /> },
    { label: 'Dolor 2', key: 'item-15', children: <Dolor2Results /> },
    { label: 'PCL-5', key: 'item-16', children: <Pcl5Results /> },
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
