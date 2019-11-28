<template>
    <HexagonBasic
        v-if="node.type == NodeType.Basic"
        @click="$emit('click', node)"
        :x="x" 
        :y="y" 
        :length="length" 
        :node="node"
    />
    <HexagonElite
        v-else-if="node.type == NodeType.Elite"
        @click="$emit('click', node)"
        :x="x" 
        :y="y" 
        :length="length" 
        :node="node"
    />
    <HexagonEnd
        v-else-if="node.type == NodeType.End"
        @click="$emit('click', node)"
        :x="x" 
        :y="y" 
        :length="length" 
        :node="node"
    />
    <HexagonEvent
        v-else-if="node.type == NodeType.Event"
        @click="$emit('click', node)"
        :x="x" 
        :y="y" 
        :length="length" 
        :node="node"
    />
    <HexagonStore
        v-else-if="node.type == NodeType.Store"
        @click="$emit('click', node)"
        :x="x" 
        :y="y" 
        :length="length" 
        :node="node"
    />
    <HexagonGold
        v-else-if="node.type == NodeType.Gold"
        @click="$emit('click', node)"
        :x="x" 
        :y="y" 
        :length="length"
        :node="node" 
    />
    <HexagonHealing
        v-else-if="node.type == NodeType.Healing"
        @click="$emit('click', node)"
        :x="x" 
        :y="y" 
        :length="length"
        :node="node" 
    />
    <HexagonMonument
        v-else-if="node.type == NodeType.Monument"
        @click="$emit('click', node)"
        :x="x" 
        :y="y" 
        :length="length" 
        :node="node"
    />
    <HexagonNext
        v-else-if="mode == 'display' && node.type == NodeType.Next"
        @click="$emit('click', node)"
        :x="x" 
        :y="y" 
        :length="length" 
        :node="node"
    />
    <HexagonPrison
        v-else-if="node.type == NodeType.Prison"
        @click="$emit('click', node)"
        :x="x" 
        :y="y" 
        :length="length" 
        :node="node"
    />
    <HexagonStart
        v-else-if="node.type == NodeType.Start"
        @click="$emit('click', node)"
        :x="x" 
        :y="y" 
        :length="length" 
        :node="node"
    />
</template>

<script>
import Hexagon from '@/components/Hexagons/Hexagon'
import HexagonBasic from '@/components/Hexagons/HexagonBasic'
import HexagonElite from '@/components/Hexagons/HexagonElite'
import HexagonEmpty from '@/components/Hexagons/HexagonEmpty'
import HexagonEnd from '@/components/Hexagons/HexagonEnd'
import HexagonEvent from '@/components/Hexagons/HexagonEvent'
import HexagonGold from '@/components/Hexagons/HexagonGold'
import HexagonHealing from '@/components/Hexagons/HexagonHealing'
import HexagonMonument from '@/components/Hexagons/HexagonMonument'
import HexagonNext from '@/components/Hexagons/HexagonNext'
import HexagonPrison from '@/components/Hexagons/HexagonPrison'
import HexagonStart from '@/components/Hexagons/HexagonStart'
import HexagonStore from '@/components/Hexagons/HexagonStore'

import NodeType from '@/models/NodeType'

export default {
    name: 'hexagon-selector',
    components: {
        Hexagon,
        HexagonBasic,
        HexagonElite,
        HexagonEmpty,
        HexagonEnd,
        HexagonEvent,
        HexagonGold,
        HexagonHealing,
        HexagonMonument,
        HexagonNext,
        HexagonPrison,
        HexagonStart,
        HexagonStore
    },
    props: {
        x: Number,
        y: Number,
        node: Object,
        length: Number,
        mode: String
    },
    data() {
        return {
            NodeType
        }
    }
}
</script>