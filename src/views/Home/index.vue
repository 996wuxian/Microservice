<template>
	<div class="home">
		<navbar></navbar>
		<crumbs></crumbs>
		<div class="content">
			<el-tabs type="border-card">
				<el-tab-pane>
					<span slot="label">打包</span>
					<div class="item">
						<div class="card" v-for="(item, index) in tableData" :key="index">
							<div class="title">
								<div class="card-img"><img src="" alt="头像" /></div>
								<div>
									<span class="text-title">￥{{ item.price }}</span>
								</div>
							</div>
							<div class="card-info">
								<p class="text-title">{{ item.packTitle }}</p>
								<p class="text-body">{{ item.address }}</p>
                <p class="time">{{item.pack_data}}</p>
							</div>
							<div class="card-footer">
								<div class="card-button">接单</div>
							</div>
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
			console.log(this.tableData)
		},
	},
	mounted() {
		this.getPack()
	},
}
</script>

<style scoped lang="less">
.home {
	height: 100vh;
	.nav {
		position: relative;
		z-index: 2;
	}
	.crumbs {
		position: relative;
		z-index: 1;
	}
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
				justify-content: space-between;
				align-items: center;
				padding-top: 10px;
				border-top: 1px solid #ddd;
				/*Button*/
				.card-button {
					border: 1px solid #93adcf;
					width: 90%;
					height: 25px;
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
</style>
