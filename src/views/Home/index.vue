<template>
	<div class="home">
		<navbar></navbar>
		<crumbs></crumbs>
		<div class="content">
			<el-tabs type="border-card">
				<el-tab-pane>
					<span slot="label">打包</span>
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
								<p class="text-title">{{ item.packTitle }}</p>
								<p class="text-body">{{ item.address }}</p>
								<p class="time">{{ item.pack_data }}</p>
							</div>
							<div class="card-footer">
								<el-button
									type="text"
									@click.stop="orderBtn(item, index)"
									class="card-button"
									:disabled="item.is_packaged === '1'"
									>接单</el-button
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
									<div class="cardTitle">标题：{{ cardInfo.packTitle }}</div>
									<div class="cardText">地址：{{ cardInfo.address }}</div>
									<div class="cardDate">时间：{{ cardInfo.pack_data }}</div>
									<div class="cardDate" v-show="cardInfo.is_packaged === '1'">接单情况：已接单</div>
									<div class="cardDate" v-show="cardInfo.is_packaged !== '1'">接单情况：未接单</div>
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
				</el-tab-pane>
				<el-tab-pane label="快递">快递</el-tab-pane>
				<el-tab-pane label="二手物品">二手物品</el-tab-pane>
				<el-tab-pane label="其他">其他</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import navbar from "@/components/Navbar"
import crumbs from "@/components/Crumbs"

export default {
	data() {
		return {
			tableData: [],
			user: "",
			is_packaged: 0,
			detailsShow: false,
			cardInfo: {},
		}
	},
	components: {
		navbar,
		crumbs,
	},
	methods: {
		async getPack() {
			const res = await this.$store.dispatch("pack/getPack")
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
					this.is_packaged = 1
					const data = {
						id: item.id,
						email: this.user,
						is_packaged: this.is_packaged,
					}
					this.$store.dispatch("pack/updatePack", data)
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
		},
		// card详情
		cardShow(item, index) {
			this.detailsShow = true
			this.cardInfo = item
		},
	},
	computed: {
		isOrder(item) {

		}
	},
	mounted() {
		this.getPack()
		this.user = JSON.parse(localStorage.getItem("admin")).data.result.username
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
		.item {
			display: flex;
			align-items: flex-start;
			flex-wrap: wrap;
			.card {
				margin: 20px 0 0 40px;
				width: 184px;
				padding: 0.8em;
				background: #f5f7fa;
				position: relative;
				overflow: visible;
				box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
				transition: all 0.3s;
				border-radius: 10px;
				color: #93adcf;
				.title {
					display: flex;
					color: #93adcf;
					justify-content: space-between;
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
					box-shadow: rgba(226, 196, 63, 0.25) 0px 13px 47px -5px,
						rgba(66, 186, 255, 0.3) 0px 8px 16px -8px;
				}
			}
			.card:hover {
				transition: all 0.3s;
				box-shadow: 0 5px 20px rgba(0, 0, 0, 0.12),
					0 1px 2px rgba(0, 0, 0, 0.24);
			}
			.card-info {
				padding-top: 10px;
				/*Text*/
				.text-title {
					font-weight: 900;
					font-size: 1em;
					line-height: 1.5;
					color: #93adcf;
				}
				.text-body {
					font-size: 0.9em;
					padding: 10px 0;
				}
				.time {
					font-size: 0.8em;
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
					border: 1px solid #93adcf;
					width: 90%;
					height: 35px;
					display: block;
					text-align: center;
					padding: 0.3em;
					cursor: pointer;
					border-radius: 10px;
					transition: 0.3s ease-in-out;
				}
				.card-button:hover {
					border: 1px solid #93adcf;
					background-color: #93adcf;
					color: #fff;
				}
			}
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
