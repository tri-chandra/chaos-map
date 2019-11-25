<template>
    <g>xx
        <path class="hexagon" :d="pathString" @click="$emit('click', node)"
          fill="#ffffff"
          stroke="#000000"
          stroke-width="1.5px"
        />
        <path class="cross" :d="crossPathString" @click="$emit('click', node)"
          fill="green"
        />
    </g>
</template>

<script>
export default {
  name: 'hexagon-healing',
  props: {
    length: { type: Number, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    node: { type: Object, required: false }
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
      },
      crossPathString() {
          const L = this.length * 0.5;
          const m = Math.round(0.23 * this.length);
          const path = `M${this.x + m} ${this.y + m} h${L}` +
            `v${L} h${L} v${L} h${-L} v${L} h${-L} v${-L} h${-L} v${-L} h${L} v${-L}`;

          return path;     
      }
  }
}
</script>

<style scoped>
.hexagon {
  fill: #fff;
  stroke: #000;
  stroke-width: 1.5px;
}
.cross {
    fill: green
}
</style>