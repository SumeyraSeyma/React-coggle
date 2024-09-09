import { memo, useCallback } from 'react';
import { Handle, Position, NodeResizeControl } from '@xyflow/react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const controlStyle = {
  background: 'transparent',
  border: 'none',
};

const CustomNode = ({ data, isConnectable }) => {
  const [nodeData, setNodeData] = useState(data);

  const onChange = useCallback((evt) => {
    setNodeData({ ...nodeData, label: evt.target.value });
  }, []);

  return (
    <>
      <NodeResizeControl style={controlStyle} minWidth={100} minHeight={50}>
        <ResizeIcon />
      </NodeResizeControl>

      <div className="node-wrapper" style={{
        background: '#FFF',
        border: '1px solid #CCC',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
        height: '50px',
        position: 'relative'
      }}>
        <input type="text" value={data.label} onChange={onChange} className="nodrag" style={{
          width: '90%',
          border: 'none',
          textAlign: 'center',
        }} />
      </div>

      {/* FontAwesome icons as handles around the node */}
      {['Left', 'Right', 'Top', 'Bottom'].map(pos => (
        <Handle
          key={pos}
          type="source"
          position={Position[pos]}
          className="handle-icon"
          isConnectable={isConnectable}
          style={{ background: 'none', border: 'none', color: 'gray' }}
        >
          <FontAwesomeIcon icon={faCirclePlus} />
        </Handle>
      ))}
    </>
  );
};

function ResizeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#ff0071"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ position: 'absolute', right: 5, bottom: 5 }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="16 20 20 20 20 16" />
      <line x1="14" y1="14" x2="20" y2="20" />
      <polyline points="8 4 4 4 4 8" />
      <line x1="4" y1="4" x2="10" y2="10" />
    </svg>
  );
}

export default memo(CustomNode);
