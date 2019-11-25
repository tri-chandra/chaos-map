<template>
    <div>
        <div class="side-panel">
            <h2>Tile Type</h2>
            <label><input type="radio" v-model="action" value="remove" />Remove</label><br />
            <label><input type="radio" v-model="action" value="basic" />Basic</label><br />
            <label><input type="radio" v-model="action" value="elite" />Elite</label><br />
            <label><input type="radio" v-model="action" value="event" />Event</label><br />
            <label><input type="radio" v-model="action" value="gold" />Gold</label><br />
            <label><input type="radio" v-model="action" value="healing" />Healing</label><br />
            <label><input type="radio" v-model="action" value="monument" />Monument</label><br />
            <label><input type="radio" v-model="action" value="prison" />Prison</label><br />
            <label><input type="radio" v-model="action" value="end" />End Tile</label><br />
        </div>
        <Canvas class="canvas-panel" ref="canvas" :viewBox="bbox" :width="canvasWidth">
            <template v-for="(nodes, i) in map.map">
                <HexagonSelector 
                    v-for="(node, j) in nodes"
                    :key="`x${i}-${j}`"
                    @click="(n) => hexagonClicked(n, i, j)"
                    :x="map.getCoordinate(i, j).x" 
                    :y="map.getCoordinate(i, j).y" 
                    :length="HexSize" 
                    :node="node"
                />
            </template>
        </Canvas>
        <img class="minimap" :src="imgDataUrl"/>
    </div>
</template>

<script>
import HexagonSelector from '@/components/HexagonSelector'
import Canvas from '@/components/Canvas'
import Vue from 'vue'

import Map from '@/models/Map'
import Node from '@/models/Node'
import NodeType from '@/models/NodeType'

const HexSize = 50;
const initialMap = [
    [Node.createEmptyNode(), Node.createNextNode(), Node.createNextNode()],
    [Node.createNextNode(), Node.createStartingNode(), Node.createNextNode()],
    [Node.createNextNode(), Node.createNextNode(), Node.createEmptyNode(),]
];
const initImg = `<svg data-v-6420b8dd="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="2.5 0 347.5 459.6" width="159" class="canvas-panel"><path data-v-6420b8dd="" d="M27.500000000000004 0 h50l25 48l-25 48h-50l-25 -48l25 -48" fill="transparent" node="[object Object]"></path><path data-v-6420b8dd="" d="M110.00000000000001 51.6 h50l25 48l-25 48h-50l-25 -48l25 -48" fill="transparent"></path><path data-v-6420b8dd="" d="M192.50000000000003 104.39999999999999 h50l25 48l-25 48h-50l-25 -48l25 -48" fill="transparent"></path><path data-v-6420b8dd="" d="M27.500000000000004 104.39999999999999 h50l25 48l-25 48h-50l-25 -48l25 -48" fill="transparent"></path><path data-v-6420b8dd="" d="M110.00000000000001 156 h50l25 48l-25 48h-50l-25 -48l25 -48" fill="#ffffff" stroke="#12bbc7" stroke-width="8px"></path><path data-v-6420b8dd="" d="M192.50000000000003 207.6 h50l25 48l-25 48h-50l-25 -48l25 -48" fill="transparent"></path><path data-v-6420b8dd="" d="M27.500000000000004 207.6 h50l25 48l-25 48h-50l-25 -48l25 -48" fill="transparent"></path><path data-v-6420b8dd="" d="M110.00000000000001 260.4 h50l25 48l-25 48h-50l-25 -48l25 -48" fill="transparent"></path><path data-v-6420b8dd="" d="M192.50000000000003 312 h50l25 48l-25 48h-50l-25 -48l25 -48" fill="transparent" node="[object Object]"></path></svg>`;
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

            action: 'basic',
            imgDataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(initImg)}`,
            bbox: '2.5 0 347.5 459.6',
            canvasWidth: 159
        }
    },
    methods: {
        trimWhitespace() {
            Vue.nextTick(() => {
                const box = this.$refs.canvas.$el.getBBox();console.log(box);
                this.bbox = `${box.x} ${box.y} ${box.width} ${box.height}`;
                this.canvasWidth = box.width;

                Vue.nextTick(() => {
                    const svgString = (this.$refs.canvas.$el.outerHTML).split('#888888').join('transparent');
                    this.imgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
                });
            });
        },
        hexagonClicked(node, i, j) {
            if (this.action == 'remove') {
                if (this.map.map[i][j].type != NodeType.Start && this.map.map[i][j].type != NodeType.Next) {
                    this.map.removeValue(Node.createEmptyNode(), {x: j, y: i}, Node.createNextNode(), Node.createEmptyNode());
                    this.trimWhitespace();
                }
                return;
            }

            if (this.map.map[i][j].type != NodeType.Next) return;

            let toCreate = null;
            switch (this.action) {
                case 'basic': toCreate = Node.createBasicNode(); break;
                case 'elite': toCreate = Node.createEliteNode(); break;
                case 'event': toCreate = Node.createEventNode(); break;
                case 'gold': toCreate = Node.createGoldNode(); break;
                case 'healing': toCreate = Node.createHealingNode(); break;
                case 'monument': toCreate = Node.createMonumentNode(); break;
                case 'prison': toCreate = Node.createPrisonNode(); break;
                case 'end': toCreate = Node.createEndNode(); break;
            }
            this.map.setValue(toCreate, {x: j, y: i}, Node.createNextNode(), Node.createEmptyNode());
            this.trimWhitespace();
        }
    }
}
</script>

<style scoped>
.side-panel {
    height: 100%;
    width: 180px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #444;
    overflow-x: hidden;
    padding-top: 20px;
    color: aliceblue;
}
.canvas-panel {
    /* margin-left: 200px; */
    overflow: scroll;
    max-width: 800px;
}
.minimap {
    position: absolute;
    top: 0;
    right: 0;
    max-width: 200px;
    border: solid 1px;
}
label {
    left: 40px;
    position: absolute;
}
</style>