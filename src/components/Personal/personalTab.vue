<template>
	<div>
		<el-tabs :tab-position="tabPosition">
			<el-tab-pane label="打包" class="classification">
				<div class="cardBox">
					<div class="card" v-for="(item, index) in packCard.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index">
						<div class="card-img" style="background: #5a79a1">
							<div class="title">{{ item.title }}</div>
						</div>
						<div class="card-info">
							<p class="text-title">{{ item.address }}</p>
							<p class="text-body">{{ item.email }}</p>
							<p class="text-body">{{ item.date }}</p>
							<el-tooltip placement="bottom" :disabled="item.is_order === '否'">
								<div slot="content">接单者：{{ item.orderUser }}</div>
								<button
									class="card-button"
									@click="dialogVisible = true"
									v-if="item.is_finish === '是'"
								>
									订单状态：{{ item.is_order === "是" ? "已完成" : "已接单" }}
								</button>
								<button
									class="card-button"
									@click="dialogVisible = true"
									v-if="item.is_finish === '否'"
								>
									订单状态：{{ item.is_order === "是" ? "已接单" : "未接单" }}
								</button>
							</el-tooltip>
						</div>
					</div>
				</div>
				<div class="paging">
					<el-pagination background layout="total, prev, pager, next" 
					:page-size="8"
					:page-sizes="[this.packCard.length]"
					:total="this.packCard.length"
					@size-change="pageSizeChange"
					@current-change="currentChange"
					:current-page= this.currentPage>
					</el-pagination>
				</div>
			</el-tab-pane>
			<el-tab-pane label="快递" class="classification"> 
				<div class="cardBox">
					<div class="card" v-for="(item, index) in expressCard.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index">
						<div class="card-img" style="background: #91cc75">
							<div class="title">{{ item.title }}</div>
						</div>
						<div class="card-info">
							<p class="text-title">{{ item.address }}</p>
							<p class="text-body">{{ item.email }}</p>
							<p class="text-body">{{ item.date }}</p>
							<el-tooltip placement="bottom" :disabled="item.is_order === '否'">
								<div slot="content">接单者：{{ item.orderUser }}</div>
								<button
									class="card-button"
									@click="dialogVisible = true"
									v-if="item.is_finish === '是'"
								>
									订单状态：{{ item.is_order === "是" ? "已完成" : "已接单" }}
								</button>
								<button
									class="card-button"
									@click="dialogVisible = true"
									v-if="item.is_finish === '否'"
								>
									订单状态：{{ item.is_order === "是" ? "已接单" : "未接单" }}
								</button>
							</el-tooltip>
						</div>
					</div>
				</div>
				<div class="paging">
					<el-pagination background layout="total, prev, pager, next" 
					:page-size="8"
					:page-sizes="[this.expressCard.length]"
					:total="this.expressCard.length"
					@size-change="pageSizeChange"
					@current-change="currentChange"
					:current-page= this.currentPage>
					</el-pagination>
				</div>
			</el-tab-pane>
			<el-tab-pane label="二手物品" class="classification">
				<div class="cardBox">
					<div
						class="card"
						v-for="(item, index) in secondHandCard.slice((currentPage-1)*pageSize,currentPage*pageSize)"
						:key="index"
					>
						<div class="card-img" style="background: #fac858">
							<div class="title">{{ item.title }}</div>
						</div>
						<div class="card-info">
							<p class="text-title">{{ item.address }}</p>
							<p class="text-body">{{ item.email }}</p>
							<p class="text-body">{{ item.date }}</p>
							<el-tooltip placement="bottom" :disabled="item.is_order === '否'">
								<div slot="content">接单者：{{ item.orderUser }}</div>
								<button
									class="card-button"
									@click="dialogVisible = true"
									v-if="item.is_finish === '是'"
								>
									订单状态：{{ item.is_order === "是" ? "已完成" : "已接单" }}
								</button>
								<button
									class="card-button"
									@click="dialogVisible = true"
									v-if="item.is_finish === '否'"
								>
									订单状态：{{ item.is_order === "是" ? "已接单" : "未接单" }}
								</button>
							</el-tooltip>
						</div>
					</div>
				</div>
				<div class="paging">
					<el-pagination background layout="total, prev, pager, next" 
					:page-size="8"
					:page-sizes="[this.secondHandCard.length]"
					:total="this.secondHandCard.length"
					@size-change="pageSizeChange"
					@current-change="currentChange"
					:current-page= this.currentPage>
					</el-pagination>
				</div>
			</el-tab-pane>
			<el-tab-pane label="其他" class="classification">
				<div class="cardBox">
					<div class="card" v-for="(item, index) in otherCard.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index">
						<div class="card-img" style="background: #ee6666">
							<div class="title">{{ item.title }}</div>
						</div>
						<div class="card-info">
							<p class="text-body">{{ item.email }}</p>
							<p class="text-body">{{ item.date }}</p>
						</div>
					</div>
				</div>
				<div class="paging">
					<el-pagination background layout="total, prev, pager, next" 
					:page-size="8"
					:page-sizes="[this.otherCard.length]"
					:total="this.otherCard.length"
					@size-change="pageSizeChange"
					@current-change="currentChange"
					:current-page= this.currentPage>
					</el-pagination>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
