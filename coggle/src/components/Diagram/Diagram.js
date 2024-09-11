import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { GhostNode, useIncompleteEdge } from './useIncompleteEdge';
import SimpleFloatingEdge from './SimpleFloatingEdge';


import './index.css';

const nodeTypes = {
  ghost: GhostNode,
};

const edgeTypes = {
  floating: SimpleFloatingEdge,
};

const initialNodes = [
  { id: '1', type: 'input', data: { label: 'A' }, position: { x: 0, y: -100 } },
  { id: '2', type: 'output', data: { label: 'B' }, position: { x: 0, y: 100 } },
];

const initialEdges = [
  {
    id: '1-2',
    source: '1',
    target: '2',
    sourceHandle: 'c',
    targetHandle: 'a',
    type: 'floating',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

const fitViewOptions = { padding: 4 };

const IncompleteEdge = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const handlers = useIncompleteEdge();

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'floating',
            markerEnd: { type: MarkerType.Arrow },
          },
          eds,
        ),
      ),
    [],
  );

  return (
    <div className='simple-floatingedges' style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      edgeTypes={edgeTypes}
      onConnect={onConnect}
      connectionMode={ConnectionMode.Loose}
      fitViewOptions={fitViewOptions}
      fitView
      {...handlers}
    />
    </div>
    
  );
};

export default () => (
  <ReactFlowProvider>
    <IncompleteEdge />
  </ReactFlowProvider>
);
