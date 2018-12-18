<!-- prettier-ignore -->
<docs>
# BaseButton

[[toc]]

## About

`button` tag component

## Example & Variation

### default

```html
<BaseButton>Default Button</BaseButton>
```

<BaseButton>Default Button</BaseButton>

### raised

```html
<BaseButton raised>Raised Button</BaseButton>
```

<BaseButton raised>Raised Button</BaseButton>

### unelevated

```html
<BaseButton unelevated>Unelevated Button</BaseButton>
```

<BaseButton unelevated>Unelevated Button</BaseButton>

### outlined

```html
<BaseButton outlined>Outlined Button</BaseButton>
```

<BaseButton outlined>Outlined Button</BaseButton>

</docs>

<template>
  <button
    ref="button"
    :type="type"
    :class="{
      'mdc-button--raised': raised,
      'base-button--raised': raised,
      'mdc-button--unelevated': unelevated,
      'base-button--unelevated': unelevated,
      'mdc-button--outlined': outlined,
      'base-button--outlined': outlined,
    }"
    class="base-button mdc-button"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
import { MDCRipple } from '@material/ripple';

export default {
  name: 'BaseButton',

  props: {
    type: {
      type: String,
      default: 'button',
    },

    raised: {
      type: Boolean,
      default: false,
    },

    unelevated: {
      type: Boolean,
      default: false,
    },

    outlined: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    this.initializeMDC();
  },

  methods: {
    initializeMDC() {
      new MDCRipple(this.$refs.button);
    },

    handleClick(evt) {
      this.$emit('click', evt);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@material/button/mdc-button';

.base-button {
  @include mdc-button-ink-color($color-vue);
  @include mdc-states($color-vue);
  line-height: 1;
}

.base-button--raised,
.base-button--unelevated {
  @include mdc-button-container-fill-color($color-vue);
  @include mdc-button-ink-color(white);
  @include mdc-states(white);
}

.base-button--outlined {
  @include mdc-button-outline-color($color-vue);
}
</style>
