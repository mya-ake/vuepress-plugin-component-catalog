<docs>
# BaseInput

[[toc]]

## About

`input` tag component

## Example

```HTML
<BaseInput v-model="value" type="text" />
```

<BaseInput value="" type="text" />

</docs>

<template>
  <input v-model="model" :type="type" class="mdc-text-field__input" />
</template>

<script>
import inputMixin from '@/mixins/input';

export default {
  name: 'BaseInput',

  mixins: [inputMixin],
};
</script>

<style lang="scss" scoped></style>
