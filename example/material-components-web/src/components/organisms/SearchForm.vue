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
    <FormItem v-model="value" type="search"
      ><span>Search the site</span></FormItem
    >
    <BaseButton type="submit" raised>Search</BaseButton>
  </form>
</template>

<script>
import { BaseButton } from '@/components/atoms';
import { FormItem } from '@/components/molecules';

export default {
  components: {
    BaseButton,
    FormItem,
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
