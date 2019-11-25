import NodeType from '@/models/NodeType'

class Node {
    constructor() {
        this.type = NodeType.Empty;
    }
}

function createNode(type) {
    const node = new Node();
    node.type = type;

    return node;
}

Node.createBasicNode = () => createNode(NodeType.Basic);
Node.createEliteNode = () => createNode(NodeType.Elite);
Node.createEmptyNode = () => createNode(NodeType.Empty);
Node.createEndNode = () => createNode(NodeType.End);
Node.createEventNode = () => createNode(NodeType.Event);
Node.createGoldNode = () => createNode(NodeType.Gold);
Node.createHealingNode = () => createNode(NodeType.Healing);
Node.createStartingNode = () => createNode(NodeType.Start);
Node.createNextNode = () => createNode(NodeType.Next);
Node.createMonumentNode= () => createNode(NodeType.Monument);
Node.createPrisonNode= () => createNode(NodeType.Prison);
Node.createStartNode= () => createNode(NodeType.Start);

export default Node;