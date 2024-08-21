import React, { Component } from 'react'
import { Row, Col, Statistic, Card } from 'antd'
// import { Pie, Line } from '@ant-design/charts';
import './home.css'

export class Home extends Component {

    dataPie = [
        {
            type: 'F01',
            value: 9,
        },
        {
            type: 'F05',
            value: 4,
        },
        {
            type: 'F09',
            value: 7,
        },
        {
            type: 'F13',
            value: 2,
        },
        {
            type: 'F16',
            value: 12,
        },
        {
            type: 'F22',
            value: 3,
        },
    ];

    configPie = {
        appendPadding: 10,
        data: this.dataPie,
        angleField: 'value',
        colorField: 'type',
        height: 450,
        radius: 0.8,
        label: {
            type: 'inner',
            offset: '-0.5',
            content: '{name} {percentage}',
            style: {
                fill: '#fff',
                fontSize: 14,
                textAlign: 'center',
            },
        },
    };

    dataLine = [
        { mes: 'Junio', consultas: 24 },
        { mes: 'Julio', consultas: 17 },
        { mes: 'Agosto', consultas: 22 },
        { mes: 'Septiembre', consultas: 15 },
        { mes: 'Octubre', consultas: 18 }
    ];

    configLine = {
        data: this.dataLine,
        height: 410,
        xField: 'mes',
        yField: 'consultas',
        color: '#01B075',
        point: {
            size: 5,
            shape: 'diamond',
            color: '#01B075'
        },
        label: {
            style: {
                fill: '#aaa',
                fontSize: 16,
                stroke: '#01B075'
            },
        },
    };
    render() {
        return (
            <>

                <br />
                <div className="contenedor">
                    <Row gutter={30}>
                        <Col xs={24} sm={12} lg={6}>
                            <Card className="cardsContenedor" hoverable bordered={false}>
                                <Statistic title="Total Hospitales" value="4" valueStyle={{ color: 'white' }} style={{ backgroundColor: '#4BA6FE', borderRadius: 12 }} className="cardsContenido" />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card className="cardsContenedor" hoverable bordered={false}>
                                <Statistic title="Total Médicos" value="14" valueStyle={{ color: 'white' }} style={{ backgroundColor: '#FF838A', borderRadius: 12 }} className="cardsContenido" />
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} lg={6}>
                            <Card className="cardsContenedor" hoverable bordered={false}>
                                <Statistic title="Total Pacientes" value="241" valueStyle={{ color: 'white' }} style={{ backgroundColor: '#18D0C2', borderRadius: 12 }} className="cardsContenido" />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card className="cardsContenedor" hoverable bordered={false}>
                                <Statistic title="Citas Hoy" value={47} valueStyle={{ color: 'white' }} style={{ backgroundColor: '#847DFC', borderRadius: 12 }} className="cardsContenido" />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} md={12} style={{textAlign:'center'}}>
                            <h5 style={{color: '#1F263C'}}>Diagnosticos</h5>
                        </Col>
                        <Col xs={24} md={12} style={{textAlign:'center'}}>
                            <h5>Citas</h5>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} md={12} className="graficaCircular">
                            {/* <Pie {...this.configPie} style={{ backgroundColor: '#1F263C', borderRadius: 12 }} /> */}
                        </Col>

                        <Col xs={24} md={12}>
                            {/* <Line {...this.configLine} style={{ backgroundColor: '#1F263C', padding: '20px', borderRadius: 12 }} /> */}
                        </Col>
                    </Row>

                </div>

            </>
        )
    }
}

export default Home
