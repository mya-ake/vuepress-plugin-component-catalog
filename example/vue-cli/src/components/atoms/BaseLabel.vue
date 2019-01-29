<docs>
# BaseLabel

[[toc]]

## About

`label` tag component

## Example

```HTML
<BaseLabel>Label</BaseLabel>
```

<BaseLabel>Label</BaseLabel>

</docs>

<docs-list>
<BaseLabel>Label</BaseLabel>
</docs-list>

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
