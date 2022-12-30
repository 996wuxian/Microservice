<template>
	<div class="login" @keyup.13="login">
		<div class="login-logo">
			<img src="@/assets/img/Login/login-logo.png" alt="" />
		</div>
		<div class="loginInput">
			<div class="form-control">
				<input
					type="value"
					required=""
					v-model="email"
					@blur="check()"
					@keyup="clearBtnShow()"
				/>
				<label>
					<span style="transition-delay: 0ms">请</span>
					<span style="transition-delay: 50ms">输</span>
					<span style="transition-delay: 100ms">入</span>
					<span style="transition-delay: 150ms">邮</span>
					<span style="transition-delay: 200ms">箱</span>
				</label>
				<div class="close" v-show="CloseShow" @click="clearValue">
					<i class="el-icon-circle-close"></i>
				</div>
			</div>
			<div class="form-control">
				<!-- type也可以用v-bind绑定 -->
				<input
					:type="openPassword ? 'password' : 'text'"
					required=""
					v-model="password"
					@blur="check()"
					@keyup="openIconShow()"
				/>
				<label>
					<span style="transition-delay: 0ms">请</span>
					<span style="transition-delay: 50ms">输</span>
					<span style="transition-delay: 100ms">入</span>
					<span style="transition-delay: 150ms">密</span>
					<span style="transition-delay: 200ms">码</span>
				</label>
				<div class="close" @click="openPasswordBtn" v-show="openShow">
					<i :class="openPassword ? 'el-icon-turn-off' : 'el-icon-open'"></i>
				</div>
			</div>
		</div>
		<div class="loginBtn"><button @click="login">登录</button></div>
		<div class="forgot" @click="showForgotPwd">忘记密码</div>
		<div class="registerText" @click="showRegister">注册</div>
	</div>
</template>

<script>
import { setLocalStorageAndTime } from "@/utils/auth"

export default {
	name: "userLogin",
	data() {
		return {
			email: "1640551913@qq.com",
			password: "wuxian123",
			// 清除按钮显示
			CloseShow: false,
			// 显示密码
			openPassword: true,
			//
			openShow: false,
			registerShow: "",
			allow: false,
		}
	},
	methods: {
		// 失去焦点验证输入框内容格式
		check() {
			// 邮箱验证的正则表达式
			// const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
			const reg = /^[1-9][0-9]{5,10}@qq.com$/
			let str = this.email
			if (reg.test(str)) {
				// 这里是邮箱验证成功的代码
				this.allow = true
			} else if (str === "") {
				this.$message({
					type: "warning",
					message: "请输入邮箱",
				})
			} else {
				this.$message.warning("邮箱输入错误")
			}
		},
		// 邮箱输入框清除按钮显示
		clearBtnShow() {
			if (this.email) {
				this.CloseShow = true
			} else {
				this.CloseShow = false
			}
		},
		// 点击清除按钮清除输入框的内容然后让清除按钮隐藏
		clearValue() {
			if (this.email) {
				this.email = ""
				this.CloseShow = false
			}
		},
		// 让显示密码显示或隐藏
		openIconShow() {
			if (this.password) {
				this.openShow = true
			} else {
				this.openShow = false
			}
		},
		// 让显示/隐藏密码按钮转换
		openPasswordBtn() {
			this.openPassword = !this.openPassword
		},
		// 请求
		async login() {
			const loginInfo = {
				email: this.email,
				password: this.password,
			}
			if (this.email && this.password && this.allow) {
				const res = await this.$store.dispatch("login/handLogin", loginInfo)
				setLocalStorageAndTime("admin", res)
				if (res) {
					this.$message.success("登录成功")
					this.password = ""
					this.CloseShow = false
					this.openShow = false
					this.$router.push("/layout")
				}
			}
		},
		// 显示register
		showRegister() {
			this.$store.commit("login/registerShow")
			// 隐藏ForgotPwd
			this.$store.commit("login/forgotPasswordHide")
			this.$store.commit("forgot/changeRegisterPage")
		},
		// 显示ForgotPwd
		showForgotPwd() {
			this.$store.commit("login/forgotPasswordShow")
			// 隐藏register
			this.$store.commit("login/registerHide")
			// 重新回到改变页面
			this.$store.commit("forgot/changeRegisterPage")
		},
	},
}
</script>

<style scoped lang="less">
.login {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 300px;
	height: 500px;
	background-color: #313f4c;
	text-align: center;
	box-shadow: 2px 2px 10px #313f4c;
	z-index: 2;
	color: #9cd4ea;
	.login-logo img {
		width: 280px;
	}
	.loginInput {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 10px;
		.form-control {
			position: relative;
			margin: 20px 0 15px;
			width: 190px;
			input {
				background-color: transparent;
				border: 0;
				border-bottom: 2px #fff solid;
				display: block;
				width: 100%;
				padding: 12px 0 2px;
				font-size: 16px;
				color: #fff;
			}
			input:focus,
			input:valid {
				outline: 0;
				border-bottom-color: lightblue;
			}
			label {
				position: absolute;
				top: 12px;
				left: 0;
				pointer-events: none;
				span {
					display: inline-block;
					font-size: 18px;
					min-width: 5px;
					color: #fff;
					transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
				}
			}
			.close {
				position: absolute;
				top: 14px;
				right: 0;
				color: #fff;
			}
		}
		.form-control input:focus + label span,
		.form-control input:valid + label span {
			color: lightblue;
			transform: translateY(-30px);
		}
	}
	.forgot {
		width: 100%;
		height: 40px;
		line-height: 40px;
		cursor: pointer;
	}
	.forgot:hover {
		transition: all 0.3s;
		color: #fff;
	}
	.registerText {
		width: 100%;
		height: 40px;
		line-height: 40px;
		cursor: pointer;
	}
	.registerText:hover {
		transition: all 0.3s;
		color: #fff;
	}
	// 登录按钮
	.loginBtn {
		width: 100%;
		height: 40px;
		margin: 25px 0;
		button {
			width: 200px;
			height: 40px;
			border-radius: 10px;
			background-image: linear-gradient(to right, #6fd99bed, #62cdc1, #56c5f0);
			color: #fff;
			font-weight: 700;
			cursor: pointer;
			box-shadow: 0 5px #999;
		}
		button:hover {
			background-image: linear-gradient(to right, #56c5f0, #62cdc1, #6fd99bed);
		}
		button:active {
			box-shadow: 0 3px #666;
			transform: translateY(2px);
		}
	}
}
</style>
