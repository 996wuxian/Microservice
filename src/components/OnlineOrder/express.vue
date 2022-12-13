<template>
	<div class="item">
		<div
			class="card"
			v-for="(item, index) in tableData"
			:key="index"
			@click.stop="cardShow(item, index)"
		>
			<div class="title">
				<div class="card-img"><img src="" alt="头像" /></div>
				<div>
					<span class="text-title">￥{{ item.price }}</span>
				</div>
			</div>
			<div class="card-info">
				<p class="text-title">{{ item.title }}</p>
				<p class="text-body">{{ item.address }}</p>
				<p class="time">{{ item.date }}</p>
			</div>
			<div class="card-footer">
				<el-button
					v-if="item.is_finish === '否'"
					type="text"
					@click.stop="orderBtn(item, index)"
					class="card-button"
					:disabled="item.is_order === '是'"
					>{{item.is_order === '否' ? '接单' : '已接单'}}</el-button
				>
				<el-button
					v-if="item.is_finish === '是'"
					type="text"
					@click.stop="orderBtn(item, index)"
					class="card-button"
					:disabled="item.is_order === '是'"
				>{{item.is_finish === '是' ? '已完成' : '已接单'}}</el-button
				>
			</div>
			<!-- :append-to-body='true' 解决dialog取消不了的情况 -->
			<el-dialog
				title="详情"
				:visible.sync="detailsShow"
				width="30%"
				:append-to-body="true"
			>
				<div class="cardContent">
					<div class="cardTitle">标题：{{ cardInfo.title }}</div>
					<div class="cardText">地址：{{ cardInfo.address }}</div>
					<div class="cardDate">时间：{{ cardInfo.date }}</div>
					<div class="cardDate" v-if="cardInfo.is_finish === '否'">
						接单情况:
						{{cardInfo.is_order === '是' ? '已接单' : '未接单' }}
					</div>
					<div class="cardDate" v-if="cardInfo.is_finish === '是'">
						接单情况:
						{{cardInfo.is_order === '是' ? '已完成' : '已接单' }}
					</div>
				</div>
				<span></span>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="detailsShow = false"
						>确 定</el-button
					>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tableData: [],
			user: "",
			author: "",
			is_order: 0,
			detailsShow: false,
			cardInfo: {},
		}
	},
	methods: {
		async getExpress() {
			const res = await this.$store.dispatch("express/getExpress")
			this.tableData = res.result
		},
		// 接单按钮
		orderBtn(item, index) {
			this.author = item.email
			if (this.author === this.user) {
				this.$message.warning("无法接自己的订单")
			} else {
				this.$confirm("是否接单?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(() => {
						this.is_order = '是'
						const data = {
							id: item.id,
							email: item.email,
							orderUser: this.user,
							is_order: this.is_order,
						}
						this.$store.dispatch("express/updateExpress", data)
						this.$message({
							type: "success",
							message: "接单成功!",
						})
						this.$router.go(0)
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消接单",
						})
					})
			}
		},
		// card详情
		cardShow(item, index) {
			this.detailsShow = true
			this.cardInfo = item
		},
	},
	mounted() {
		this.getExpress()
		this.user = JSON.parse(localStorage.getItem("admin")).data.result.username
	},
}
</script>
<style scoped lang="less">
.item {
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	.card {
		margin: 20px 0 0 40px;
		width: 184px;
		padding: 0.8em;
		background: #65849f;
		position: relative;
		overflow: visible;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		transition: all 0.3s;
		border-radius: 10px;
		color: #fff;
		.title {
			display: flex;
			color: #fff;
			justify-content: space-between;
			font-size: 20px;
		}
		.card-img {
			height: 80px;
			width: 80px;
			border-radius: 0.5rem;
			transition: 0.3s ease;
		}
		/*Hover*/
		.card-img:hover {
			transform: translateY(-25%);
			box-shadow: rgba(227, 249, 253, 0.25) 0px 13px 47px -5px,
				rgba(227, 249, 253, 0.3) 0px 8px 16px -8px;
		}
	}
	.card:hover {
		transition: all 0.3s;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.24);
	}
	.card-info {
		padding-top: 10px;
		/*Text*/
		.text-title {
			font-weight: 900;
			font-size: 1em;
			line-height: 1.5;
			color: #fff;
		}
		.text-body {
			font-size: 0.9em;
			padding: 10px 0;
		}
		.time {
			font-size: 0.8em;
			padding-bottom: 10px;
		}
	}
	.card-footer {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 10px;
		border-top: 1px solid #ddd;
		text-align: center;
		/*Button*/
		.card-button {
			border: 1px solid #fff;
			width: 90%;
			height: 35px;
			display: block;
			text-align: center;
			padding: 0.3em;
			cursor: pointer;
			border-radius: 10px;
			color: #fff;
			transition: 0.3s ease-in-out;
		}
		.card-button:hover {
			border: 1px solid #fff;
			background-color: #fff;
			color: #65849f;
		}
	}
}
.cardContent {
	display: flex;
	flex-direction: column;
	div {
		height: 40px;
		width: 100%;
	}
	.cardTitle {
		font-size: 16px;
		font-weight: 700;
	}
	.cardText {
		font-size: 16px;
	}
	.cardDate {
		font-size: 16px;
	}
}
</style>
