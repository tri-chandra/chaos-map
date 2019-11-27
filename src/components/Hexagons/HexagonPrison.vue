<template>
  <g>
    <path :d="pathString" @click="$emit('click', node)"
      fill="#ffffff"
      stroke="#000000"
      stroke-width="1.5px"
    />
    <text :x="x" :y="y+length">{{node.text}}</text>
  </g>
</template>

<script>
export default {
  name: 'hexagon-prison',
  props: {
    length: { type: Number, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    node: { type: Object, required: false }
  },
  computed: {
      pathString() {
        const A = 60;//60/180 * Math.PI;
        const barLength = this.length * 0.8;
        const path = 
            `M${this.x} ${this.y} h${this.length}` +
            `l${this.length / 2} ${Math.round(this.length * -Math.cos(A))}` +
            `l${-this.length / 2} ${Math.round(this.length * -Math.cos(A))}` +
            `h${-this.length}` +
            `l${-this.length / 2} ${Math.round(this.length * Math.cos(A))}` +
            `l${this.length / 2} ${Math.round(this.length * Math.cos(A))}` + 
            // `l${this.length * 3/2} ${Math.round(this.length * -Math.cos(A))}` +
            // `l${-this.length / 2} ${Math.round(this.length * -Math.cos(A))}` +
            // `l${-this.length * 3/2} ${Math.round(this.length * Math.cos(A))}` +
            `v${barLength}` +
            `m${this.length/3} ${0} v${-barLength}` +
            `m${this.length/3} ${0} v${barLength}` +
            `m${this.length/3} ${0} v${-barLength}` +
            `l${this.length / 2} ${Math.round(this.length * -Math.cos(A))}` +
            `l${-this.length / 2} ${Math.round(this.length * -Math.cos(A))}` +
            `v${-barLength}` +
            `m${-this.length/3} ${0} v${barLength}` +
            `m${-this.length/3} ${0} v${-barLength}` +
            `m${-this.length/3} ${0} v${barLength}`;

        return path;
      }
  }
}
</script>