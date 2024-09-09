import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from '@xyflow/react';
import TextUpdaterNode from './TextUpdaterNode';
 
import '@xyflow/react/dist/style.css';
 
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' },type: 'textUpdater' },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' },type: 'textUpdater' },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

 
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodeTypes = { textUpdater: TextUpdaterNode };
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeChange = useCallback(
    (node) => {
      setNodes((nodes) => applyNodeChanges(node, nodes));
    },
    [setNodes],
  );

  const onEdgeChange = useCallback(
    (edge) => {
      setEdges((edges) => applyEdgeChanges(edge, edges));
    },
    [setEdges],
  );
  
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodeChange}
        onEdgesChange={onEdgeChange}
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