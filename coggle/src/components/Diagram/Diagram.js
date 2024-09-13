import React, { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  reconnectEdge,
  useReactFlow,
  MarkerType,
  ConnectionMode,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';



import SimpleFloatingEdge from './SimpleFloatingEdge';
import CustomNode from './CustomNode';
import { GhostNode } from './CustomNode';

import './index.css';
const generateHandleId = (nodeId, handleType) => `${nodeId}-${handleType}`;

const nodeTypes = {
  ghost: GhostNode,
  custom: CustomNode,
};

const edgeTypes = {
  floating: SimpleFloatingEdge,
};



export function useIncompleteEdge() {
  const { setNodes, setEdges, screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges],
  );
  

  const onConnectEnd = useCallback(
    (event, connectionState) => {
      console.log('onConnectEnd', connectionState);
      console.log('fromHandle', connectionState.fromHandle);
      if (
        connectionState.isValid ||
        connectionState.fromHandle.type === 'target'
      ) {
        console.log('Exiting on valid connection or target handle');
        return;
      }

      const fromNodeId = connectionState.fromNode.id;
      const id = `ghost-${Date.now()}`;
      const { clientX, clientY } =
        'changedTouches' in event ? event.changedTouches[0] : event;
      const newNode = {
        id,
        type: 'ghost',
        position: screenToFlowPosition({
          x: clientX,
          y: clientY,
        }),
        data: {},
      };

      console.log('New Ghost Node:', newNode);

      const newEdge = {
        id: `${fromNodeId}->${id}`,
        source: fromNodeId,
        target: id,
        reconnectable: 'target',
      };
      console.log('New Edge:', newEdge);

      setNodes((nodes) => nodes.concat(newNode));
      setEdges((edges) => addEdge(newEdge, edges));
    },
    [setNodes, setEdges, screenToFlowPosition],
  );

  const onReconnect = useCallback(
    (oldEdge, newConnection) =>
      setEdges((edges) => reconnectEdge(oldEdge, newConnection, edges)),
    [setEdges],
  );

  const onReconnectEnd = useCallback(
    (_, oldEdge, handleType) => {
      if (handleType === 'source') {
        setNodes((nodes) => {
          return nodes.filter((node) => {
            const isGhost = node.type === 'ghost';
            const isTarget = node.id === oldEdge.target;

            return !(isGhost && isTarget);
          });
        });

        setEdges((edges) => edges.filter((edge) => edge.id !== oldEdge.id));
      }
    },
    [setNodes, setEdges],
  );

  const onEdgesDelete = useCallback(
    (deletedEdges) => {
      setNodes((nodes) => {
        return deletedEdges.reduce(
          (acc, edge) =>
            acc.filter((n) => {
              const isGhost = n.type === 'ghost';
              const isSourceOrTarget =
                n.id === edge.source || n.id === edge.target;

              return !(isGhost && isSourceOrTarget);
            }),
          nodes,
        );
      });
    },
    [setNodes],
  );
  

  return {
    onConnect,
    onConnectEnd,
    onReconnect,
    onReconnectEnd,
    onEdgesDelete,
  };
}

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: '1' },
    type: 'custom',
    isConnectable: true,
  },
  {
    id: '2',
    position: { x: 0, y: 150 },
    data: { label: '2' },
    type: 'custom',
    isConnectable: true,
  },
];

const initialEdges = [
  {
    id: '1-2',
    source: '1',
    target: '2',
    sourceHandle: generateHandleId('1', 'bottom'),
    targetHandle: generateHandleId('2', 'top'),
    type: 'floating',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

const fitViewOptions = { padding: 4 };

const NodeAsHandleFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const handlers = useIncompleteEdge();
  const generateHandleId = (nodeId, handleType) => `${nodeId}-${handleType}`;


  const onConnect = useCallback((params) => {
    console.log('onConnect');
    console.log('Connecting with params:', params);
    console.log('Source Handle:', params.sourceHandle);
    console.log('Target Handle:', params.targetHandle);
    setEdges((eds) =>
        addEdge(
            {
                ...params,
                type: 'floating',
                markerEnd: { type: MarkerType.Arrow },
                sourceHandle: params.sourceHandle, // Doğrudan kullanım
                targetHandle: params.targetHandle, // Doğrudan kullanım
            },
            eds,
        ),
    );
}, [setEdges]);



  return (
    <div style={{width: '100vw', height: '100vh'}} className="simple-floatingedges">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
        connectionMode={ConnectionMode.Loose}
        {...handlers}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <NodeAsHandleFlow />
  </ReactFlowProvider>
);