<template>
	<div class="addPack">
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
				<el-form-item label="信息内容" prop="title">
					<el-input v-model.trim="ruleForm.title"></el-input>
				</el-form-item>
				<el-form-item label="发送时间" required>
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
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')"
						>立即创建</el-button
					>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: "addInfo",
	components: {},
	data() {
		return {
			dialogVisible: false,
			ruleForm: {
				title: "",
				date1: "",
				date2: "",
			},
			rules: {
				title: [
					{ required: true, message: "请输入内容", trigger: "blur" },
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
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					const userInfo = JSON.parse(localStorage.getItem("admin")).data.result.userInfo
					const data = {
						microUserId: userInfo.id,
						title: this.ruleForm.title,
						date: this.ruleForm.date1 + " " + this.formate(this.ruleForm.date2),
						email: userInfo.email,
					}
					// 发送请求
					this.$store.dispatch("other/addInfo", data)
					// 提交后重置内容
					this.$refs[formName].resetFields()
					this.$message.success("添加成功")
					this.$router.go(0)
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
	},
}
</script>

<style scoped lang="less">
.addPack {
	margin: 10px 17px;
}
.dialogBtn {
	padding: 10px 10px;
	border: 1px solid #40b8ff;
}
</style>
