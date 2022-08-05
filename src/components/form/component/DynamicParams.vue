<template>
  <div>
    <template v-if="schemasData.params.length > 0">
      <div
        v-for="(itemparam, indexparam) in schemasData.params"
        :key="indexparam"
      >
        <el-row
          type="flex"
          justify="end"
          style="flex-wrap: wraap; flex-direction: row"
        >
          <el-col
            v-for="(item, index) in schemas.paramsValue"
            :key="index"
            :span="24 / schemas.paramsValue.length"
          >
            <component
              :is="'el-' + item.component"
              v-model="schemasData.params[indexparam][item.prop]"
              v-bind="item.attrs"
              v-on="item.events || {}"
            >
              <template v-if="item.children && item.children.length">
                <template
                  v-if="
                    typeof item.component === 'string' &&
                    ['radio-group', 'checkbox-group'].includes(
                      item.component
                    )
                  "
                >
                  <component
                    :is="'el-' + child.component"
                    v-for="(child, idx) in item.children"
                    :key="idx"
                    :label="child.value"
                    >{{ child.label }}</component
                  >
                </template>
                <template v-else>
                  <component
                    :is="'el-' + child.component"
                    v-for="(child, idx) in item.children"
                    :key="idx"
                    :label="child.label"
                    :value="child.value"
                  ></component>
                </template>
              </template>
            </component>
          </el-col>
        </el-row>
        <el-row>
          <i class="el-icon-delete" @click="deleteParams(indexparam)"></i>
          <i
            v-if="indexparam === schemasData.params.length - 1"
            class="el-icon-circle-plus-outline"
            @click="addParams()"
          ></i>
        </el-row>
      </div>
    </template>
    <i
      v-else
      class="el-icon-circle-plus-outline"
      @click="addParams"
    ></i>
  </div>
</template>

<script>
export default {
  name: "DynamicParams",
  props: {
    schemasType: {
      type: Object,
      default: () => ({})
    },
    paramsArray: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showIcon: true,
      showAddIcon: false,
      rules: {},
      schemas: {},
      schemasData: {
        params: [],
      },
    };
  },
  watch: {
    schemasType: {
      immediate: true,
      deep: true,
      handler(val) {
        this.schemas = val
      }
    },
    paramsArray (val) {
      this.schemasData.params = this.paramsArray
    },
    'schemasData.params': {
      immediate: true,
      deep: true,
      handler (val) {
        this.$emit('update:paramsArray', val)
      }
    }
  },
  mounted() {
    this.initSchemas();
  },
  methods: {
    initSchemas() {
      this.schemasData.params = this.paramsArray
    },
    addParams () {
      const paramsObject = this.schemas.paramsValue.reduce((pre, cur) => {
        pre[cur.prop] = cur.value;
        return pre;
      }, {});
      this.schemasData.params.push(paramsObject);
    },
    deleteParams(index) {
      this.schemasData.params.splice(index, 1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon {
  display: block;
  text-align: left;
}
</style>
