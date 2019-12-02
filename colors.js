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
};
const luminanceFactors = {
  R: 0.2126,
  G: 0.7152,
  B: 0.0722,
};
const colorsArr = Object.entries(colors).reduce((acc, [name, hex]) => {
  const colorObject = {
    name,
    hex,
    hexs: hex.slice(1),
    // hsl: hexToHSL(hex),
    // compColor: findComp(hex),
  };
  return [...acc, colorObject];
}, []);

Vue.component('contrast-result', {
  template: '#contrast-template',
  props: {
    xcolors: String,
    rowColor: Object,
    colColor: Object,
  },
  data() {
    return {
      rdata: {},
    };
  },
  methods: {
    contrast(event) {
      const bc = this.rgb2hex(
        window.getComputedStyle(event.target.closest('td'))['background-color']
      );
      const c = this.rgb2hex(
        window.getComputedStyle(event.target.closest('td')).color
      );
      console.info(`background-color is ${bc}`);
      console.info(`color is ${c}`);
      fetch(
        `https://webaim.org/resources/contrastchecker/?fcolor=${c}&bcolor=${bc}&api`
      )
        .then(response => response.json())
        .then(json => this.rendercontrast(event.target, json));
    },
    rgb2hex(c) {
      return c.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0)).join``;
    },
    rendercontrast(node, data) {
      this.rdata = data;
      console.log(node);
      console.log(data);
    },
    passRatio(ratio) {
      return ratio > 7 ? 'pass' : 'fail';
    },
  },
});

Vue.component('color-grid', {
  template: '#grid-template',
  props: {
    colorsArr: Array,
    sample: String,
  },
  // data: function() {
  //   //
  // },
  // computed: {

  // },
  // filters: {},
  // methods: {
  // },
});

const app = new Vue({
  el: '#app',
  data: {
    colorsArr,
    sample: 'sample text',
  },
  // mounted() {
  //   if(localStorage.)
  // },
});
