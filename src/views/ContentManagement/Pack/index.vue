<template>
	<div class="pack">
		<div class="nav"><navbar></navbar></div>
		<div class="crumbs"><crumbs></crumbs></div>
    <div><addPack></addPack></div>
		<!-- <div class="addPack">
			<el-button type="text" @click="dialogVisible = true" class="dialogBtn"
				>添加内容</el-button
			>
			<el-dialog title="添加内容" :visible.sync="dialogVisible" width="30%">
				<el-form
					:model="ruleForm"
					:rules="rules"
					ref="ruleForm"
					label-width="100px"
					class="demo-ruleForm"
				>
					<el-form-item label="打包内容" prop="packTitle">
						<el-input v-model="ruleForm.packTitle"></el-input>
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
							>立即创建</el-button
						>
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
		</div> -->
		<div class="packContent">
			<el-table :data="tableData" style="width: 100%">
				<el-table-column
					label="标题"
					width="200"
					align="center"
					:show-overflow-tooltip="true"
					class="table"
				>
					<template slot-scope="scope">
						<span>{{ scope.row.packTitle }}</span>
					</template>
				</el-table-column>
				<el-table-column
					label="地址"
					width="200"
					align="center"
					:show-overflow-tooltip="true"
				>
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.address }}</span>
					</template>
				</el-table-column>
				<el-table-column label="时间" width="200">
					<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<span style="margin-left: 10px">{{ scope.row.pack_data }}</span>
					</template>
				</el-table-column>
				<el-table-column label="价格" width="100" align="center">
					<template slot-scope="scope">
						<i class="">￥</i>
						<span style="margin-left: 10px">{{ scope.row.price }}</span>
					</template>
				</el-table-column>
				<el-table-column label="用户" width="240">
					<template slot-scope="scope">
						<i class="el-icon-message"></i>
						<span style="margin-left: 10px">{{ scope.row.email }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
							>编辑</el-button
						>
						<el-dialog
							title="添加内容"
							:visible.sync="dialogVisible"
							width="30%"
						>
							<el-form
								:model="ruleForm"
								:rules="rules"
								ref="ruleForm"
								label-width="100px"
								class="demo-ruleForm"
							>
								<el-form-item label="打包内容" prop="packTitle">
									<el-input v-model="ruleForm.packTitle"></el-input>
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
								<!-- <el-form-item label="留言" prop="desc">
						<el-input type="textarea" v-model="ruleForm.desc"></el-input>
					</el-form-item> -->
								<el-form-item>
									<el-button type="primary" @click="submitForm('ruleForm')"
										>立即创建</el-button
									>
									<el-button @click="resetForm('ruleForm')">重置</el-button>
								</el-form-item>
							</el-form>
						</el-dialog>
						<el-button
							size="mini"
							type="danger"
							@click="handleDelete(scope.$index, scope.row)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
import navbar from "@/components/Navbar"
import crumbs from "@/components/Crumbs"
import addPack from '@/components/Pack/addPack.vue'

export default {
	components: {
		navbar,
		crumbs,
    addPack
	},
	data() {
		return {
			dialogVisible: false,
			ruleForm: {
				packTitle: "",
				address: "",
				date1: "",
				date2: "",
				price: "",
				desc: "",
			},
			rules: {
				packTitle: [
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
			tableData: [],
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					const username = JSON.parse(localStorage.getItem("admin"))
					const data = {
						packTitle: this.ruleForm.packTitle,
						address: this.ruleForm.address,
						pack_data:
							this.ruleForm.date1 + " " + this.formate(this.ruleForm.date2),
						price: this.ruleForm.price,
						email: username.data.result.username,
					}
					// 发送请求
					this.$store.dispatch("pack/addPack", data)
					// 提交后重置内容
					this.$refs[formName].resetFields()
					this.$message.success("添加成功")
					// 让dialog隐藏
					this.dialogVisible = false
				} else {
					console.log("error submit!!")
					return false
				}
			})
		},
		// 重置内容
		resetForm(formName) {
			this.$refs[formName].resetFields()
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
		// 获取所有打包信息
		async getPack() {
			const res = await this.$store.dispatch("pack/getPack")
			this.tableData = res.result
		},
		async handleEdit() {
			console.log("123")
		},
	},
	mounted() {
		this.getPack()
	},
}
</script>

<style scoped lang="less">
.pack {
	height: 100vh;
}
.addPack {
	margin: 10px 17px;
}
.dialogBtn {
	padding: 10px 10px;
	border: 1px solid #40b8ff;
}
</style>
