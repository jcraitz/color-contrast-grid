const colors = {
  WolfpackRed: '#CC0000',
  WolfpackBlack: '#000000',
  WolfpackWhite: '#FFFFFF',
  ReynoldsRed: '#990000',
  HuntYellow: '#FAC800',
  GenomicGreen: '#6F7D1C',
  CarmichaelAqua: '#008473',
  InnovationBlue: '#427E93',
  BioIndigo: '#4156A1',
}
const colorsArr = Object.entries(colors).reduce((acc, [name, hex]) => {
  const colorObject = {
    name,
    hex,
    // hsl: hexToHSL(hex),
    // compColor: findComp(hex),
  }
  return [...acc, colorObject];
}, []);

Vue.component('color-grid', {
  template: '#grid-template',
  props: {
    colorsArr: Array,
    sample: String,
  },
  // data: function() {
  //   //
  // },
  // computed: {},
  // filters: {},
  // methods: {},
});

var app = new Vue({
  el: '#app',
  data: {
    colorsArr: colorsArr,
    sample: 'sample text',
  }
})
