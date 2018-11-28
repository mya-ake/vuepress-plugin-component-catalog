<!-- prettier-ignore -->
<docs>
  # BaseButton [[toc]] ## About ボタンのコンポーネント ## Variation ### default
  ```HTML
  <base-button>Default Button</base-button>
  ```

  <base-button>Default Button</base-button>

  ### primary

  ```HTML
  <base-button variation="primary">Primary Button</base-button>
  ```

  <base-button variation="primary">Primary Button</base-button>
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

<style scoped>
.base-button {
  border: solid 1px #333;
  border-radius: 3px;
  padding: 8px 16px 9px;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
}

.base-button--default {
}

.base-button--primary {
  --c-vue: #3eaf7c;

  color: #fff;
  background-color: var(--c-vue);
  border-color: var(--c-vue);
}
</style>
