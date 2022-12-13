<template>
	<!-- 这里是柱状图的组件 -->
	<div class="bar" ref="chart" :style="{ width, height }"></div>
</template>

<script>
const echarts = require("echarts")
export default {
	name: "BarEcharts",
	props: ["data"],
	data() {
		return {
			title: null,
			width: null,
			height: null,
			condition: false, //控制x轴是否为纵向显示
			dataX: null,
			dataY: null,
			dataY1: null,
			myChart: null,
		}
	},
	watch: {
		data: {
			handler(newName, oldName) {
				// console.log(newName)
				this.$nextTick(() => {
					this.dataX = this.data.dataX
					this.dataY = this.data.dataY
					this.dataY1 = this.data.dataY1
					this.title = this.data.title
					this.init()
				})
			},
			// 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
			immediate: true,
			deep: true,
		},
	},
	created() {
		this.title = this.data.title
		this.width = this.data.width
		this.height = this.data.height
		this.dataX = this.data.dataX
		this.dataY1 = this.data.dataY1
		this.condition = this.data.condition
	},
	mounted() {
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
					trigger: "axis",
					axisPointer: {
						type: "cross",
						label: {
							backgroundColor: "#6a7985",
						},
					},
				},
				legend: {
					data: ["expected", "actual"],
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true,
				},
				xAxis: {
					type: "category",
					data: this.dataX,
					// 是否距离0
					boundaryGap: false,
				},
				yAxis: {
					type: "value",
				},
				series: [
					{
						name: "expected",
						data: this.dataY,
						type: "line",
						smooth: true,
					},
					{
						name: "actual",
						data: this.dataY1,
						type: "line",
						smooth: true,
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
