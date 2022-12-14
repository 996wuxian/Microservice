<template>
	<div class="expressContent">
		<el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%"
			:default-sort="{ prop: 'date', order: 'descending' }"
		>
			<el-table-column
				label="id"
				width="50"
				align="center"
				:show-overflow-tooltip="true"
			>
				<template slot-scope="scope">
					<span>{{ scope.row.id }}</span>
				</template>
			</el-table-column>
			<el-table-column
				label="标题"
				width="120"
				align="center"
				:show-overflow-tooltip="true"
				class="table"
			>
				<template slot-scope="scope">
					<span>{{ scope.row.title }}</span>
				</template>
			</el-table-column>
			<el-table-column
				label="地址"
				width="120"
				align="center"
				:show-overflow-tooltip="true"
			>
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.address }}</span>
				</template>
			</el-table-column>
			<el-table-column label="时间" width="190">
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ scope.row.date }}</span>
				</template>
			</el-table-column>
			<el-table-column label="价格" width="70" align="center">
				<template slot-scope="scope">
					<i class="">￥</i>
					<span style="margin-left: 10px">{{ scope.row.price }}</span>
				</template>
			</el-table-column>
			<el-table-column label="创建者" width="200" prop="email" sortable>
				<template slot-scope="scope">
					<i class="el-icon-message"></i>
					<span style="margin-left: 10px">{{ scope.row.email }}</span>
				</template>
			</el-table-column>
			<el-table-column label="接单者" width="200" prop="email" sortable>
				<template slot-scope="scope">
					<i class="el-icon-message"></i>
					<span style="margin-left: 10px">{{ scope.row.orderUser === null ? '未接单' : scope.row.orderUser }}</span>
				</template>
			</el-table-column>
			<el-table-column label="是否接单" width="80" align="center">
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.is_order }}</span>
				</template>
			</el-table-column>
			<el-table-column label="是否完成" width="80" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.is_finish }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
						size="mini"
						@click="handleEdit(scope.$index, scope.row)"
						v-if="scope.row.is_finish === '否' && scope.row.email === user"
						>编辑</el-button
					>
					<el-dialog title="修改内容" :visible.sync="editShow" width="30%">
						<el-form
							:model="ruleForm"
							:rules="rules"
							ref="ruleForm"
							label-width="100px"
							class="demo-ruleForm"
						>
							<el-form-item label="打包内容" prop="title">
								<el-input v-model="ruleForm.title"></el-input>
							</el-form-item>
							<el-form-item label="送达地方" prop="address">
								<el-input v-model="ruleForm.address"></el-input>
							</el-form-item>
							<el-form-item label="订单时间" required>
								<el-col :span="11">
									<el-form-item prop="date1">
										<el-date-picker
											type="date"
											value-format="yyyy-MM-dd"
											placeholder="选择日期"
											v-model="ruleForm.date1"
											style="width: 100%"
											:picker-options="pickerOptions"
										></el-date-picker>
									</el-form-item>
								</el-col>
								<el-col class="line" :span="2">-</el-col>
								<el-col :span="11">
									<el-form-item prop="date2">
										<el-time-picker
											placeholder="选择时间"
											v-model="ruleForm.date2"
											style="width: 100%"
											:picker-options="{
												selectableRange: '9:00:00 - 20:30:00',
											}"
										></el-time-picker>
									</el-form-item>
								</el-col>
							</el-form-item>
							<el-form-item label="金额" prop="price">
								<el-input v-model="ruleForm.price"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitForm('ruleForm')"
									>修改</el-button
								>
								<el-button @click="editShow = false">取消</el-button>
							</el-form-item>
						</el-form>
					</el-dialog>
					<el-button
						size="mini"
						type="danger"
						v-if="scope.row.email === user"
						@click="handleDelete(scope.$index, scope.row)"
						>删除</el-button
					>
					<el-button
						size="mini"
						type="danger"
						:disabled="scope.row.is_order === '否'"
						@click="cancelOrder(scope.$index, scope.row)"
						v-if="scope.row.is_finish === '否' && scope.row.email !== user"
						>取消接单</el-button
					>
					<el-button
						size="mini"
						:disabled="
							scope.row.is_order === '否' || scope.row.is_finish === '是'
						"
						@click="finishOrder(scope.$index, scope.row)"
						v-show="scope.row.email !== user"
					>
						{{ scope.row.is_finish === "是" ? "已完成" : "完成接单" }}
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="block">
			<el-pagination
				:page-size="8"
				:page-sizes="[this.tableData.length]"
				@size-change="pageSizeChange"
				@current-change="currentChange"
				:current-page="this.currentPage"
				layout="total, prev, pager, next, jumper"
				:total="this.tableData.length"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			editShow: false,
			tableData: [],
			user: "",
			ruleForm: {
				title: "",
				address: "",
				date1: "",
				date2: "",
				price: "",
				id: "",
			},
			rules: {
				title: [
					{ required: true, message: "请输入打包内容", trigger: "blur" },
					{
						min: 5,
						max: 80,
						message: "长度在 5 到 80 个字符",
						trigger: "blur",
					},
				],
				address: [
					{ required: true, message: "请输入地址", trigger: "blur" },
					{
						min: 5,
						max: 80,
						message: "长度在 5 到 80 个字符",
						trigger: "blur",
					},
				],
				date1: [
					{
						type: "string",
						required: true,
						message: "请选择日期",
						trigger: "change",
					},
				],
				date2: [
					{
						type: "date",
						required: true,
						message: "请选择时间",
						trigger: "change",
					},
				],
				price: [{ required: true, message: "请输入金额", trigger: "blur" }],
				desc: [{ required: true, message: "请填写留言", trigger: "blur" }],
			},
			// 判断日期的
			pickerOptions: {
				disabledDate(time) {
					//选择的日期大于等于当前日期（包含今天）
					return time.getTime() < Date.now() - 8.64e7
					//若选择的日期大于当前日期（不包含今天）： time.getTime() < Date.now()
					//若选择的日期小于当前日期(不包含今天)： time.getTime() > Date.now() - 8.64e7
					//若选择的日期小于等于当前日期（包含今天）： time.getTime() > Date.now()
				},
			},
			// 分页
			pageSize: 8,
			currentPage: 1,
		}
	},
	methods: {
		// 获取所有打包信息
		async getExpress() {
			const res = await this.$store.dispatch("express/getExpress")
			this.tableData = res.result
		},
		// 修改按钮
		handleEdit(index, row) {
			this.editShow = true
			// 动态拿到每行的id,由于table的scope.$index在el-dialog中失效的情况
			this.ruleForm.id = row.id
			// 让修改动态显示内容
			this.ruleForm.title = row.title
			this.ruleForm.address = row.address
			this.ruleForm.price = row.price
		},
		// 格式化时间
		formate(time) {
			const d = new Date(time)
			const resTime =
				p(d.getHours()) + ":" + p(d.getMinutes()) + ":" + p(d.getSeconds())
			function p(s) {
				return s < 10 ? "0" + s : s
			}
			return resTime
		},
		// 提交修改
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					const data = {
						id: this.ruleForm.id,
						title: this.ruleForm.title,
						address: this.ruleForm.address,
						date: this.ruleForm.date1 + " " + this.formate(this.ruleForm.date2),
						price: this.ruleForm.price,
						email: this.user,
					}
					// 发送请求
					this.$store.dispatch("express/updateExpress", data)
					this.$message.success("修改成功")
					this.$router.go(0)
					// 让dialog隐藏
					this.editShow = false
				} else {
					console.log("error submit!!")
					return false
				}
			})
		},
		// 删除
		async handleDelete(index, row) {
			this.$confirm("是否删除", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					const data = {
						id: row.id,
						email: this.user,
					}
					this.$store.dispatch("express/deleteExpress", data)
					this.$message({
						type: "success",
						message: "删除成功!",
					})
					this.$router.go(0)
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					})
				})
		},
		// 取消
		async cancelOrder(index, row) {
			this.$confirm("是否取消接单", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					const data = {
						id: row.id,
						email: row.email,
						orderUser: this.user,
						is_order: "否",
					}
					this.$store.dispatch("express/updateExpress", data)
					this.$message({
						type: "success",
						message: "撤销成功!",
					})
					this.$router.go(0)
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "取消",
					})
				})
		},
		// 完成接单
		async finishOrder(index, row) {
			this.$confirm("是完成订单", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					const data = {
						id: row.id,
						email: row.email,
						orderUser: this.user,
						is_finish: "是",
					}
					this.$store.dispatch("express/updateExpress", data)
					this.$message({
						type: "success",
						message: "已完成",
					})
					this.$router.go(0)
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "取消",
					})
				})
		},
		// 分页
		pageSizeChange() {
			console.log("当前页数据条数变化")
		},
		currentChange(val) {
			this.currentPage = val
		},
	},
	mounted() {
		this.getExpress()
		// 获取localStorage里的用户名
		this.user = JSON.parse(localStorage.getItem("admin")).data.result.userInfo.email
	},
}
</script>

<style scoped lang="less">
.expressContent {
	height: 75vh;
	position: relative;
	.block {
		position: absolute;
		bottom: 0;
		left: 35%;
	}
}
</style>
