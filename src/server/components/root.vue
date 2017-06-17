<template>
<html>
<head>
  <meta charset="utf-8">
  <title>{{title}}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-touch-fullscreen" content="yes">
  <meta name="format-detection" content="telephone=no, email=no">
</head>
<body>
  <div id="root">
    <slot></slot>
  </div>
  <div v-if="scripts" v-html="injectScripts"></div>

</body>
</html>
</template>

<style>
  body::before {
    content: "1";
    height: 1px;
    overflow: hidden;
    color: transparent;
    display: block;
  }
</style>

<script>
  export default {
    props: {
      title: String,
      styles: Array,
      scripts: Array,
    },
    data() {
      return {

      };
    },
    computed: {
      injectScripts() {
        return this.scripts.map(x=>this.makeScript(x)).join('');
      }
    },
    methods: {
      makeScript(src) {
        return ['<scr', `ipt src="${src}"></scr`, 'ipt>'].join('');
      }
    }
  }
</script>
