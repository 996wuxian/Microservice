<template>
	<div class="onlineOrder">
		<div class="content">
			<el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="打包" name="pack"><pack></pack></el-tab-pane>
				<el-tab-pane label="快递" name="express"><express></express></el-tab-pane>
				<el-tab-pane label="二手物品" name="secondHand"><secondHand></secondHand></el-tab-pane>
				<el-tab-pane label="其他" name="other"><other></other></el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import pack from "@/components/OnlineOrder/pack.vue"
import express from "@/components/OnlineOrder/express.vue"
import secondHand from "@/components/OnlineOrder/secondHand.vue"
import other from "@/components/OnlineOrder/other.vue"

export default {
	data() {
		return {
			tableData: [],
			user: "",
			is_packaged: 0,
			detailsShow: false,
			cardInfo: {},
			activeName: 'pack'
		}
	},
	components: {
		pack,
		express,
		secondHand,
		other
	},
	methods: {
		async getPack() {
			const res = await this.$store.dispatch("pack/getPack")
			this.tableData = res.result
		},
		handleClick(tab, event) {
			// console.log(tab, event)
			sessionStorage.setItem('handle_order_name', tab.name)
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
	created () {
		// console.log(sessionStorage.getItem('handle_order_name'));
    if (sessionStorage.getItem('handle_order_name') == undefined) {
      this.activeName = 'pack'
    } else {
      this.activeName = sessionStorage.getItem('handle_order_name')
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
	}
}
</style>
