import React, { useState } from 'react';
import { Button, Modal } from 'antd';

export default function GenerateAllEscalas({ selectedPatient }) {

    const usr = '64D91815JKL3169OH80017'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    let l = `https://sistema.recreamed.com/gad_7_public/${usr}/${selectedPatient}/${Date.now()}/depreres/inicial`
    let l2 = `https://sistema.recreamed.com/gad_7_public/${usr}/${selectedPatient}/${Date.now()}/depreres/final`

    let l3 = `https://sistema.recreamed.com/phq9p_public/${usr}/${selectedPatient}/${Date.now()}/depreres/inicial`
    let l4 = `https://sistema.recreamed.com/phq9p_public/${usr}/${selectedPatient}/${Date.now()}/depreres/final`

    let l5 = `https://sistema.recreamed.com/cssrs_public/${usr}/${selectedPatient}/${Date.now()}/depreres/inicial`
    let l6 = `https://sistema.recreamed.com/cssrs_public/${usr}/${selectedPatient}/${Date.now()}/depreres/final`

    let l7 = `https://sistema.recreamed.com/thi_public/${usr}/${selectedPatient}/${Date.now()}/depreres/inicial`
    let l8 = `https://sistema.recreamed.com/thi_public/${usr}/${selectedPatient}/${Date.now()}/depreres/final`

    let l9 = `https://sistema.recreamed.com/docs_public/${usr}/${selectedPatient}/${Date.now()}/depreres/inicial`
    let l10 = `https://sistema.recreamed.com/docs_public/${usr}/${selectedPatient}/${Date.now()}/depreres/final`

    return (
        <div>
            <Button disabled={!selectedPatient} ghost type="primary" onClick={showModal}>
                Generar escalas
            </Button>
            <Modal title="Nuevas escalas" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={700}>
                <span>{l}</span> <br /><br />
                <span>{l2}</span><br /><br />
                <span>{l3}</span> <br /><br />
                <span>{l4}</span><br /><br />
                <span>{l5}</span> <br /><br />
                <span>{l6}</span><br /><br />
                <span>{l7}</span> <br /><br />
                <span>{l8}</span><br /><br />
                <span>{l9}</span> <br /><br />
                <span>{l10}</span><br /><br />
            </Modal>
        </div>
    )
}
