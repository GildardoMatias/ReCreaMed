import React from 'react'
import { Tabs } from 'antd';
import PostTraumaticoResults from './post_traumatico/p_t_results';
import PostTraumaticoClinicoResults from './p_t_clinico/p_t_clinico_results';
import PostTraumaticoMexicanaResults from './p_t_mexicana/p_t_mexicana_results';

export default function PostTraumaticoMenu() {
  const items = [
    { label: 'EPT 1', key: 'item-1', children: <PostTraumaticoResults/> }, 
    { label: 'EPT 2', key: 'item-2', children: <PostTraumaticoClinicoResults/> },
    { label: 'EPT 3', key: 'item-3', children: <PostTraumaticoMexicanaResults/>},
  ]
  return (
    <div>
      <Tabs items={items} />
    </div>
  )
}
