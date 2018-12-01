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
  <div class="form-item">
    <BaseLabel :for="id" class="label" v-bind="{ [$options._scopeId]: '' }"
      ><slot
    /></BaseLabel>
    <BaseInput :id="id" v-model="model" v-bind="props" />
  </div>
</template>

<script>
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
};
</script>

<style lang="scss" scoped>
.form-item {
}

.label {
  padding: 4px 8px 4px 0;
}
</style>
