export default {
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

  computed: {
    model: {
      set(value) {
        this.$emit('input', value);
      },
      get() {
        return this.value;
      },
    },
  },
};
