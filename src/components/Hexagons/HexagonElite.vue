<template>
    <g>
      <path :d="pathString" @click="$emit('click', node)"
        fill="#ffffff"
        stroke="#000000"
        stroke-width="6px"
      />
      <text :x="x" :y="y+length" :font-size="length">S</text>
      <text :x="x-margin" :y="y+length+margin">{{node.text}}</text>
    </g>
</template>

<script>
export default {
  name: 'hexagon-elite',
  props: {
    length: { type: Number, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    node: { type: Object, required: false }
  },
  data() {
    return { margin: 0.2*this.length };
  },
  computed: {
      pathString() {
        const A = 60;//60/180 * Math.PI;
        const path = `M${this.x} ${this.y} h${this.length}` +
            `l${this.length / 2} ${Math.round(this.length * -Math.cos(A))}` +
            `l${-this.length / 2} ${Math.round(this.length * -Math.cos(A))}` +
            `h${-this.length}` +
            `l${-this.length / 2} ${Math.round(this.length * Math.cos(A))}` +
            `l${this.length / 2} ${Math.round(this.length * Math.cos(A))}`;

        return path;
      }
  }
}
</script>