import React from 'react'
import { Spin } from 'antd';

export default function Loading() {
    return (
        <div style={{
            margin: '20px 0',
            marginBottom: '20px',
            padding: '30px 50px',
            textAlign: 'center',
            background: 'rgba(0, 0, 0, 0.05)',
            borderRadius: '4px',
        }}>
            <Spin />
        </div >
    )
}
