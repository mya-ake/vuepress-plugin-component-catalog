<docs>
# BaseTextField

[[toc]]

## About

Form item

## Example

```HTML
<BaseTextField v-model="value">Text</BaseTextField>
```

<BaseTextField value="">Text</BaseTextField>

</docs>

<template>
  <div ref="textField" class="mdc-text-field base-text-field">
    <input
      :id="id"
      v-model="model"
      v-bind="props"
      class="mdc-text-field__input"
    />
    <label :for="id" class="mdc-floating-label"><slot /></label>
    <div class="mdc-line-ripple" />
  </div>
</template>

<script>
import { MDCTextField } from '@material/textfield';
import { vueUidMixin } from 'vue-uid';

export default {
  mixins: [vueUidMixin],

  inheritAttrs: false,

  props: {
    value: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: 'text',
    },
  },

  data() {
    return {
      mdc: null,
    };
  },

  computed: {
    id() {
      return `base-text-field-${this.$_uid}`;
    },

    props() {
      return {
        ...this.$props,
        ...this.$attrs,
      };
    },

    model: {
      set(value) {
        this.$emit('input', value);
      },
      get() {
        return this.value;
      },
    },
  },

  mounted() {
    this.initializeMDC();
  },

  beforeDestroy() {
    this.destroyMDC();
  },

  methods: {
    initializeMDC() {
      this.mdc = MDCTextField.attachTo(this.$refs.textField);
    },

    destroyMDC() {
      if (this.mdc !== null) {
        this.mdc.destroy();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@material/textfield/mdc-text-field';

.base-text-field {
  @include mdc-text-field-label-color($color-vue);
  @include mdc-text-field-caret-color($color-vue);
  @include mdc-text-field-fill-color(transparent);
  @include mdc-text-field-hover-bottom-line-color($color-vue);
  @include mdc-text-field-line-ripple-color($color-vue);
}
</style>
