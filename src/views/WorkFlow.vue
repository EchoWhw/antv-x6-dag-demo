<template>
  <div class="workFlow">
    <div class="btnMenu">
      <el-button type="primary" size="small" @click="getJSON">获取JSON数据</el-button>
      <el-button type="primary" size="small" @click="start">开始运行</el-button>
      <el-switch v-model="editable" active-text="编辑模式" inactive-text="运行模式" style="margin-left: 20px;"></el-switch>
    </div>
    <div class="x6-wrap">
      <X6 ref="graphRef" :nodesData="nodesData" :editable="editable" />
    </div>
  </div>
</template>

<script>
import X6 from "@/components/x6/index.vue";
export default {
  name: 'WorkFlow',
  components: {
    X6
  },
  data() {
    return {
      editable: true,
      nodesData: [
        {
          "shape": "dag-edge",
          "id": "3",
          "zIndex": -1,
          "source": { "cell": "1" },
          "target": { "cell": "2" }
        },
        {
          "x": 10,
          "y": 90,
          "shape": "dag-node",
          "id": "1",
          "type": "shell",
          "data": {},
          "zIndex": 1
        },
        {
          "x": 258,
          "y": 146,
          "shape": "dag-node",
          "id": "2",
          "type": "sql",
          "data": {},
          "zIndex": 2
        }
      ],
    };
  },
  methods: {
    getJSON() {
      this.$refs.graphRef.getJSON();
      // const result = getGraphData(this.graph);
      // // console.log(JSON.stringify(result));
      // console.log(result);
    },
    start() {
      this.$refs.graphRef.start();
      // if (!this.editable) {
      //   this.showNodeStatus(this.nodeStatusList);
      // } else {
      //   alert("编辑模式不能运行");
      // }
    },
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.btnMenu {
  height: 40px
}
.workFlow {
  height: 100%;
}
.x6-wrap {
  width: 100%;
  height: calc(100% - 50px);
  margin: 10px auto;
}
</style>