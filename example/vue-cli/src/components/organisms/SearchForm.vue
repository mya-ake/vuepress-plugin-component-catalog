<docs>
# SearchForm

[[toc]]

## About

In-site search component

## Example

```HTML
@playground
<template>
  <SearchForm @submit="handleSubmit" />
</template>
<script>
  export default {
    methods: {
      handleSubmit(value) {
        alert(value)
      }
    }
  }
</script>
```
</docs>

<template>
  <form class="search-form" @submit.prevent="handleSubmit">
    <FormItem v-model="value" type="search" class="item"
      ><span class="label">Search the site</span></FormItem
    >
    <BaseButton type="submit" variation="primary" class="button"
      >Search</BaseButton
    >
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
  align-items: flex-end;
}

.item {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 8px;
}

.label {
  text-transform: uppercase;
}

.button {
  padding: {
    top: 4px;
    bottom: 5px;
  }
}
</style>
