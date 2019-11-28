<template>
    <div>
        <div class="bottom-panel">
            <h2>Block Type <button @click="downloadImage">Download</button></h2>
            <div class="option-flex-container">
                <label><input type="radio" v-model="action" value="remove" />Remove</label>
                <label><input type="radio" v-model="action" value="basic" />Battle</label>
                <label><input type="radio" v-model="action" value="elite" />
                    Elite
                    <input v-model="nodeText" :style="{display:(action!='elite'?'none':'block')}" />
                </label>
                <label><input type="radio" v-model="action" value="event" />Destiny</label>
                <label><input type="radio" v-model="action" value="store" />Chaos Store</label>
                <label><input type="radio" v-model="action" value="gold" />Golden Curse</label>
                <label><input type="radio" v-model="action" value="healing" />Vital Spring</label>
                <label><input type="radio" v-model="action" value="monument" />
                    Monument of Wishes
                    <input v-model="nodeText" :style="{display:(action!='monument'?'none':'block')}" />
                </label>
                <label><input type="radio" v-model="action" value="prison" />
                    Prison
                    <input v-model="nodeText"  :style="{display:(action!='prison'?'none':'block')}" />
                </label>
                <label><input type="radio" v-model="action" value="end" />
                    Finishing
                    <input v-model="nodeText"  :style="{display:(action!='end'?'none':'block')}" />
                </label>
            </div>
        </div>
        <Canvas class="canvas-panel" ref="displayCanvas" :viewBox="`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`" :width="canvasWidth">
            <rect :x="bbox.x" :y="bbox.y" :width="bbox.width" :height="bbox.height" fill="#ffffff" />
            <template v-for="(nodes, i) in map.map">
                <HexagonSelector 
                    v-for="(node, j) in nodes"
                    :key="`x${i}-${j}`"
                    @click="(n) => hexagonClicked(n, i, j)"
                    :x="map.getCoordinate(i, j).x" 
                    :y="map.getCoordinate(i, j).y" 
                    :length="HexSize" 
                    :node="node"
                    mode="display"
                />
            </template>
        </Canvas>
        <Canvas class="canvas-panel hidden" ref="printCanvas" :viewBox="`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`" :width="canvasWidth">
            <rect :x="bbox.x" :y="bbox.y" :width="bbox.width" :height="bbox.height" fill="#ffffff" />
            <template v-for="(nodes, i) in map.map">
                <HexagonSelector 
                    v-for="(node, j) in nodes"
                    :key="`x${i}-${j}`"
                    @click="(n) => hexagonClicked(n, i, j)"
                    :x="map.getCoordinate(i, j).x" 
                    :y="map.getCoordinate(i, j).y" 
                    :length="HexSize" 
                    :node="node"
                    mode="print"
                />
            </template>
        </Canvas>
    </div>
</template>

<script>
import HexagonSelector from '@/components/HexagonSelector'
import Canvas from '@/components/Canvas'
import Vue from 'vue'
import SVGConverter from '@/models/SVGConverter'

import Map from '@/models/Map'
import Node from '@/models/Node'
import NodeType from '@/models/NodeType'

const HexSize = 80;
const initialMap = [
    [Node.createEmptyNode(), Node.createNextNode(), Node.createNextNode()],
    [Node.createNextNode(), Node.createStartingNode(), Node.createNextNode()],
    [Node.createNextNode(), Node.createNextNode(), Node.createEmptyNode(),]
];
const initImg = `<svg data-v-6420b8dd="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="4 82.80000305175781 424 484.4000244140625" width="424" class="canvas-panel"><!----><path data-v-6420b8dd="" d="M176 82.8 h80l40 76l-40 76h-80l-40 -76l40 -76" fill="#888888"></path><path data-v-6420b8dd="" d="M308 166.79999999999998 h80l40 76l-40 76h-80l-40 -76l40 -76" fill="#888888"></path><path data-v-6420b8dd="" d="M44 166.79999999999998 h80l40 76l-40 76h-80l-40 -76l40 -76" fill="#888888"></path><path data-v-6420b8dd="" d="M176 249.6 h80l40 76l-40 76h-80l-40 -76l40 -76" fill="#ffffff" stroke="#12bbc7" stroke-width="8px"></path><path data-v-6420b8dd="" d="M308 332.4 h80l40 76l-40 76h-80l-40 -76l40 -76" fill="#888888"></path><path data-v-6420b8dd="" d="M44 332.4 h80l40 76l-40 76h-80l-40 -76l40 -76" fill="#888888"></path><path data-v-6420b8dd="" d="M176 415.2 h80l40 76l-40 76h-80l-40 -76l40 -76" fill="#888888"></path><!----></svg>`;
let mapper = new Map(HexSize, initialMap);

