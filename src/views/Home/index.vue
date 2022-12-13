<template>
	<div class="home">
		<div class="content">
			<div class="count">
				<div v-for="(item, id) in cardItem" :key="id" @click="handler(id)">
					<i :class="item.icon" :style="item.iconColor"></i>
					<span style="color: #40c9c6">{{ item.title }}</span>
					<span v-if="id === 0">{{ userCount }}</span>
					<span v-if="id === 1">{{ orderCount }}</span>
					<span v-if="id === 2">{{ orderFinish }}</span>
					<span v-if="id === 3">{{ onlineDay + "day" }}</span>
				</div>
			</div>
			<div class="echarts"><echarts :data="data"></echarts></div>
		</div>
	</div>
</template>

<script>
import echarts from "@/components/Echarts"

export default {
	data() {
		return {
			userCount: "",
			orderCount: "",
			orderFinish: "",
			startDate: "",
			onlineDay: "",
			cardItem: [
				{
					id: 0,
					icon: "el-icon-s-custom",
					title: "用户总人数",
					iconColor: "color: #40c9c6",
				},
				{
					id: 1,
					icon: "el-icon-bell",
					title: "发布订单总数",
					iconColor: "color: #36a3f7",
				},
				{
					id: 2,
					icon: "el-icon-message-solid",
					title: "订单成交总数",
					iconColor: "color: #f4516c",
				},
				{
					id: 3,
					icon: "el-icon-time",
					title: "项目运行时间",
					iconColor: "color: #34bfa3",
				},
			],
			data: {
				title: "标题",
				width: "100%", //这里也可以写百分比
				height: "400px",
				condition: false,
				dataX: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				dataY: [200, 192, 120, 144, 160, 130, 140],
				dataY1: [180, 160, 151, 106, 145, 150, 130],
			},
		}
	},
	components: {
		echarts,
	},
	async created() {
		// 获取用户总数
		this.userCount = (
			await this.$store.dispatch("userManagement/getAllUserInfo")
		).result.length
		// 获取订单总数
		const pack = await this.$store.dispatch("pack/getPack")
		const express = await this.$store.dispatch("express/getExpress")
		const secondHand = await this.$store.dispatch("secondHand/getSecond")
		const other = await this.$store.dispatch("other/getInfo")
		this.orderCount =
			pack.result.length +
			express.result.length +
			secondHand.result.length +
			other.result.length
		// 获取订单成交总数
		for (const iterator of pack.result) {
			if (iterator.is_finish === "是") {
				this.orderFinish++
			}
		}
		for (const iterator of express.result) {
			if (iterator.is_finish === "是") {
				this.orderFinish++
			}
		}
		for (const iterator of secondHand.result) {
			if (iterator.is_finish === "是") {
				this.orderFinish++
			}
		}
		this.startDate = this.getAgoLaterDate()
		this.getOffsetDays("2022-11-14", this.startDate)
	},
	methods: {
		// 获取时间相减
		getOffsetDays(startDate, endDate) {
			var startDateArr = startDate.split("-")
			var checkStartDate = new Date()
			checkStartDate.setFullYear(
				startDateArr[0],
				startDateArr[1],
				startDateArr[2]
			)
			var endDateArr = endDate.split("-")
			var checkEndDate = new Date()
			checkEndDate.setFullYear(endDateArr[0], endDateArr[1], endDateArr[2])
			var days =
				(checkEndDate.getTime() - checkStartDate.getTime()) / 3600000 / 24
			if (startDateArr[0] != endDateArr[0]) {
				flag = true
			}
			return (this.onlineDay = days)
		},
		// 	/** 获取n天前或n天后的日期(默认当天)
		//  * @param n 需要的天数(+n之后的日期，-n之前的日期)
		//  * @returns {string} 默认返回当前日期
		//  */
		getAgoLaterDate(n = 0) {
			// 获取当前日期
			const curTime = new Date(),
				D1 = curTime.getDate(),
				// 将当前日期赋值给date
				date = new Date(curTime)
			// 设置一个月的某一天，让当前天数加上传过来的天数
			date.setDate(D1 + n)
			const Y2 = date.getFullYear(),
				M2 = this.prefixZero(date.getMonth() + 1),
				D2 = this.prefixZero(date.getDate())
			return Y2 + "-" + M2 + "-" + D2
		},
		prefixZero(num = 0, n = 2) {
			// 数字位数不够，数字前面补零
			return (Array(n).join("0") + num).slice(-n)
		},
		// 修改图表数据
		handler(index) {
			switch (index) {
				case 0:
					this.data.dataY = [100, 120, 161, 134, 105, 160, 165]
					this.data.dataY1 = [120, 82, 91, 154, 162, 140, 145]
					break
				case 1:
					this.data.dataY = [200, 192, 120, 144, 160, 130, 140]
					this.data.dataY1 = [180, 160, 151, 106, 145, 150, 130]
					break
				case 2:
					this.data.dataY = [80, 100, 121, 104, 105, 90, 100]
					this.data.dataY1 = [120, 90, 100, 138, 142, 130, 130]
					break
				case 3:
					this.data.dataY = [130, 140, 141, 142, 145, 150, 160]
					this.data.dataY1 = [120, 82, 91, 154, 162, 140, 130]
					break
			}
		},
	},
}
</script>
<style scoped lang="less">
.home {
	.content {
		width: 100%;
		height: 85vh;
		overflow: auto;
		background-color: #f0f2f5;
		.count {
			width: 1250px;
			margin: 50px auto;
			height: 108px;
			display: flex;
			justify-content: space-between;
			div {
				width: 281px;
				height: 108px;
				background: #fff;
				border-radius: 10px;
				position: relative;
				box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
				cursor: pointer;
				i {
					font-size: 60px;
					display: block;
					width: 90px;
					height: 90px;
					text-align: center;
					line-height: 90px;
					margin: 10px;
					border-radius: 5px;
					background-color: #fff;
					transition: all 0.3s;
				}
				i:hover {
					background-color: #40c9c6;
					transition: all 0.3s;
					color: #fff !important;
				}
				span:nth-of-type(1) {
					position: absolute;
					top: 20px;
					right: 20px;
					font-size: 18px;
				}
				span:nth-of-type(2) {
					position: absolute;
					bottom: 32px;
					right: 20px;
					color: #8c8c8c;
				}
			}
		}
		.echarts {
			width: 1250px;
			height: 400px;
			margin: 0 auto;
			background-color: #ffffff;
		}
	}
}
</style>
