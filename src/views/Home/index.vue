<template>
	<div class="home">
		<div class="content">
			<div class="count">
				<div>
					<i class="el-icon-s-custom" style="color: #40c9c6"></i>
					<span style="color: #40c9c6">用户总人数</span>
					<span>{{ userCount }}</span>
				</div>
				<div>
					<i class="el-icon-bell" style="color: #36a3f7"></i>
					<span style="color: #36a3f7">发布订单总数</span>
					<span>{{ orderCount }}</span>
				</div>
				<div>
					<i class="el-icon-message-solid" style="color: #f4516c"></i>
					<span style="color: #f4516c">订单成交总数</span>
					<span>123</span>
				</div>
				<div>
					<i class="el-icon-time" style="color: #34bfa3"></i>
					<span style="color: #34bfa3">项目运行时间</span>
					<span>123</span>
				</div>
			</div>
			<echarts></echarts>
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
			change: 0,
		}
	},
	components: {
		echarts
	},
	async created() {
		// 获取用户总数
		this.userCount = (
			await this.$store.dispatch("userManagement/getAllUserInfo")
		).result.length
		// 获取订单总数
		this.orderCount =
			(await this.$store.dispatch("express/getExpress")).result.length +
			(await this.$store.dispatch("other/getInfo")).result.length +
			(await this.$store.dispatch("pack/getPack")).result.length +
			(await this.$store.dispatch("secondHand/getSecond")).result.length
		// 获取订单成交总数
	},
}
</script>
<style scoped lang="less">
.home {
	height: 100vh;
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
