<template>
	<div class="personal">
		<div class="content">
			<div class="about">
				<div class="header"><span>About me</span></div>
				<div class="info">
					<div class="portrait">
						<img src="@/assets/img/logo.png" alt="" />
						<span>{{ user }}</span
						><br />
					</div>
					<span></span>
				</div>
				<div class="count">
					<div><countEcharts :data="data"></countEcharts></div>
				</div>
			</div>
			<div class="myOrder">
				<div class="classify">
					<personalTab :tabData="tabData"></personalTab>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import countEcharts from "@/components/Echarts/countEcharts.vue"
import personalTab from "@/components/Personal/personalTab.vue"
export default {
	data() {
		return {
			user: "",
			packCount: "",
			expressCount: "",
			secondHandCount: "",
			otherCount: "",
			// echarts图的数据
			data: {
				width: "100%", //这里也可以写百分比
				height: "400px",
				packCount: 0,
				expressCount: 0,
				secondHandCount: 0,
				otherCount: 0,
			},
			// tab的数据
			tabData: {
				packCard: [],
				expressCard: [],
				secondHandCard: [],
				otherCard: [],
			},
		}
	},
	components: {
		countEcharts,
		personalTab,
	},
	methods: {
		async getCount() {
			const res = await this.$store.dispatch("userManagement/getAllUserInfo")
			res.result.forEach((element) => {
				if (element.email === this.user) {
					// 由于.length的缘故，所以要先在这里赋值（echarts图的数据）
					this.data.packCount = element.packages.length
					this.data.expressCount = element.expresses.length
					this.data.secondHandCount = element.secondHands.length
					this.data.otherCount = element.others.length
					// tab的数据
					element.packages.forEach((item) => {
						this.tabData.packCard.push(item)
					})
					element.expresses.forEach((item) => {
						this.tabData.expressCard.push(item)
					})
					element.secondHands.forEach((item) => {
						this.tabData.secondHandCard.push(item)
					})
					element.others.forEach((item) => {
						this.tabData.otherCard.push(item)
					})
				}
			})
		},
	},
	created() {
		this.getCount()
		this.user = JSON.parse(
			localStorage.getItem("admin")
		).data.result.userInfo.email
	},
}
</script>

<style scoped lang="less">
.personal {
	.content {
		width: 100%;
		display: flex;
		justify-content: space-between;
		height: 85vh;
		overflow: auto;
		.about {
			width: 25%;
			height: 575px;
			margin: 20px;
			box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
			border-radius: 4px;
			display: flex;
			flex-direction: column;
			.header {
				width: 100%;
				height: 60px;
				line-height: 60px;
				border-radius: 4px;
				border-bottom: 1px solid rgba(0, 0, 0, 0.1);
				box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.1);
				span {
					margin-left: 20px;
				}
			}
			.info {
				width: 100%;
				.portrait {
					display: flex;
					flex-direction: column;
					width: 100%;
					height: 150px;
					margin: 30px auto;
					text-align: center;
					img {
						box-shadow: 1px 2px 10px 2px rgba(0, 0, 0, 0.2);
						width: 110px;
						border-radius: 50%;
						margin: 0 auto;
						margin-bottom: 20px;
					}
					span:nth-of-type(1) {
						font-weight: 700;
					}
				}
				> span {
					width: 90%;
					height: 1px;
					display: block;
					margin-left: 5%;
					border-bottom: 1px solid rgba(0, 0, 0, 0.1);
				}
			}
			.count {
				margin: 20px auto;
				width: 90%;
				height: 300px;
				.title {
					font-weight: 700;
				}
			}
		}
		.myOrder {
			width: 75%;
			height: 700px;
			margin: 20px;
			box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
			.classify {
				margin: 20px;
				width: 95%;
				height: 900px;
			}
		}
	}
}
</style>
