import NodeType from '@/models/NodeType'

class Node {
    constructor() {
        this.type = NodeType.Empty;
        this.text = '';
    }
}

function createNode(type, text='') {
    const node = new Node();
    node.type = type;
    node.text = text;

    return node;
}

Node.createBasicNode = () => createNode(NodeType.Basic);
Node.createEliteNode = text => createNode(NodeType.Elite, text);
Node.createEmptyNode = () => createNode(NodeType.Empty);
Node.createEndNode = (text) => createNode(NodeType.End, text);
Node.createEventNode = () => createNode(NodeType.Event);
Node.createGoldNode = () => createNode(NodeType.Gold);
Node.createHealingNode = () => createNode(NodeType.Healing);
Node.createStartingNode = () => createNode(NodeType.Start);
Node.createNextNode = () => createNode(NodeType.Next);
Node.createMonumentNode = (text) => createNode(NodeType.Monument, text);
Node.createPrisonNode = (text) => createNode(NodeType.Prison, text);
Node.createStartNode = () => createNode(NodeType.Start);

export default Node;