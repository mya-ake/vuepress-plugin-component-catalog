<docs>
# BaseLabel

[[toc]]

## About

`label` tag component

## Example

```HTML
@playground
<BaseLabel>Label</BaseLabel>
```

</docs>

<template functional>
  <label v-bind="data.attrs" :class="data.staticClass" class="base-label"
    ><slot
  /></label>
</template>

<script>
export default {
  name: 'BaseLabel',
};
</script>

<style lang="scss" scoped>
.base-label {
  display: inline-block;
  color: $color-text;
  font-size: 1rem;
  line-height: 1;
}
</style>
