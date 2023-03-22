import { Tabs } from 'antd';
import Register from './register.patient';
import Dash from './dash.patients';
const onChange = (key) => {
    console.log(key);
};
const items = [
    { key: '1', label: `Pacientes`, children: <Dash /> },
    { key: '2', label: `Registrar Paciente`, children: <Register /> }
];


export default function Patients() {
    return <div style={{ marginTop: 6 }}>
        <Tabs tabPosition='left' defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
}
