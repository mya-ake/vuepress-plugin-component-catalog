<docs>
# SearchForm

[[toc]]

## About

In-site search component

## Example

```HTML
<SearchForm @submit="handleSubmit" />
```

<SearchForm/>

</docs>

<template>
  <form class="search-form" @submit.prevent="handleSubmit">
    <BaseTextField v-model="value" type="search">Search the site</BaseTextField>
    <BaseButton type="submit" raised>Search</BaseButton>
  </form>
</template>

<script>
import { BaseButton, BaseTextField } from '@/components';

export default {
  components: {
    BaseButton,
    BaseTextField,
  },

  data() {
    return {
      value: '',
    };
  },

  methods: {
    handleSubmit() {
      this.$emit('submit', this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-form {
  display: flex;
  align-items: center;
}
</style>
