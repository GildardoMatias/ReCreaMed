import React, { useState, useEffect } from 'react';
import { Button, Modal, Select, message, Card } from 'antd';
import { getData, ids_hospitales } from '../../resources';


export default function GenerateAllEscalas({ selectedPatient, medico }) {

    const [medicosData, setMedicosData] = useState({})
    const [selectedMedico, setSelectedMedico] = useState(null)

    useEffect(() => {
        const getAllMedicos = async () => {

            await getData(`users/hospital/${ids_hospitales[0]}`).then(rs => {
                const medicos = rs.map(med => ({
                    value: med._id,
                    label: med.name
                }))
                setMedicosData(medicos)
            })
        }
        getAllMedicos()


    }, [])


    const handleDoctorChange = (value) => { setSelectedMedico(value) };



    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        setSelectedMedico(null)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedMedico(null)
    };


    const NewLink = ({ label, tipo, prot, mom }) => {

        const idm = medico ? medico : selectedMedico;

        const l = `https://sistema.recreamed.com/${tipo}_public/${idm}/${selectedPatient}/${Date.now()}/${prot}/${mom}`;
        // const l = `http://localhost:3000/${tipo}_public/${idm}/${selectedPatient}/${Date.now()}/${prot}/${mom}`;
        return <div>
            <Card size='small' bordered={false}>
                <Card.Grid onClick={() => copyLink(l)} style={{ border: '1px solid white', borderRadius: 8, padding: 8, width: '100%', cursor: 'pointer' }} hoverable>
                    <span style={{ color: '#5fa1c4' }}>{label}</span> <br />
                    {/* {l} */}
                </Card.Grid>
            </Card>
        </div>
    }

    const copyLink = (link) => {
        navigator.clipboard.writeText(link)
        message.success('Enlace Copiado al Portapapeles!')
    }

    return (
        <div>
            <Button disabled={!selectedPatient} ghost type="primary" onClick={showModal}>
                Generar escalas
            </Button>
            <Modal title="Nuevas escalas" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={500} destroyOnClose >

                {
                    medico ? <></> : <Select
                        showSearch
                        onChange={handleDoctorChange}
                        placeholder={<span className='desc'>Seleccione un médico</span>}
                        options={medicosData}
                        style={{ width: 300 }}
                    />
                }


                {/* <div>Patient: {selectedPatient}</div>
                <div>Medico: {medico}</div> */}

                {/* <div>Medicos Data : {JSON.stringify(medicosData)}</div>
                <div>Medico Seleccionado : {selectedMedico}</div> */}

                {
                    (medico || selectedMedico) && <div>

                        <div style={{ marginTop: 8 }}>
                            <span className='nombre'>Depresion Resistente al Tratamiento</span><br />
                        </div>
                        <div style={{ marginTop: 6 }}>
                            <span className='datos'>Aplicacion inicial</span>
                            <NewLink label='GAD-7' tipo='gad_7' prot='depreres' mom='inicial' />
                            <NewLink label='PHQ9P' tipo='phq9p' prot='depreres' mom='inicial' />
                            <NewLink label='C-SSRS' tipo='cssrs' prot='depreres' mom='inicial' />
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <span className='datos'>Aplicacion final</span>
                            <NewLink label='GAD-7' tipo='gad_7' prot='depreres' mom='final' />
                            <NewLink label='PHQ9P' tipo='phq9p' prot='depreres' mom='final' />
                            <NewLink label='Satisfaccion' tipo='satisfaccion' prot='depreres' mom='final' />
                            <NewLink label='C-SSRS' tipo='cssrs' prot='depreres' mom='final' />
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <span className='datos'>Aplicacion Inicio Mantenimiento</span>
                            <NewLink label='GAD-7' tipo='gad_7' prot='depreres' mom='mant1' />
                            <NewLink label='PHQ9P' tipo='phq9p' prot='depreres' mom='mant1' />
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <span className='datos'>Aplicacion Final Mantenimiento</span>
                            <NewLink label='GAD-7' tipo='gad_7' prot='depreres' mom='mant2' />
                            <NewLink label='PHQ9P' tipo='phq9p' prot='depreres' mom='mant2' />
                        </div>


                        <div style={{ marginTop: 10 }}>
                            <span className='nombre'>Tinnitus</span><br />
                        </div>
                        <div style={{ marginTop: 6 }}>
                            <span className='datos'>Aplicacion inicial</span>
                            <NewLink label='GAD-7' tipo='gad_7' prot='Tinnitus' mom='inicial' />
                            <NewLink label='PHQ9P' tipo='phq9p' prot='Tinnitus' mom='inicial' />
                            <NewLink label='THI' tipo='thi' prot='Tinnitus' mom='inicial' />
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <span className='datos'>Aplicacion final</span>
                            <NewLink label='GAD-7' tipo='gad_7' prot='Tinnitus' mom='final' />
                            <NewLink label='PHQ9P' tipo='phq9p' prot='Tinnitus' mom='final' />
                            <NewLink label='THI' tipo='thi' prot='Tinnitus' mom='final' />
                            <NewLink label='Satisfaccion' tipo='satisfaccion' prot='Tinnitus' mom='final' />
                        </div>


                        <div style={{ marginTop: 10 }}>
                            <span className='nombre'>Trastorno Obsesivo Compulsivo (TOC)</span><br />
                        </div>
                        <div style={{ marginTop: 6 }}>
                            <span className='datos'>Aplicacion inicial</span>
                            <NewLink label='DOCS' tipo='docs' prot='Toc' mom='inicial' />
                            <NewLink label='GAD-7' tipo='gad_7' prot='Toc' mom='inicial' />
                            <NewLink label='PHQ9P' tipo='phq9p' prot='Toc' mom='inicial' />
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <span className='datos'>Aplicacion final</span>
                            <NewLink label='DOCS' tipo='docs' prot='Toc' mom='final' />
                            <NewLink label='GAD-7' tipo='gad_7' prot='Toc' mom='final' />
                            <NewLink label='PHQ9P' tipo='phq9p' prot='Toc' mom='final' />
                            <NewLink label='Satisfaccion' tipo='satisfaccion' prot='Toc' mom='final' />
                        </div>


                        <div style={{ marginTop: 10 }}>
                            <span className='nombre'>Alcoholismo</span><br />
                        </div>
                        <div style={{ marginTop: 6 }}>
                            <span className='datos'>Aplicacion inicial</span>
                            <NewLink label='GAD-7' tipo='gad_7' prot='Alcoholismo' mom='inicial' />
                            <NewLink label='PHQ9P' tipo='phq9p' prot='Alcoholismo' mom='inicial' />
                            <NewLink label='EMCA' tipo='emca' prot='Alcoholismo' mom='inicial' />
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <span className='datos'>Aplicacion final</span>
                            <NewLink label='GAD-7' tipo='gad_7' prot='Alcoholismo' mom='final' />
                            <NewLink label='PHQ9P' tipo='phq9p' prot='Alcoholismo' mom='final' />
                            <NewLink label='EMCA' tipo='emca' prot='Alcoholismo' mom='final' />
                            <NewLink label='Satisfaccion' tipo='satisfaccion' prot='Alcoholismo' mom='final' />
                        </div>


                        <div style={{ marginTop: 10 }}>
                            <span className='nombre'>Opioides</span><br />
                        </div>
                        <div style={{ marginTop: 6 }}>
                            <span className='datos'>Aplicacion inicial</span>
                            <NewLink label='GAD-7' tipo='gad_7' prot='Opioides' mom='inicial' />
                            <NewLink label='OWS' tipo='ows' prot='Opioides' mom='inicial' />
                            <NewLink label='PHQ9P' tipo='phq9p' prot='Opioides' mom='inicial' />
                            <NewLink label='SOWS' tipo='sows' prot='Opioides' mom='inicial' />
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <span className='datos'>Aplicacion final</span>
                            <NewLink label='GAD-7' tipo='gad_7' prot='Opioides' mom='final' />
                            <NewLink label='OWS' tipo='ows' prot='Opioides' mom='final' />
                            <NewLink label='PHQ9P' tipo='phq9p' prot='Opioides' mom='final' />
                            <NewLink label='SOWS' tipo='sows' prot='Opioides' mom='final' />
                            <NewLink label='Satisfaccion' tipo='satisfaccion' prot='Opioides' mom='final' />
                        </div>


                        <div style={{ marginTop: 10 }}>
                            <span className='nombre'>Dolor</span><br />
                        </div>
                        <div style={{ marginTop: 6 }}>
                            <span className='datos'>Aplicacion inicial</span>
                            <NewLink label='PHQ9P' tipo='phq9p' prot='Dolor' mom='inicial' />
                            <NewLink label='GAD-7' tipo='gad_7' prot='Dolor' mom='inicial' />
                            <NewLink label='Escala del dolor' tipo='dolor_2' prot='Dolor' mom='inicial' />
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <span className='datos'>Aplicacion final</span>
                            <NewLink label='PHQ9P' tipo='phq9p' prot='Dolor' mom='final' />
                            <NewLink label='GAD-7' tipo='gad_7' prot='Dolor' mom='final' />
                            <NewLink label='Escala del dolor' tipo='dolor_2' prot='Dolor' mom='final' />
                            <NewLink label='Satisfaccion' tipo='satisfaccion' prot='Dolor' mom='final' />
                        </div>


                        <div style={{ marginTop: 10 }}>
                            <span className='nombre'>Estrés Postraumatico</span><br />
                        </div>
                        <div style={{ marginTop: 6 }}>
                            <span className='datos'>Aplicacion inicial</span>
                            <NewLink label='PCL-5' tipo='pcl_5' prot='estrespt' mom='inicial' />
                            <NewLink label='GAD-7' tipo='gad_7' prot='estrespt' mom='inicial' />
                            <NewLink label='PHQ9P' tipo='phq9p' prot='estrespt' mom='inicial' />
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <span className='datos'>Aplicacion final</span>
                            <NewLink label='PCL-5' tipo='pcl_5' prot='estrespt' mom='final' />
                            <NewLink label='GAD-7' tipo='gad_7' prot='estrespt' mom='final' />
                            <NewLink label='PHQ9P' tipo='phq9p' prot='estrespt' mom='final' />
                            <NewLink label='Satisfaccion' tipo='satisfaccion' prot='estrespt' mom='final' />
                        </div>

                        <br />

                    </div>
                }


            </Modal>
        </div>
    )
}
