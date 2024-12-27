import { useCallback, useState } from 'react';
import { ReactFlow, Controls,addEdge, Background, applyEdgeChanges, applyNodeChanges, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './index.css'

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
 
  {
    id: '2',
    data: { label: "Default Node" },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
];
const defaultEdgeOptions = { animated: true };


const Flow = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [variant, setVariant] = useState('cross');
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge({...connection, animated:true}, eds)),
    [setEdges],
  );
  console.log(nodes.data);
  

    return(
    <div className='style-react-flow'>
        <ReactFlow 
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                defaultEdgeOptions={defaultEdgeOptions} 
                fitView
        >
          <Background gap={20} color="#c0c0c0" variant={variant} />
          <Panel>
        <button onClick={() => setVariant('dots')}>dots</button>
        <button onClick={() => setVariant('lines')}>lines</button>
        <button onClick={() => setVariant('cross')}>cross</button>
        </Panel>
          <Controls />
        </ReactFlow>
    </div>
    )
}

export default Flow