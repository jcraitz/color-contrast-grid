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
// luminance factors
const lf = {
  R: 0.2126,
  G: 0.7152,
  B: 0.0722,
};

// adapted from https://gist.github.com/ecasilla/f8297086161a5cd94bf3
const hex2rgb = function(hex) {
  let digit;
  if (/^#/.test(hex)) {
    // eslint-disable-next-line no-param-reassign
    hex = hex.slice(1);
  }
  if (hex.length !== 3 && hex.length !== 6) {
    throw new Error("Invaild hex String or I don't do alpha yet. :-(");
  }

  digit = hex.split('');

  if (digit.length === 3) {
    digit = [digit[0], digit[0], digit[1], digit[1], digit[2], digit[2]];
  }
  const r = parseInt([digit[0], digit[1]].join(''), 16);
  const g = parseInt([digit[4], digit[5]].join(''), 16);
  const b = parseInt([digit[2], digit[3]].join(''), 16);
  return [r, g, b];
};
const cf = function(c) {
  return c < 2 ? 12.92 / 255 : ((c / 255 + 0.055) / 1.055) ** 2.4;
};
const luminance = function([r, g, b]) {
  console.log([r,g,b]);
  return cf(r) * lf.R + cf(g) * lf.G + cf(b) * lf.B;
  // return cf(r).toFixed(1) * lf.R + cf(g).toFixed(1) * lf.G + cf(b).toFixed(1) * lf.B;
};

// const brightness = function(hex) {
//   const [r, g, b] = hex2rgb(hex);
//   return (r * 299 + g * 587 + b * 114) / 1000;
// };

const colorsArr = Object.entries(colors).reduce((acc, [name, hex]) => {
  const colorObject = {
    name,
    hex,
    hexs: hex.slice(1),
    // rgb,
    // brightness: brightness(hex),
    luminance: luminance(hex2rgb(hex)),
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
      const rgbBack = window.getComputedStyle(event.target.closest('td'))[
        'background-color'
      ];
      const bc = this.rgb2hex(rgbBack);
      const rgbFore = window.getComputedStyle(event.target.closest('td')).color;
      const c = this.rgb2hex(rgbFore);
      console.info(`background-color is ${rgbBack} or ${bc}`);
      console.info(`color is ${rgbFore} ${c}`);
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
  methods: {
    getRatio(a,b) {
      return a > b ? (a + 0.05) / (b + 0.05) : (b + 0.05) / (a + 0.05);
    },
  },
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
