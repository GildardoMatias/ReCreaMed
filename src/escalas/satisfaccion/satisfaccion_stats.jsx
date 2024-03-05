import React from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { Pie } from '@ant-design/plots';

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

    return (
        <div>
            <h4>Estadisticas</h4>
            <Row gutter={16}>
                <Col span={12}>
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

            <Row gutter={4}>
                <Col span={8} style={{ height: 220 }}>
                    <h6>¿El servicio ha cumplido con tus expectativas?</h6>
                    <Pie {...config} data={data1} />
                </Col>
                <Col span={8} style={{ height: 220}}>
                    <h6>¿Has recibido toda la información esperada sobre el tratamiento?</h6>
                    <Pie {...config} data={data2} />
                </Col>
                <Col span={8} style={{ height: 220 }}>
                    <h6>Informacio¿Estás satisfecho/a con la calidad y funcionamiento del tratamiento?</h6>
                    <Pie {...config} data={data3} />
                </Col>
            </Row>

            <br />
        </div>
    )
}
