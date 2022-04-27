import React, { useState } from 'react'
import { Button, Form, Input, Select } from 'antd';
import { API } from '../../resources';
const { Option } = Select;

const onFinish = (values) => {
    console.log('Valores:', values);
    // fetch(API + 'expedientes/add', {
    //     method: 'POST',
    //     body: JSON.stringify(values),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(res => res.json())
    //     .then(response => { console.log('Success:', response); message.success(response.message || response.error); })
    //     .catch(error => console.error('Error:', error))
    // .finally(() => { getCitasData(); setIsModalVisible(false) })
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default function MovePatients() {
    const [pacientesData, setPacientesData] = useState(
        [
            {
                "_id": "625706dc9a6437369f835bd5",
                "rol": "Paciente",
                "id_sucursal": "625705929a6437369f835bc7",
                "id_medicoasignado": "625706149a6437369f835bce",
                "name": "Paciente 1",
                "email": "gildardo@gmail.com",
                "password": "$2b$10$hAPxL/WykUQxMl.AdgzX7uegKQDVoTkpo.HPWv.qGsdEOk184mGWe",
                "avatar": "https://",
                "telefono": 1234567890,
                "cedula": "1234567890",
                "numinterior": "2",
                "numexterior": "425",
                "calle": "San Jose",
                "colonia": "Centro",
                "municipio": "Municipio",
                "estado": "Michoacan",
                "codigopostal": 50895,
                "estatus": 1,
                "certificacion": "Sin certificacion",
                "universidad": "umsnh",
                "createdAt": "2022-04-13T17:22:36.283Z",
                "updatedAt": "2022-04-13T17:22:36.283Z",
                "__v": 0,
                "horarios": []
            },
            {
                "_id": "62685796e8ce90005621bdde",
                "rol": "Paciente",
                "horarios": [],
                "id_medicoasignado": "625706149a6437369f835bce",
                "name": "Paciente 5",
                "email": "Paciente5@recreamed.com",
                "password": "$2b$10$H78oUO7ty7V.iOomJoT9YOHIBbOHePpXAQnkQMd71qAuZXyH8OuOC",
                "avatar": "https://",
                "telefono": 4341026429,
                "cedula": "",
                "numinterior": "",
                "numexterior": "",
                "calle": "",
                "colonia": "",
                "municipio": "",
                "estado": "",
                "codigopostal": 0,
                "estatus": 0,
                "certificacion": "",
                "universidad": "",
                "remember_token": false,
                "createdAt": "2022-04-26T20:35:34.698Z",
                "updatedAt": "2022-04-26T20:35:34.698Z",
                "__v": 0
            }
        ]);
    const [medicosData, setMedicosData] = useState([
        {
            "_id": "626943e0f8254c72c301779c",
            "rol": "Medico",
            "horarios": [
                {
                    "id_sucursal": "625705929a6437369f835bc7",
                    "horario": "11-13",
                    "_id": "626943e0f8254c72c301779d"
                }
            ],
            "id_medicoasignado": "",
            "name": "Medico 1",
            "email": "medico@realidadcreativa.com",
            "password": "$2b$10$MGAXzk2iTrUOVNT81G7xmO28rK60dlqQvpNHCOLiC11RlQ4YoP2P2",
            "avatar": "https://",
            "telefono": 4341026429,
            "cedula": "",
            "numinterior": "",
            "numexterior": "",
            "calle": "",
            "colonia": "",
            "municipio": "",
            "estado": "",
            "codigopostal": 0,
            "estatus": 0,
            "certificacion": "",
            "universidad": "",
            "remember_token": false,
            "createdAt": "2022-04-27T13:23:44.906Z",
            "updatedAt": "2022-04-27T13:23:44.906Z",
            "__v": 0
        },
        {
            "_id": "62695d7ff8254c72c30177c8",
            "rol": "Medico",
            "horarios": [
                {
                    "id_sucursal": "625705929a6437369f835bc7",
                    "horario": "11-13",
                    "_id": "62695d7ff8254c72c30177c9"
                }
            ],
            "id_medicoasignado": "",
            "name": "Medico 2 Internista",
            "email": "medico2@realidadcreativa.com",
            "password": "$2b$10$oBUpS7tGAllsjYaCssEVXeq.U3W7cYmhMY98gDeF0MGxuZ1JPdavW",
            "avatar": "https://",
            "telefono": 4341026429,
            "cedula": "",
            "numinterior": "",
            "numexterior": "",
            "calle": "",
            "colonia": "",
            "municipio": "",
            "estado": "",
            "codigopostal": 0,
            "estatus": 0,
            "certificacion": "",
            "universidad": "",
            "remember_token": false,
            "createdAt": "2022-04-27T15:13:03.492Z",
            "updatedAt": "2022-04-27T15:13:03.492Z",
            "__v": 0
        }
    ]);

    //Select paciente widget
    function onChange(value) {
        console.log(`selected ${value}`);
    }
    function onSearch(val) {
        console.log('search:', val);
    }
    //End of select paciente widget
    return (
        <div>
            <h4> Asignar pacientes a otro médico </h4>
            <br />
            <Form name="expediente" labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >

                <Form.Item label="Paciente" name="id_usuario" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                    >
                        {
                            pacientesData.map(p => <Option value={p._id}>{p.name}</Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="Medico" name="medico" rules={[{ required: true, message: 'Ingresa RFC' }]} >
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                    >
                        {
                            medicosData.map(p => <Option value={p._id}>{p.name}</Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" form='expediente'>
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
