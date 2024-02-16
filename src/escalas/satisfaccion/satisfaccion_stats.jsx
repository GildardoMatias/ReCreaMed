import React from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

export default function SatisfacconStats() {
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
        </div>
    )
}
