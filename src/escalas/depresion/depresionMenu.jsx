import React from 'react'
import { Tabs } from 'antd';
import DepresionResults  from './depresion_1/depresionResults';
import Depresion2Results from './depresion_2/depresion2_results';

export default function DepresionMenu() {
  const items = [
    { label: 'Depresion 1', key: 'item-1', children: <DepresionResults/> }, // remember to pass the key prop
    { label: 'Depresion 2', key: 'item-2', children: <Depresion2Results/> },
  ];
  return (
    <div>
      <h4>DepresionMenu</h4>
      <Tabs items={items} />
    </div>
  )
}
