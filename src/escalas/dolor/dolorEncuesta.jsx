import React from 'react'
import { dolor_catalog } from './dolor_catalog';
import { Form, Input, Button, Slider, Checkbox, Radio } from 'antd';

export default function DolorEncuesta() {

    const plainOptions = ['Apple', 'Pear', 'Orange'];

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    return (
        <div className='mainContainer'>
            <h4>Encuesta de Dolor</h4>

            <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {
                    dolor_catalog.map((p) => {
                        let input;
                        switch (p.tipo) {
                            case 'metrica':
                                input = <Slider defaultValue={0} min={0} max={10} />
                                break;
                            case 'multiple':
                                input = <Checkbox.Group options={p.respuestas} defaultValue={['Apple']} onChange={onChange} />
                                break;
                            case 'seleccion':
                                input = <Radio.Group>
                                    {p.respuestas.map((r, i) => { return <Radio value={i}>{r}</Radio> })}
                                </Radio.Group>;
                                break;
                            case 'seleccion_boleana':
                                input = <Checkbox.Group options={p.respuestas} defaultValue={['Apple']} onChange={onChange} />
                                break;
                            case 'texto':
                                input = < Input />;
                                break;
                            default:
                                input = < Input />;
                        }

                        return p.tipo !== 'titulo' ? <Form.Item
                            label={p.n + '. ' + p.pregunta}
                            name={p.n}
                            rules={[{ required: true, message: 'Conteste correctamente' }]}
                        >
                            {input}
                        </Form.Item> : <h5>{`${p.n}.  ${p.pregunta}`}</h5>
                    })
                }


                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
