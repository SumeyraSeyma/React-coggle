import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import CustomResizerNode from './CustomResizerNode';
import { text } from '@fortawesome/fontawesome-svg-core';
const nodeTypes = { customResizer: CustomResizerNode };

 
const initialNodes = [
  { 
    id: '1', 
    position: { x: 0, y: 0 },
    type: 'customResizer', 
    data: { label: '1' },
   
 },

  { 
    id: '2', 
    position: { x: 0, y: 100 },
    type: 'customResizer',
    data: { label: '2' },
    text:'text'
 },
];
const initialEdges = [];
 
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
        <button
        onClick={() =>{
            setNodes((nodes) => [
                ...nodes,
                {
                    id: (nodes.length + 1).toString(),
                    position: { x: 0, y: 0 },
                    data: { label: (nodes.length + 1).toString() },
                    type: 'customResizer',
                    style: {
                        display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '200px', // Genişlik ayarı
      height: '50px', // Yükseklik ayarı
      border: '2px solid gray', // Kenarlık stili
      borderRadius: '10px', // Kenar yuvarlaklığı
      background: 'white', // Arka plan rengi
      boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' // Gölge efekti
                      },
                },
            ]);
        }}
        >
            Add Node
        </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}