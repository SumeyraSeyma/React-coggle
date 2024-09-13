import { getBezierPath, useInternalNode, EdgeLabelRenderer } from '@xyflow/react';
import { useReactFlow } from '@xyflow/react';

import { getEdgeParams } from './utils.js';

function SimpleFloatingEdge({ id, source, target, markerEnd, style }) {
  const {setEdges} = useReactFlow();
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode,
  );

  const [edgePath,labelX,labelY] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  return (
    <>
    <path
      id={id}
      className="react-flow__edge-path"
      d={edgePath}
      strokeWidth={5}
      markerEnd={markerEnd}
      style={style}
    />
    <EdgeLabelRenderer>
      <button
        style={{
          position: 'absolute',
          transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          pointerEvents: 'all',
          zIndex: 10,
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '3px',
          padding: '2px 5px',
          cursor: 'pointer',
        }}
        className="nodrag nopan"
        onClick={() => {
          setEdges((edges) => edges.filter((e) => e.id !== id)); // Kenarı sil
        }}
      >
        Sil
      </button>
    </EdgeLabelRenderer>
  </>
    
  );
}


export default SimpleFloatingEdge;
