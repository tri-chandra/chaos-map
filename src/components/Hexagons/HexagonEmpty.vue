<template>
    <path :d="pathString"
      fill="transparent"
    />
</template>

<script>
export default {
  name: 'hexagon-empty',
  props: {
    length: { type: Number, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true }
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