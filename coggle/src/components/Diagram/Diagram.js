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
const nodeTypes = { customResizer: CustomResizerNode };

 
const initialNodes = [
  { 
    id: '1', 
    position: { x: 0, y: 0 },
    type: 'customResizer', 
    data: { label: '1' },
    style: {
        background: '#fff',
        fontSize: 12,
        border: '1px solid black',
        padding: 25,
        borderRadius: 15,
        height: 100,
      },
 },

  { 
    id: '2', 
    position: { x: 0, y: 100 },
    type: 'customResizer',
    data: { label: '2' },
    style: {
        background: '#fff',
        fontSize: 12,
        border: '1px solid black',
        padding: 25,
        borderRadius: 15,
        height: 100,
      },
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
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}