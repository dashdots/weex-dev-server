<template>
  <root :title="title">
    <h1>{{title}}</h1>
    <p>{{message}}</p>
  </root>
</template>
<script>
  import root from '../components/root.vue';

  export default {
    props: {
      title: String,
      message: String,
    },
    data() {
      return {};
    },
    components: {
      root
    },
  };
</script>
