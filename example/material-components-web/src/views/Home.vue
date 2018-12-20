<template>
  <div class="home"><SearchForm @submit="handleSubmit" /></div>
</template>

<script>
import { SearchForm } from '@/components';

export default {
  name: 'Home',

  components: {
    SearchForm,
  },

  methods: {
    handleSubmit(value) {
      console.log(value);
    },
  },
};
</script>
