import React, { memo, useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';


const generateHandleId = (id, position) => `${id}-${position}`;



export default memo(({ id, data,isConnectable }) => {
  const onChange = useCallback((evt) => {
    console.log('Node change', evt.target.value);
    
  }, []);
    return (
      <>
        {data.label}
        <Handle type="source" position={Position.Top} id={generateHandleId(id, 'top')} isConnectable={isConnectable} />
        <div>
          <label htmlFor="text">Text:</label>
        <input id="text"  placeholder='text' name="text" onChange={onChange} className="nodrag" />
      </div>
        <Handle type="source" position={Position.Right} id={generateHandleId(id, 'right')} isConnectable={isConnectable} />
        <Handle type="source" position={Position.Bottom} id={generateHandleId(id, 'bottom')} isConnectable={isConnectable} />
        <Handle type="source" position={Position.Left} id={generateHandleId(id, 'left')} isConnectable={isConnectable} />
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