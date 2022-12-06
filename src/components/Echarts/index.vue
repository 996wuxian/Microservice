<template>
	<div class="echarts">
		<div style="width: 1250px; height: 400px" ref="echarts"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		EchartsInit() {
			this.$echarts.init(this.$refs.echarts).setOption({
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
					data: ["Email", "Search Engine"],
				},
				toolbox: {
					feature: {
						saveAsImage: {},
					},
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true,
				},
				xAxis: [
					{
						type: "category",
						boundaryGap: false,
						data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					},
				],
				yAxis: [
					{
						type: "value",
					},
				],
				series: [
					{
						name: "Email",
						type: "line",
						stack: "Total",
						areaStyle: {},
						emphasis: {
							focus: "series",
						},
						data: [0, 132, 101, 134, 90, 230, 210],
					},
					{
						name: "Search Engine",
						type: "line",
						stack: "Total",
						label: {
							show: true,
							position: "top",
						},
						areaStyle: {},
						emphasis: {
							focus: "series",
						},
						data: [820, 932, 901, 934, 1290, 1330, 1320],
					},
				],
			})
		},
	},
  mounted() {
		this.EchartsInit()
	},
}
</script>

<style scoped lang="less">
.echarts {
	width: 1250px;
	height: 400px;
	margin: 0 auto;
	background-color: #ffffff;
}
</style>
