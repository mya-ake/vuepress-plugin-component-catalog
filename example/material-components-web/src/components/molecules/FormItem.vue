<docs>
# FormItem

[[toc]]

## About

Form item

## Example

```HTML
<FormItem v-model="value">Text</FormItem>
```

<FormItem value="">Text</FormItem>

</docs>

<template>
  <div ref="item" class="mdc-text-field form-item">
    <BaseInput :id="id" v-model="model" v-bind="props" />
    <BaseLabel :for="id" v-bind="{ [$options._scopeId]: '' }"
      ><slot
    /></BaseLabel>
    <div class="mdc-line-ripple"></div>
  </div>
</template>

<script>
import { MDCTextField } from '@material/textfield';
import { vueUidMixin } from 'vue-uid';

import { BaseInput, BaseLabel } from '@/components/atoms';
import inputMixin from '@/mixins/input';

export default {
  components: {
    BaseInput,
    BaseLabel,
  },

  mixins: [vueUidMixin, inputMixin],

  inheritAttrs: false,

  data() {
    return {
      mdc: null,
    };
  },

  computed: {
    id() {
      return `form-item-${this.$_uid}`;
    },

    props() {
      return {
        ...this.$props,
        ...this.$attrs,
      };
    },
  },

  mounted() {
    this.initializeMDC();
  },

  beforeDestroy() {
    if (this.mdc !== null) {
      this.mdc.destroy();
    }
  },

  methods: {
    initializeMDC() {
      this.mdc = MDCTextField.attachTo(this.$refs.item);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@material/textfield/mdc-text-field';

.form-item {
  @include mdc-text-field-label-color($color-vue);
  @include mdc-text-field-caret-color($color-vue);
  @include mdc-text-field-fill-color(transparent);
  @include mdc-text-field-hover-bottom-line-color($color-vue);
  @include mdc-text-field-line-ripple-color($color-vue);
}
</style>
