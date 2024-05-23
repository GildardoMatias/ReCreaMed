import React, { useEffect, useState } from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { Pie } from '@ant-design/plots';
import Loading from '../../loading';
import { sendDataBody } from '../../resources';

export default function SatisfacconStats() {

    const data1 = [
        {
            type: 'Si',
            value: 1,
        },
        {
            type: 'no',
            value: 1,
        }
    ];
    const data2 = [
        {
            type: 'Si',
            value: 1,
        },
        {
            type: 'no',
            value: 1,
        }
    ];
    const data3 = [
        {
            type: 'Si',
            value: 1,
        },
        {
            type: 'no',
            value: 1,
        }
    ];

    const config = {
        appendPadding: 2,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        // interactions: [
        //     {
        //         type: 'element-active',
        //     },
        // ],
    };

    const [loading, setLoading] = useState(true);
    const [statisticData, setStatisticData] = useState({})

    useEffect(() => {

        getData()
        // setTimeout(() => {
        //     setLoading(false);
        // }, 2000); 
    }, []);

    const getData = () => {
        sendDataBody('encuestas/satisfaccion/estadisticas', { ids_medicos: ["6459312ad9a3e202b16d6cc7", "63ed3cf981631591d768653f"] }).then(rs => {
            setStatisticData(rs)
        }).finally(() => setLoading(false))
    }

    const Indicator = ({ label, num }) => {
        return <Col span={8}>
            <Card bordered={true}>
                <Statistic
                    title={<span style={{ color: 'black' }}>{label}</span>}
                    value={num}
                    suffix="/17"
                />
            </Card>
        </Col>
    }

    if (loading) return <Loading />

    return (
        <div>
            <h4>Estadisticas encuesta de satisfaccion</h4>
            {/* <p>Stats: {JSON.stringify(statisticData)}</p> */}



            {/* Object.keys(statisticData).length && */}
            <Col>
                <Row gutter={6}>
                    <Indicator label='Total' num={12} />
                    <Indicator label='Pregunta Uno' num={12} />
                    <Indicator label='Pregunta Dos' num={11} />
                </Row> <br />
                <Row gutter={6}>
                    <Indicator label='Pregunta Tres' num={12} />
                    <Indicator label='Pregunta Cuatroi' num={28} />
                    <Indicator label='Pregunta Cinco' num={32} />
                </Row>
            </Col>

            <br />

            <Row gutter={16}>
                <Col >
                    <Card bordered={true}>
                        <Statistic
                            title={<span style={{ color: 'black' }}>Aprobacion</span>}
                            value={0.00}
                            precision={2}
                            valueStyle={{
                                color: '#3f8600',
                            }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={true} >
                        <Statistic
                            title={<span style={{ color: 'black' }}>Desaprobacion</span>}
                            value={0.00}
                            precision={2}
                            valueStyle={{
                                color: '#cf1322',
                            }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
            </Row>

            <br />

            {/* <Row gutter={4}>
                <Col span={8} style={{ height: 220 }}>
                    <h6>¿El servicio ha cumplido con tus expectativas?</h6>
                    <Pie {...config} data={data1} />
                </Col>
                <Col span={8} style={{ height: 220 }}>
                    <h6>¿Has recibido toda la información esperada sobre el tratamiento?</h6>
                    <Pie {...config} data={data2} />
                </Col>
                <Col span={8} style={{ height: 220 }}>
                    <h6>Informacio¿Estás satisfecho/a con la calidad y funcionamiento del tratamiento?</h6>
                    <Pie {...config} data={data3} />
                </Col>
            </Row> */}

            <br />
        </div>
    )
}
