<template>
	<!-- 这里是柱状图的组件 -->
	<div ref="chart" :style="{ width, height }"></div>
</template>

<script>
const echarts = require("echarts")
export default {
	props: ["data"],
	data() {
		return {
			width: null,
			height: null,
			myChart: null,
			packCount: "",
			expressCount: "",
			secondHandCount: "",
			otherCount: "",
		}
	},
	watch: {
		data: {
			handler(newName, oldName) {
				// console.log(newName)
				this.$nextTick(() => {
					this.init()
				})
				// !!!!!!!!!!动态获取数据就在watch里监听就好了！！！！！！！！！！！
				this.width = this.data.width
				this.height = this.data.height
				this.packCount = this.data.packCount
				this.expressCount = this.data.expressCount
				this.secondHandCount = this.data.secondHandCount
				this.otherCount = this.data.otherCount
			},
			// 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
			immediate: true,
			deep: true,
		},
	},
	mounted() {
		// 适应窗口大小
		this.init()
		window.addEventListener("resize", () => {
			this.myChart.resize()
		})
	},
	methods: {
		init() {
			// 基于准备好的dom，初始化echarts实例
			// 在每次调用前先销毁防止报There is a chart instance already initialized on the dom
			if (
				this.myChart != null &&
				this.myChart != "" &&
				this.myChart != undefined
			) {
				this.myChart.dispose() //销毁
			}
			let myChart = echarts.init(this.$refs.chart)
			// 绘制图表
			let option = {
				tooltip: {
					trigger: "item",
				},
				legend: {
					width: "300px",
					left: "center",
				},
				series: [
					{
						name: "订单统计",
						type: "pie",
						radius: ["40%", "70%"],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: "#fff",
							borderWidth: 2,
						},
						// 设置图形的位置
						center: ["50%", "40%"],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: "center",
						},
						emphasis: {
							label: {
								show: true,
								fontSize: 40,
								fontWeight: "bold",
							},
						},
						labelLine: {
							show: false,
						},
						data: [
							{ value: this.packCount, name: "打包" },
							{ value: this.expressCount, name: "快递" },
							{ value: this.secondHandCount, name: "二手物品" },
							{ value: this.otherCount, name: "其他" },
						],
					},
				],
			}
			myChart.setOption(option)
			this.myChart = myChart
		},
	},
}
</script>

<style scoped></style>
