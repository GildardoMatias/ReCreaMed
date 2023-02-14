import React, { Component } from 'react'
import { Row, Col, Statistic, Card } from 'antd'
// import { Pie, Line } from '@ant-design/charts';
import './home.css'

export class Home extends Component {
    
    dataPie = [
        {
            type: 'Covid',
            value: 130737,
        },
        {
            type: 'Colesterol',
            value: 21468,
        },
        {
            type: 'Diabetes',
            value: 18098,
        },
        {
            type: 'Presion',
            value: 17912,
        },
        {
            type: 'Oseo',
            value: 15282,
        },
        {
            type: 'Migraña',
            value: 11650,
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
        { mes: 'Junio', consultas: 17945 },
        { mes: 'Julio', consultas: 24011 },
        { mes: 'Agosto', consultas: 46493 },
        { mes: 'Septiembre', consultas: 105293 },
        { mes: 'Octubre', consultas: 77190 }
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
                            {/* <div className="cardsContenedor" > */}
                            <Card className="cardsContenedor" hoverable bordered={false}>

                                <Statistic title="Total Hospitales" value="4" valueStyle={{ color: 'white' }} style={{ backgroundColor: '#4BA6FE' }} className="cardsContenido" />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card className="cardsContenedor" hoverable bordered={false}>
                                <Statistic title="Total Medicos" value="14" valueStyle={{ color: 'white' }} style={{ backgroundColor: '#FF838A' }} className="cardsContenido" />
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} lg={6}>
                            <Card className="cardsContenedor" hoverable bordered={false}>

                                <Statistic title="Total Pacientes" value="241" valueStyle={{ color: 'white' }} style={{ backgroundColor: '#18D0C2' }} className="cardsContenido" />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card className="cardsContenedor" hoverable bordered={false}>

                                <Statistic title="Citas Hoy" value={47} valueStyle={{ color: 'white' }} style={{ backgroundColor: '#847DFC' }} className="cardsContenido" />
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={20}>
                        <Col xs={24} md={12} className="graficaCircular">
                            {/* <Pie {...this.configPie} style={{ backgroundColor: '#1F263C' }} /> */}
                        </Col>

                        <Col xs={24} md={12}>
                            {/* <Line {...this.configLine} style={{ backgroundColor: '#1F263C', padding: '20px' }} /> */}
                        </Col>
                    </Row>

                </div>

            </>
        )
    }
}

export default Home
