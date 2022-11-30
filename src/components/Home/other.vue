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
			</div>
			<div class="card-info">
				<p class="text-title">{{ item.title }}</p>
				<p class="time">{{ item.date }}</p>
			</div>
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
				<div class="cardDate">时间：{{ cardInfo.date }}</div>
			</div>
			<span></span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="detailsShow = false">确 定</el-button>
			</span>
		</el-dialog>
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
		async getInfo() {
			const res = await this.$store.dispatch("other/getInfo")
			this.tableData = res.result
		},
		// 接单按钮
		orderBtn(item, index) {
			this.$confirm("是否接单?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					this.is_order = 1
					const data = {
						id: row.id,
						email: row.email,
						orderUser: this.user,
						is_order: "0",
					}
					this.$store.dispatch("other/updateInfo", data)
					this.$message({
						type: "success",
						message: "接单成功!",
					})
					this.getInfo()
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消接单",
					})
				})
		},
		// card详情
		cardShow(item, index) {
			this.detailsShow = true
			this.cardInfo = item
		},
	},
	mounted() {
		this.getInfo()
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
		display: flex;
		margin: 20px 0 0 40px;
		width: 284px;
		padding: 0.8em;
		background: #667387;
		position: relative;
		overflow: visible;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		transition: all 0.3s;
		border-radius: 10px;
		color: #ffedea;
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
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 10px;
		/*Text*/
		.text-title {
			width: 100%;
			font-weight: 900;
			font-size: 1em;
			line-height: 1.5;
			color: #ffedea;
		}
		.time {
			font-size: 0.8em;
			padding: 10px 0;
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