export default {
	props: ["tabData"],
	data() {
		return {
			tabPosition: "top",
			packCard: "",
			expressCard: "",
			secondHandCount: "",
			otherCard: "",
			dialogVisible: false,
			// 分页
			pageSize: 8,
			currentPage:1,
		}
	},
	watch: {
		tabData: {
			immediate: true,
			deep: true,
			handler() {
				this.packCard = this.tabData.packCard
				this.expressCard = this.tabData.expressCard
				this.secondHandCard = this.tabData.secondHandCard
				this.otherCard = this.tabData.otherCard
			},
		},
	},
	methods: {
		showOrder() {
			console.log("123")
		},
		pageSizeChange() {
			console.log('当前页数据条数变化');
		},
		currentChange(val) {
			this.currentPage = val
		}
	},
	mounted() {
	},
}
</script>

<style scoped lang="less">
.classification {
	position: relative;
	height: 600px;
	.paging {
		position: absolute;
		bottom: 0;
		left: 30%;
	}
}
.cardBox {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	.card {
		width: 195px;
		height: 244px;
		border-radius: 1em;
		background: #f5f5f5;
		position: relative;
		transition: 0.4s ease-out;
		margin: 10px 10px;
		box-shadow: 8px 12px 8px rgba(43, 8, 37, 0.2);
		/*Image*/
		.card-img {
			border-radius: 1em;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			overflow: hidden;
			.title {
				padding: 10px;
				margin-top: 40%;
				width: 100%;
				height: 40px;
				overflow: hidden;
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				font-size: 20px;
				color: #fff;
				transition: all 0.3s;
			}
		}

		.card-info {
			position: relative;
			z-index: 3;
			width: 90%;
			margin: 70px auto;
			color: #f5f5f5;
			opacity: 0;
			transform: translateY(20%);
			transition: 0.5s;
			/*Text*/
			.text-title {
				width: 100%;
				height: 40px;
				overflow: hidden;
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				font-size: 16px;
				font-weight: 700;
			}
			.text-body {
				letter-spacing: 1px;
				font-size: 0.9rem;
				margin: 10px auto;
				letter-spacing: 0px;
			}

			/*Button*/
			.card-button {
				width: 170px;
				height: 40px;
				outline: none;
				border: none;
				border-radius: 4px;
				background: #ee9ca7;
				color: white;
				font-weight: bold;
				transition: 0.4s ease;
			}
			.card-button:hover {
				background: rgba(218, 77, 77, 0.4);
				color: #f5f5f5;
			}
		}
	}

	.card:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 100%;
		height: 100%;
		// background: rgba(238, 116, 116, 0.4);
		z-index: 2;
		transition: 0.5s;
	}

	/*Hover*/
	.card:hover {
		transform: translateY(5%);
	}

	.card:hover:before {
		opacity: 1;
	}

	.card:hover .card-info {
		opacity: 1;
		transform: translateY(0);
	}

	.card:hover .title {
		margin-top: 0;
		transition: all 0.3s;
	}
}
</style>
