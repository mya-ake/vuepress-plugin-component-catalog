<!-- prettier-ignore -->
<docs>
# BaseImage

[[toc]]

## About

`image` component

## Example & Variation

### default usage

```HTML
@playground
<template>
  <BaseImage :src="logo"/>
</template>
<script>
  import logo from '@/assets/logo.png'
  export default {
    data() {
      return {
        logo
      }
    }
  }
</script>
```
</docs>

<template>
  <div class="base-image"><img :src="src" /></div>
</template>

<script>
export default {
  name: 'BaseImage',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.base-image {
}
</style>
