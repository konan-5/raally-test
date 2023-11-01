<template>
  <div @click="onClick()" class="filter-preview">
    <div class="filter-preview-left">
      <span v-if="expanded || !items.length"
        ><app-i18n code="common.filters"></app-i18n
      ></span>

      <template v-if="!expanded && items.length">
        <app-i18n code="common.filters"></app-i18n>:
        <span class="filter-preview-values">
          <el-tag
            :key="item.label"
            v-for="item of items"
            type="info"
            closable
            @close="onRemove(item.key)"
            >{{ item.label }}: {{ item.value }}</el-tag
          >
        </span>
      </template>
    </div>

    <div class="filter-preview-right">
      <i v-if="expanded" class="el-icon-fa-chevron-up"></i>
      <i
        v-if="!expanded"
        class="el-icon-fa-chevron-down"
      ></i>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'app-filter-preview',
  props: ['values', 'fields', 'expanded'],

  computed: {
    items() {
      return Object.keys(this.values || {})
        .map((key) => {
          if (!this.fields[key]) {
            return {
              value: null,
            };
          }

          return {
            key: key,
            label: this.fields[key].label,
            value: this.fields[key].forFilterPreview(
              this.values[key],
            ),
          };
        })
        .filter(
          (item) =>
            item.value ||
            item.value === 0 ||
            item.value === false,
        );
    },
  },

  methods: {
    onRemove(key) {
      this.$emit('remove', key);
    },

    onClick() {
      this.$emit('click');
    },
  },
});
</script>
