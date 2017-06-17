<template>
  <root title="Preview" :scripts="scripts">
  </root>
</template>
<script>
  import root from '../components/root.vue';
  import assets from './assets.json'; // eslint-disable-line import/no-unresolved
  export default {
    data() {
      return {
        scripts: [
          'phantom-limb.js',
          'vue.runtime.js',
          'weex-vue-render.js',
          assets.vendor.js,
          assets.client.js
        ]
      };
    },
    components: {
      root
    },
  };

</script>
