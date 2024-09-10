import { memo, useCallback, useRef, useEffect } from 'react';
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
  const inputRef = useRef(null); // Input alanı için referans oluşturuyoruz

  const onChange = useCallback((evt) => {
    const cursorPosition = evt.target.selectionStart;
    setNodeData((prevData) => ({
      ...prevData,
      label: evt.target.value,
    }));
    requestAnimationFrame(() => {
      inputRef.current.selectionStart = cursorPosition;
      inputRef.current.selectionEnd = cursorPosition;
    });

    autoResizeTextarea();
  }, []);

  const autoResizeTextarea = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
  }
  };

  const onFocus = () => {
    autoResizeTextarea();
  };

  const onBlur = () => {
    autoResizeTextarea(); // Odak kaybedildiğinde de boyutu koru
  };

  // useEffect ile component yeniden render edildiğinde input'a odaklanmayı sağlıyoruz
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      autoResizeTextarea();
    }
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const fontSize = Math.max(16, width / 20); // Örnek olarak genişlik / 20 formülü kullanılmıştır
        inputRef.current.style.fontSize = `${fontSize}px`;
      }
      
    });

    resizeObserver.observe(inputRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [nodeData.label]); // label her değiştiğinde focus yeniden atanır

  const TextUpdater = memo(({ data, onChange }) => {
    const { label } = data;
    return (
      <div className="node-wrapper" >
        <textarea 
          ref={inputRef}
          value={label}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          className="nodrag"
        />
      </div>
    );
  });

  return (
    <>
      <NodeResizeControl style={controlStyle} minWidth={100} minHeight={50}>
        <ResizeIcon />
      </NodeResizeControl>

      <TextUpdater data={nodeData} onChange={onChange} />

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