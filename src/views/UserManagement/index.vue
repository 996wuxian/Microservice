<template>
	<div class="userManagement">
		<div class="content">
			<el-table :data="tableData" style="width: 100%" class="el-table">
				<el-table-column label="ID" width="100px" align="center">
					<template slot-scope="scope">
						<span>{{ scope.row.id }}</span>
					</template>
				</el-table-column>
				<el-table-column label="邮箱" width="220px">
					<template slot-scope="scope">
						<i class="el-icon-message"></i>
						<span style="margin-left: 10px">{{ scope.row.email }}</span>
					</template>
				</el-table-column>
				<el-table-column label="创建日期" width="220px">
					<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<span style="margin-left: 10px">{{
							scope.row.createdAt | dataFormat("yyyy-mm-dd-hh-mm-ss")
						}}</span>
					</template>
				</el-table-column>
				<el-table-column label="修改日期" width="220px">
					<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<span style="margin-left: 10px">{{
							scope.row.updatedAt | dataFormat("yyyy-mm-dd-hh-mm-ss")
						}}</span>
					</template>
				</el-table-column>
				<el-table-column label="是否为管理员" width="100" align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.is_admin }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="250">
					<template slot-scope="scope">
						<el-button
							size="mini"
							:disabled="scope.row.is_admin === 1"
							@click="handleEdit(scope.$index, scope.row)"
							>编辑</el-button
						>
						<el-button
							size="mini"
							type="danger"
							style="margin-left: 10px"
							@click="handleDelete(scope.$index, scope.row)"
							>删除</el-button
						>
						<el-button
							size="mini"
							type="danger"
							:disabled="scope.row.is_admin === 0"
							@click="handleRevoke(scope.$index, scope.row)"
							>撤销权限</el-button
						>
					</template>
				</el-table-column>
				<el-table-column width="200" align="center">
					<template slot="header">
						<el-input
							size="mini"
							placeholder="输入关键字搜索"
						/>
					</template>
				</el-table-column>
			</el-table>
			<div class="block">
				<el-pagination
					:current-page="1"
					layout="total, prev, pager, next, jumper"
					:total="this.tableData.length"
				>
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tableData: [],
		}
	},
	methods: {
		// 请求用户信息
		async getAllUserInfo() {
			const res = await this.$store.dispatch("userManagement/getAllUserInfo")
			this.tableData = res.result
			this.total = this.tableData.length
		},
		// 修改用户为管理员,这里的index要有
		async handleEdit(index, row) {
			const updateInfo = {
				email: row.email,
				is_admin: 1,
			}
			const h = this.$createElement
			this.$msgbox({
				title: "编辑",
				message: h("p", null, [h("span", null, "是否修改为管理员 ")]),
				showCancelButton: true,
				confirmButtonText: "修改",
				cancelButtonText: "取消",
				beforeClose: (action, instance, done) => {
					if (action === "confirm") {
						instance.confirmButtonLoading = true
						instance.confirmButtonText = "执行中..."
						setTimeout(() => {
							done()
							setTimeout(() => {
								instance.confirmButtonLoading = false
							}, 300)
						}, 1000)
					} else {
						done()
					}
				},
			})
				.then(() => {
					this.$message({
						type: "success",
						message: "修改成功",
					})
					this.$store.dispatch("userManagement/updateAdmin", updateInfo)
					this.$router.go(0)
				})
				.catch(() => {})
		},
		// 删除
		async handleDelete(index, row) {
			const deleteInfo = {
				email: row.email,
			}
			this.$confirm("此操作将删除用户", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					this.$message({
						type: "success",
						message: "删除成功!",
					})
					this.$store.dispatch("userManagement/deleteUser", deleteInfo)
					this.$router.go(0)
				})
				.catch(() => {})
		},
		// 撤销权限
		async handleRevoke(index, row) {
			const revokeInfo = {
				email: row.email,
				is_admin: "0",
			}
			this.$confirm("此操作将撤销用户管理员权限", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					this.$message({
						type: "success",
						message: "撤销成功!",
					})
					this.$store.dispatch("userManagement/updateAdmin", revokeInfo)
					this.$router.go(0)
				})
				.catch(() => {})
		},
	},
	mounted() {
		this.getAllUserInfo()
	},
	// 过滤时间
	filters: {
		// 私有局部过滤器，只能在 当前 VM 对象所控制的 View 区域进行使用
		dataFormat(input, pattern = "") {
			// 在参数列表中 通过 pattern="" 来指定形参默认值，防止报错
			var dt = new Date(input)
			// 获取年月日
			var y = dt.getFullYear()
			var m = (dt.getMonth() + 1).toString().padStart(2, "0")
			var d = dt.getDate().toString().padStart(2, "0")
			// 如果 传递进来的字符串类型，转为小写之后，等于 yyyy-mm-dd，那么就返回 年-月-日
			// 否则，就返回  年-月-日 时：分：秒
			if (pattern.toLowerCase() === "yyyy-mm-dd") {
				return `${y}-${m}-${d}`
			} else {
				// 获取时分秒
				var hh = dt.getHours().toString().padStart(2, "0")
				var mm = dt.getMinutes().toString().padStart(2, "0")
				var ss = dt.getSeconds().toString().padStart(2, "0")
				return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
			}
		},
	},
}
</script>

<style scoped lang="less">
.userManagement {
	.content {
		width: 100%;
    height: 85vh;
    overflow:auto;
		position: relative;
		.block {
			width: 100%;
			text-align: center;
			position: absolute;
			bottom: 0;
		}
	}
}
</style>