export default {
    name: 'map-player',
    components: {
        HexagonSelector,
        Canvas
    },
    props: {
        data: Object
    },
    data() {
        return {
            map: mapper,
            NodeType,
            HexSize,
            nodeText: '',

            action: 'basic',
            imgDataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(initImg)}`,
            bbox: { x: 4, y: 82.80000305175781, width: 424, height: 484.4000244140625 },
            bgWidth: 424,
            bgHeight: 484.4000244140625,
            canvasWidth: 159,

            monsterList: [
                'Undead Viking',
                'Gnome Mage',
                'Spear Knight',
                'Cannon Ogre',
                'Ogre',
                'Demon Rabbit',
                'Halberd Viking',
                'Orc Warrior',
                'Orc Shaman',
                'Giant Armor',
                'Skeleton Wyvern',
                'Succubus',
                'Slingshot Orc',
                'Death Knight',
                'Skeleton Lord',
                'Skeleton Summoner',
                'Valkyrie',
                'Frozen Viking',
                'Elder Wizard',
                'Orc Captain',
                'Sniper'
            ]
        }
    },
    methods: {
        downloadImage () {
            Vue.nextTick(() => {
                this.bbox = this.$refs.printCanvas.$el.getBBox();
                this.canvasWidth = this.bbox.width;

                Vue.nextTick(async () => {
                    let svgString = (this.$refs.printCanvas.$el.outerHTML).split('#888888').join('transparent').split('<!---->').join('');
 
                    const converter  = await SVGConverter.loadFromElement(`data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`, this.bbox.width, this.bbox.height);
                    this.imgDataUrl = converter.pngDataURL();
 
                    const a = document.createElement("a");
                    a.href = converter.pngDataURL();
                    a.setAttribute('download', 'chaos.png');
                    a.click();
                });
            });
        },
        trimWhitespace() {
            Vue.nextTick(() => {
                this.bbox = this.$refs.displayCanvas.$el.getBBox();
                this.canvasWidth = this.bbox.width;
            });
        },
        hexagonClicked(node, i, j) {this.trimWhitespace();
            if (this.action == 'remove') {
                if (this.map.map[i][j].type != NodeType.Start && this.map.map[i][j].type != NodeType.Next) {
                    this.map.removeValue(Node.createEmptyNode(), {x: j, y: i}, Node.createNextNode(), Node.createEmptyNode());
                    this.trimWhitespace();
                }
                return;
            }

            // if (this.map.map[i][j].type != NodeType.Next) return;
            if (this.map.map[i][j].type == NodeType.Start) return;

            let toCreate = null;
            switch (this.action) {
                case 'basic': toCreate = Node.createBasicNode(); break;
                case 'elite': toCreate = Node.createEliteNode(this.nodeText); break;
                case 'event': toCreate = Node.createEventNode(); break;
                case 'store': toCreate = Node.createStoreNode(); break;
                case 'gold': toCreate = Node.createGoldNode(); break;
                case 'healing': toCreate = Node.createHealingNode(); break;
                case 'monument': toCreate = Node.createMonumentNode(this.nodeText); break;
                case 'prison': toCreate = Node.createPrisonNode(this.nodeText); break;
                case 'end': toCreate = Node.createEndNode(this.nodeText); break;
            }
            this.nodeText = ''
            this.map.setValue(toCreate, {x: j, y: i}, Node.createNextNode(), Node.createEmptyNode());
            this.trimWhitespace();
        }
    }
}
</script>

<style scoped>
.bottom-panel {
    height: 200px;
    width: 100vw;
    position: fixed;
    z-index: 1;
    bottom: 0;
    background-color: #444;
    overflow-x: hidden;
    color: aliceblue;
}
.canvas-panel {
    /* margin-left: 200px; */
    overflow: scroll;
    height: calc(100vh - 220px);
    width: 100vw;
}
.hidden {
    position: absolute;
    top: -100000px;
}
.option-flex-container {
    display: flex;
    flex-flow: wrap;
    justify-content: flex-start;
}
label {
    /* left: 40px;
    position: absolute; */
    padding-left: 20px;
    padding-bottom: 4px;
    width: 200px;
    text-align: left;
}
</style>