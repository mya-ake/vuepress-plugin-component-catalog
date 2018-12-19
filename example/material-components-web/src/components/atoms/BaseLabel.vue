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

<template functional>
  <label
    v-bind="data.attrs"
    :class="data.staticClass"
    class="mdc-floating-label"
    ><slot
  /></label>
</template>

<script>
export default {
  name: 'BaseLabel',
};
</script>

<style lang="scss" scoped></style>
