import React from 'react'
import { Row, Col } from 'antd'

const cardStyle = { color: 'white', fontFamily: 'Poppins', width: 145, height: 130, padding: 16, borderRadius: 8 }
export default function Home() {
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: 20 }}>


            <div style={{ width: '50%' }}>
                <br />
                <span className='nombre'>Administrador</span>
                <br />
                <span className='datos'>Hospital</span>

                <br />
                <br />

                <Row gutter={30}>
                    <Col>
                        <div style={{ ...cardStyle, backgroundColor: '#71357b' }}>
                            <div style={{ fontSize: 16, fontWeight: '400' }}>Total médicos</div>
                            <div style={{ fontSize: 22, fontWeight: '500', display: 'flex', justifyContent: 'flex-end' }}>512</div>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ ...cardStyle, backgroundColor: '#95d0d4' }}>
                            <div style={{ fontSize: 16, fontWeight: '400' }}>Total pacientes</div>
                            <div style={{ fontSize: 22, fontWeight: '500', display: 'flex', justifyContent: 'flex-end' }}>512</div>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ ...cardStyle, backgroundColor: '#fe7e51' }}>
                            <div style={{ fontSize: 16, fontWeight: '400' }}>Total recepcionistas</div>
                            <div style={{ fontSize: 22, fontWeight: '500', display: 'flex', justifyContent: 'flex-end' }}>512</div>
                        </div>
                    </Col>
                </Row>


                <br />
                <br />


                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <div style={{ width: '50%' }}>
                        <span className='desc'>Estadisticas de hoy</span>

                        <div style={{ width: 240, height: 80, borderRadius: 12, marginTop: 12, display: 'flex', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)' }}>
                            <div style={{ width: 12, backgroundColor: '#FF6B6B', borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}></div>
                            <div style={{ padding: 12, width: 228 }}>
                                <div>
                                    Pacientes registrados hoy
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>35</div>
                            </div>
                        </div>

                        <div style={{ width: 240, height: 80, borderRadius: 12, marginTop: 12, display: 'flex', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)' }}>
                            <div style={{ width: 12, backgroundColor: '#6a3873', borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}></div>
                            <div style={{ padding: 12, width: 228 }}>
                                <div>
                                    Ingresos hoy
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>$3500</div>
                            </div>
                        </div>

                        <div style={{ width: 240, height: 80, borderRadius: 12, marginTop: 12, display: 'flex', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)' }}>
                            <div style={{ width: 12, backgroundColor: '#91cdcd', borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}></div>
                            <div style={{ padding: 12, width: 228 }}>
                                <div>
                                    Ingresos ayer
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>$2500</div>
                            </div>
                        </div>

                        <div style={{ width: 240, height: 80, borderRadius: 12, marginTop: 12, display: 'flex', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)' }}>
                            <div style={{ width: 12, backgroundColor: '#0d6efd', borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}></div>
                            <div style={{ padding: 12, width: 228 }}>
                                <div>
                                    Citas hoy
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>28</div>
                            </div>
                        </div>

                    </div>


                    <div style={{ width: '50%' }}>
                        <span className='desc'>Ingresos</span>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
                            <div style={{ backgroundColor: '#f5f5f5', width: 120, height: 120, borderRadius: 12, marginTop: 12, padding: 12 }}>
                                <div style={{ color: '#0d6efd' }}>$1200</div>
                                <div>Ésta semana</div>
                            </div>
                            <div style={{ backgroundColor: '#f5f5f5', width: 120, height: 120, borderRadius: 12, marginTop: 12, padding: 12 }}>
                                <div>$1500</div>
                                <div>Éste més</div>
                            </div>
                        </div>

                        <span className='desc'>Gastos</span>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
                            <div style={{ backgroundColor: '#f5f5f5', width: 120, height: 120, borderRadius: 12, marginTop: 12, padding: 12 }}>
                                <div style={{ color: '#0d6efd' }}>$1200</div>
                                <div>Ésta semana</div>
                            </div>
                            <div style={{ backgroundColor: '#f5f5f5', width: 120, height: 120, borderRadius: 12, marginTop: 12, padding: 12 }}>
                                <div>$1500</div>
                                <div>Éste més</div>
                            </div>
                        </div>

                        <span className='desc'>Pcientse por médico</span>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
                            <div style={{ backgroundColor: '#f5f5f5', width: 80, height: 80, borderRadius: 12, marginTop: 12 }}>
                                <span>MiniCard</span>
                            </div>
                            <div style={{ backgroundColor: '#f5f5f5', width: 80, height: 80, borderRadius: 12, marginTop: 12 }}>
                                <span>MiniCard</span>
                            </div>
                            <div style={{ backgroundColor: '#f5f5f5', width: 80, height: 80, borderRadius: 12, marginTop: 12 }}>
                                <span>MiniCard</span>
                            </div>
                        </div>


                        <span className='desc'>Servicios y colores</span>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
                            <div style={{ backgroundColor: 'green', width: 80, height: 80, borderRadius: 12, marginTop: 12 }}>
                                <span>MiniCard</span>
                            </div>
                            <div style={{ backgroundColor: 'green', width: 80, height: 80, borderRadius: 12, marginTop: 12 }}>
                                <span>MiniCard</span>
                            </div>
                            <div style={{ backgroundColor: 'green', width: 80, height: 80, borderRadius: 12, marginTop: 12 }}>
                                <span>MiniCard</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}