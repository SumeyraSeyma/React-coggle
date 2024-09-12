import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const generateHandleId = (id, position) => `${id}-${position}`;

export default memo(({ id, data }) => {
    return (
      <>
        {data.label}
        <Handle type="source" position={Position.Top} id={generateHandleId(id, 'top')} />
        <Handle type="source" position={Position.Right} id={generateHandleId(id, 'right')} />
        <Handle type="source" position={Position.Bottom} id={generateHandleId(id, 'bottom')} />
        <Handle type="source" position={Position.Left} id={generateHandleId(id, 'left')} />
      </>
    );
  });
  

export const GhostNode = () => (
    <div style={{ width: 5, height: 5 }}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={false}
        style={{ background: '#aaa' }}
      />
    </div>
  );