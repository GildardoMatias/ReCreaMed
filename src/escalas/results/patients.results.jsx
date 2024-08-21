import React, { useEffect, useState } from 'react'
import { Select, Form, message, Table, Button } from 'antd'
import { getData, ids_hospitales, sendDataBody } from '../../resources'
import Loading from '../../loading'
import Gad7Details from '../gad7/gad7.details'
import ThiDetails from '../thi/thi.details'
import Phq9pDetails from '../phq9p/phq9p.details'
import CssrsDetails from '../cssrs/cssrs.details'
import EmcaDetails from '../emca/emca.details'
import OwsDetails from '../ows/ows.details'
import SowsDetails from '../sows/sows.details'
import Pcl5Details from '../pcl5/pcl5.details'
import DocsDetails from '../docs/docs.details'
import Dolor2Details from '../dolor_2/dolor2_details'
import GenerateAllEscalas from './generate.escalas.all'
import CsvEscalas from './csv.escalas'

export default function PatientsResults() {

    const [loading, setLoading] = useState(true)
    const [allPacientes, setAllPacientes] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [patientScalas, setPatientScalas] = useState(null)
    const [medicosAsignados, setMedicosAsignados] = useState([]) // List of medicos able to select


    //Modal for details scala
    const [escalaDetails, setescalaDetails] = useState(null)

    const [tipoFound, setTipoFound] = useState('') // Tipos de escalas


    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCancel = () => {
        setIsModalOpen(false);
        setTipoFound('')
    };

    useEffect(() => {
        const getAllMedicos = async () => {
            await getData(`users/hospital/${ids_hospitales[0]}`).then(rs => { getAllPacientes(rs) })
        }

        getAllMedicos()
        // usuario.rol === 'Medico' ? getPacientesOfDoctor(usuario._id) : getAllMedicos()

    }, [])

    const getAllPacientes = async (medicos) => {
        const medicosFormatted = medicos.map(m => m._id)
        await sendDataBody('pacientes/simple/medicos', { medicos: medicosFormatted }).then(rs => { setAllPacientes(rs); setLoading(false) })
    }


    // Form Methods
    const handlePatientChange = (value) => {
        console.log('Selected Patient ', value)
        setSelectedPatient(value)
        getPatientScalas(value)
        getPatientData(value)
    };

    const getPatientScalas = (id) => {
        getData(`encuestas/paciente/${id}`).then(rs => {  setPatientScalas(rs) })
    }

    const getPatientData = (id) => {
        getData(`getuser/${id}`).then(rs => {console.log(rs); setMedicosAsignados(rs['medicos_asignados'][0]) })
    }

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    // Triggers for open modals and see details
    const detailModalParams = { handleOk: handleCancel, handleCancel, isModalOpen, escalaDetails };


    const searchEscala = (params) => {
        const { protocolo, tipo, momento } = params;
        console.log('Searching', params);
        const found = patientScalas.find((scala) => { return scala.tipo === tipo && scala.cat[0] === protocolo && scala.cat[1] === momento })
        if (found) {
            message.info('Escala ya contestada')
            setescalaDetails(found[tipo])
            setTipoFound(tipo)
            setIsModalOpen(true)
        }
        else {
            message.error('Escala aún no registrada')
        }
    }

    const DepresionResistenteTable = () => {

        const dataSource = [
            {//Fila 1
                key: '1',
                name: { label: 'Sociodemografico', value: 'Sociodemografico' }, // Aplicacion inicial
                age: { label: 'GAD7', value: 'gad_7' }, // Aplicacion final
                address: { label: 'GAD7', value: 'gad_7' }, // Inicio mantenimiento 
                address2: { label: 'GAD7', value: 'gad_7' }, // Final mantenimiento
            },
            {//Fila 2
                key: '2',
                name: { label: 'GAD7', value: 'gad_7' },// Aplicacion inicial
                age: { label: 'PHQ9P', value: 'phq9p' },// Aplicacion final
                address: { label: 'PHQ9P', value: 'phq9p' },// Inicio mantenimiento 
                address2: { label: 'PHQ9P', value: 'phq9p' },// Final mantenimiento
            },
            {//Fila 3
                key: '3',
                name: { label: 'PHQ9P', value: 'phq9p' },// Aplicacion inicial
                age: { label: 'Satisfaccion', value: 'satisfaccion' }// Aplicacion final
            },
            {//Fila 4
                key: '4',
                name: { label: 'CSSRS', value: 'cssrs' },// Aplicacion inicial
                age: { label: 'CSSRS', value: 'cssrs' }// Aplicacion final
            },
        ];

        const columns = [
            {
                title: 'Aplicación inicial',
                dataIndex: 'name',
                key: 'name',
                render: (_, { name }) => <Button onClick={() => searchEscala({ protocolo: 'depreres', tipo: name.value, momento: 'inicial' })} type='link'>{name.label}</Button>
            },
            {
                title: 'Aplicación final',
                dataIndex: 'age',
                key: 'age',
                render: (_, { age }) => <Button onClick={() => searchEscala({ protocolo: 'depreres', tipo: age.value, momento: 'final' })} type='link'>{age.label}</Button>
            },
            {
                title: 'Inicio de mantenimiento',
                dataIndex: 'address',
                key: 'address',
                render: (_, { address }) => <Button onClick={() => searchEscala({ protocolo: 'depreres', tipo: address.value, momento: 'mant1' })} type='link'>{address?.label}</Button>
            },
            {
                title: 'Final mantenimiento',
                dataIndex: 'address2',
                key: 'address2',
                render: (_, { address2 }) => <Button onClick={() => searchEscala({ protocolo: 'depreres', tipo: address2.value, momento: 'mant2' })} type='link'>{address2?.label}</Button>
            },
        ];


        return <div>
            <h4>Escalas EMT</h4>
            <br />
            <h6>Depresion resistente al tratamiento</h6>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    }

    const TinnitusTable = () => {

        const dataSource = [
            { // Fila 1
                key: '1',
                name: { label: 'Sociodemografico', value: 'Sociodemografico' }, // Aplicacion inicial
                age: { label: 'GAD7', value: 'gad_7' }, // Aplicacion final
            },
            {//Fila 2
                key: '2',
                name: { label: 'GAD7', value: 'gad_7' }, //Aplicacion inicial
                age: { label: 'PHQ9P', value: 'phq9p' }, //Aplicacion final
            },
            {//Fila 3
                key: '3',
                name: { label: 'PHQ9P', value: 'phq9p' }, //Aplicacion inicial
                age: { label: 'THI', value: 'thi' }//Aplicacion final
            },
            {//Fila 4
                key: '4',
                name: { label: 'THI', value: 'thi' },//Aplicacion inicial
                age: { label: 'Satisfaccion', value: 'satisfaccion' }//Aplicacion final
            },
        ];

        const columns = [
            {
                title: 'Aplicación inicial',
                dataIndex: 'name',
                key: 'name',
                render: (_, { name }) => <Button onClick={() => searchEscala({ protocolo: 'Tinnitus', tipo: name.value, momento: 'inicial' })} type='link'>{name.label}</Button>
            },
            {
                title: 'Aplicación final',
                dataIndex: 'age',
                key: 'age',
                render: (_, { age }) => <Button onClick={() => searchEscala({ protocolo: 'Tinnitus', tipo: age.value, momento: 'final' })} type='link'>{age.label}</Button>
            }
        ];


        return <div>
            <h6>TINNITUS</h6>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    }

    const TocTable = () => {

        const dataSource = [
            {//Fila 1
                key: '1',
                name: { label: 'Sociodemografico', value: 'Sociodemografico' }, // Aplicacion inicial
                age: { label: 'DOCS', value: 'docs' }, // Aplicacion final
            },
            {//Fila 2
                key: '2',
                name: { label: 'DOCS', value: 'docs' },// Aplicacion inicial
                age: { label: 'GAD7', value: 'gad_7' },// Aplicacion final
            },
            {//Fila 3
                key: '3',
                name: { label: 'GAD-7', value: 'gad_7' },// Aplicacion inicial
                age: { label: 'PHQ9P', value: 'phq9p' }// Aplicacion final
            },
            {//Fila 4
                key: '4',
                name: { label: 'PHQ9P', value: 'phq9p' },// Aplicacion inicial
                age: { label: 'Satisfaccion', value: 'satisfaccion' }// Aplicacion final
            },
        ];

        const columns = [
            {
                title: 'Aplicación inicial',
                dataIndex: 'name',
                key: 'name',
                render: (_, { name }) => <Button onClick={() => searchEscala({ protocolo: 'Toc', tipo: name.value, momento: 'inicial' })} type='link'>{name.label}</Button>
            },
            {
                title: 'Aplicación final',
                dataIndex: 'age',
                key: 'age',
                render: (_, { age }) => <Button onClick={() => searchEscala({ protocolo: 'Toc', tipo: age.value, momento: 'final' })} type='link'>{age.label}</Button>
            },
        ];

        return <div>
            <h6>Trastorno obsesivo compulsivo (TOC)</h6>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    }

    const AlcoholismoTable = () => {

        const dataSource = [
            {//Fila 1
                key: '1',
                name: { label: 'Sociodemografico', value: 'Sociodemografico' }, // Aplicacion inicial
                age: { label: 'GAD7', value: 'gad_7' }, // Aplicacion final
            },
            {//Fila 2
                key: '2',
                name: { label: 'GAD7', value: 'gad_7' },// Aplicacion inicial
                age: { label: 'PHQ9P', value: 'phq9p' },// Aplicacion final
            },
            {//Fila 3
                key: '3',
                name: { label: 'PHQ9P', value: 'phq9p' },// Aplicacion inicial
                age: { label: 'EMCA', value: 'emca' }// Aplicacion final
            },
            {//Fila 4
                key: '4',
                name: { label: 'EMCA', value: 'emca' },// Aplicacion inicial
                age: { label: 'Satisfaccion', value: 'satisfaccion' }// Aplicacion final
            },
        ];

        const columns = [
            {
                title: 'Aplicación inicial',
                dataIndex: 'name',
                key: 'name',
                render: (_, { name }) => <Button onClick={() => searchEscala({ protocolo: 'Alcoholismo', tipo: name.value, momento: 'inicial' })} type='link'>{name.label}</Button>
            },
            {
                title: 'Aplicación final',
                dataIndex: 'age',
                key: 'age',
                render: (_, { age }) => <Button onClick={() => searchEscala({ protocolo: 'Alcoholismo', tipo: age.value, momento: 'final' })} type='link'>{age.label}</Button>
            },
        ];

        return <div>
            <h6>Alcoholismo</h6>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    }

    const OpioidesTable = () => {

        const dataSource = [
            {//Fila 1
                key: '1',
                name: { label: 'Sociodemografico', value: 'Sociodemografico' }, // Aplicacion inicial
                age: { label: 'GAD7', value: 'gad_7' }, // Aplicacion final
            },
            {//Fila 2
                key: '2',
                name: { label: 'GAD7', value: 'gad_7' },// Aplicacion inicial
                age: { label: 'OWS', value: 'ows' },// Aplicacion final
            },
            {//Fila 3
                key: '3',
                name: { label: 'OWS', value: 'ows' },// Aplicacion inicial
                age: { label: 'PHQ9P', value: 'phq9p' }// Aplicacion final
            },
            {//Fila 4
                key: '4',
                name: { label: 'PHQ9P', value: 'phq9p' },// Aplicacion inicial
                age: { label: 'SOWS', value: 'sows' }// Aplicacion final
            },
            {//Fila 5
                key: '5',
                name: { label: 'SOWS', value: 'sows' },// Aplicacion inicial
                age: { label: 'Satisfaccion', value: 'satisfaccion' }// Aplicacion final
            },
        ];

        const columns = [
            {
                title: 'Aplicación inicial',
                dataIndex: 'name',
                key: 'name',
                render: (_, { name }) => <Button onClick={() => searchEscala({ protocolo: 'Opioides', tipo: name.value, momento: 'inicial' })} type='link'>{name.label}</Button>
            },
            {
                title: 'Aplicación final',
                dataIndex: 'age',
                key: 'age',
                render: (_, { age }) => <Button onClick={() => searchEscala({ protocolo: 'Opioides', tipo: age.value, momento: 'final' })} type='link'>{age.label}</Button>
            },
        ];

        return <div>
            <h6>Opioides</h6>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    }

    const DolorTable = () => {

        const dataSource = [
            {//Fila 1
                key: '1',
                name: { label: 'Sociodemografico', value: 'Sociodemografico' }, // Aplicacion inicial
                age: { label: 'PHQ9P', value: 'phq9p' }, // Aplicacion final
            },
            {//Fila 2
                key: '2',
                name: { label: 'PHQ9P', value: 'phq9p' },// Aplicacion inicial
                age: { label: 'GAD-7', value: 'gad_7' },// Aplicacion final
            },
            {//Fila 3
                key: '3',
                name: { label: 'GAD-7', value: 'gad_7' },// Aplicacion inicial
                age: { label: 'Escala del dolor', value: 'dolor_2' }// Aplicacion final
            },
            {//Fila 4
                key: '4',
                name: { label: 'Escala del dolor', value: 'dolor_2' },// Aplicacion inicial
                age: { label: 'Satisfaccion', value: 'satisfaccion' }// Aplicacion final
            }
        ];

        const columns = [
            {
                title: 'Aplicación inicial',
                dataIndex: 'name',
                key: 'name',
                render: (_, { name }) => <Button onClick={() => searchEscala({ protocolo: 'Dolor', tipo: name.value, momento: 'inicial' })} type='link'>{name.label}</Button>
            },
            {
                title: 'Aplicación final',
                dataIndex: 'age',
                key: 'age',
                render: (_, { age }) => <Button onClick={() => searchEscala({ protocolo: 'Dolor', tipo: age.value, momento: 'final' })} type='link'>{age.label}</Button>
            },
        ];

        return <div>
            <h6>Dolor</h6>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    }

    const EstresPTTable = () => {

        const dataSource = [
            {//Fila 1
                key: '1',
                name: { label: 'Sociodemografico', value: 'Sociodemografico' }, // Aplicacion inicial
                age: { label: 'PCL-5', value: 'pcl_5' }, // Aplicacion final
            },
            {//Fila 2
                key: '2',
                name: { label: 'PCL-5', value: 'pcl_5' },// Aplicacion inicial
                age: { label: 'GAD7', value: 'gad_7' },// Aplicacion final
            },
            {//Fila 3
                key: '3',
                name: { label: 'GAD7', value: 'gad_7' },// Aplicacion inicial
                age: { label: 'PHQ9P', value: 'phq9p' }// Aplicacion final
            },
            {//Fila 4
                key: '4',
                name: { label: 'PHQ9P', value: 'phq9p' },// Aplicacion inicial
                age: { label: 'Satisfaccion', value: 'satisfaccion' }// Aplicacion final
            }
        ];

        const columns = [
            {
                title: 'Aplicación inicial',
                dataIndex: 'name',
                key: 'name',
                render: (_, { name }) => <Button onClick={() => searchEscala({ protocolo: 'estrespt', tipo: name.value, momento: 'inicial' })} type='link'>{name.label}</Button>
            },
            {
                title: 'Aplicación final',
                dataIndex: 'age',
                key: 'age',
                render: (_, { age }) => <Button onClick={() => searchEscala({ protocolo: 'estrespt', tipo: age.value, momento: 'final' })} type='link'>{age.label}</Button>
            },

        ];

        return <div>
            <h6>Estrés Postraumatico</h6>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    }

    if (loading) return <Loading />;

    return (
        <div className='mainContainer'>

            <div style={{display: 'flex', width: '100',flexDirection: 'row', justifyContent: 'space-between'}}>
                <h5>Resultados de escalas</h5>
                <CsvEscalas />
            </div>



            <div className='fila'>
                <Form.Item name="usuario" rules={[{ required: true, message: 'Selecciona el paciente' }]}
                    style={{ alignItems: 'center', paddingTop: 20 }}
                    labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>

                    <Select
                        showSearch
                        filterOption={filterOption}
                        onChange={handlePatientChange}
                        placeholder={<span className='desc'>Selecciona un paciente</span>}
                        value={selectedPatient}
                        style={{ width: 280 }}
                        options={
                            allPacientes.map(p => (
                                {
                                    ...p,
                                    key: p._id,
                                    value: p._id,
                                    label: p.name
                                }
                            ))
                        }
                    />
                </Form.Item>
                <GenerateAllEscalas selectedPatient={selectedPatient} medico={medicosAsignados}/>
            </div>

            {
                patientScalas ?
                    <div>
                        {/* <div>Escalas de {JSON.stringify(selectedPatient)} {JSON.stringify(patientScalas)}</div> */}
                        <DepresionResistenteTable />
                        <TinnitusTable />
                        <TocTable />
                        <AlcoholismoTable />
                        <OpioidesTable />
                        <DolorTable />
                        <EstresPTTable />
                    </div> :
                    <p>Seleccione un paciente de la lista de arriba para ver sus resultados de escalas</p>
            }



            {tipoFound === 'gad_7' && <Gad7Details   {...detailModalParams} />}
            {tipoFound === 'phq9p' && <Phq9pDetails {...detailModalParams} />}
            {tipoFound === 'cssrs' && <CssrsDetails {...detailModalParams} />}
            {tipoFound === 'thi' && <ThiDetails {...detailModalParams} />}
            {tipoFound === 'docs' && <DocsDetails {...detailModalParams} />}
            {tipoFound === 'emca' && <EmcaDetails {...detailModalParams} />}
            {tipoFound === 'ows' && <OwsDetails {...detailModalParams} />}
            {tipoFound === 'sows' && <SowsDetails {...detailModalParams} />}
            {tipoFound === 'dolor_2' && <Dolor2Details {...detailModalParams} />}
            {tipoFound === 'pcl_5' && <Pcl5Details  {...detailModalParams} />}

        </div>
    )
}
