<!-- prettier-ignore -->
<docs>
# BaseButton

[[toc]]

## About

`button` tag component

## Example & Variation

### default

```HTML
@playground
<BaseButton>Default Button</BaseButton>
```

### primary

```HTML
@playground
<BaseButton variation="primary">Primary Button</BaseButton>
```

### events

```HTML
@playground
<template>
  <BaseButton @click="handleClick">Primary Button</BaseButton>
</template>
<script>
  export default {
    methods: {
      handleClick() {
        alert('button clicked')
      }
    }
  }
</script>
```

</docs>

<template>
  <button
    :type="type"
    :class="`base-button--${variation}`"
    class="base-button"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',

  props: {
    type: {
      type: String,
      default: 'button',
    },

    variation: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'primary'].includes(value);
      },
    },
  },

  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    },
  },
};
</script>

<style lang="scss" scoped>
.base-button {
  border: solid 1px $color-text;
  border-radius: 3px;
  padding: 8px 16px 9px;
  font-size: 1rem;
  font-weight: 600;
  color: $color-text;
  cursor: pointer;
}

.base-button--default {
}

.base-button--primary {
  color: #fff;
  background-color: $color-vue;
  border-color: $color-vue;
}
</style>
