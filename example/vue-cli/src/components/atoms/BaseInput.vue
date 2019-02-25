<docs>
# BaseInput

[[toc]]

## About

`input` tag component

## Example

```HTML
@playground
<BaseInput v-model="value" type="text" />
```

</docs>

<template>
  <input v-model="model" :type="type" class="base-input" />
</template>

<script>
import inputMixin from '@/mixins/input';

export default {
  name: 'BaseInput',

  mixins: [inputMixin],
};
</script>

<style lang="scss" scoped>
.base-input {
  border: solid 1px $color-border;
  border-radius: 3px;
  padding: 4px 8px;
  font-size: 1rem;
}
</style>
