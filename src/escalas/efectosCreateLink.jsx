import React, { useEffect, useState } from 'react'
import { getData, sendDataBody } from '../resources';
import { Form, Button, Space, Select, message } from 'antd'
const { Option } = Select;


export default function EfectosCreateLink() {

    const [misPacientes, setMisPacientes] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [link, setLink] = useState('')


    useEffect(() => {
        getData(`users_by_rol/Paciente`).then(rs => { setMisPacientes(rs); console.log(rs); })
    }, [])

    const handleChange = (value) => { setSelectedPatient(value) };

    const generateLink = () => {
        const token = 'gnrtunqtkn'
        let l = 'https://sistema.recreamed.com/escalas_public/' + selectedPatient + '/' + token
        setLink(l)
    }
    const copyLink = () => {
        navigator.clipboard.writeText(link)
        message.success('Enlace Copiado al Portapapeles!')
    }
    return (
        <div>
            <h5>Generar enlace para encuesta</h5>
            <br />
            <Space >
                <Form.Item label="Paciente" name="usuario" rules={[{ required: true, message: 'Selecciona el paciente' }]}
                    style={{ alignItems: 'center', paddingTop: 20 }}>
                    <Select
                        style={{ width: 260, }}
                        onChange={handleChange}
                        placeholder='Selecciona un paciente'
                    >
                        {
                            misPacientes.map((p) => {
                                return <Option value={p._id}>{p.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Button onClick={generateLink} disabled={!selectedPatient} >Generar Enlace</Button>
            </Space>
            <br />
            {
                selectedPatient && link ? <Space align='center'>
                    <p style={{ paddingTop: 16, color: '#1890ff' }} >{link}</p>
                    <Button onClick={copyLink}>Copiar Link</Button>
                </Space> : <></>
            }
            <div style={{ height: 330 }}></div>

        </div >
    )
}
