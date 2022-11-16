<template>
	<div class="register" :class="isShow ? 'registerShow' : ''">
		<div class="content" v-show="isShow">
			<div class="register-logo">
				<img src="@/assets/img/Login/register-logo.png" alt="" />
			</div>
			<div class="registerInput">
				<div class="form-control">
					<input
						type="value"
						required=""
						v-model.trim="email"
						@blur="check()"
						@keyup="clearBtnShow()"
					/>
					<label>
						<span style="transition-delay: 0ms">N</span>
						<span style="transition-delay: 50ms">e</span>
						<span style="transition-delay: 100ms">w</span>
						<span style="transition-delay: 150ms">e</span>
						<span style="transition-delay: 200ms">m</span>
						<span style="transition-delay: 250ms">a</span>
						<span style="transition-delay: 300ms">i</span>
						<span style="transition-delay: 350ms">l</span>
					</label>
					<div class="close" v-show="CloseShow" @click="clearValue">
						<i class="el-icon-circle-close"></i>
					</div>
				</div>
				<div class="form-control">
					<input
						:type="openPassword ? 'password' : 'text'"
						required=""
						v-model.trim="password"
						@blur="confirmPassword()"
						@keyup="openIconShow()"
					/>
					<label>
						<span style="transition-delay: 0ms">N</span>
						<span style="transition-delay: 50ms">e</span>
						<span style="transition-delay: 100ms">w</span>
						<span style="transition-delay: 150ms">P</span>
						<span style="transition-delay: 200ms">a</span>
						<span style="transition-delay: 100ms">s</span>
						<span style="transition-delay: 150ms">s</span>
						<span style="transition-delay: 200ms">w</span>
						<span style="transition-delay: 250ms">o</span>
						<span style="transition-delay: 300ms">r</span>
						<span style="transition-delay: 350ms">d</span>
					</label>
					<div class="close" @click="openPasswordBtn" v-show="openShow">
						<i :class="openPassword ? 'el-icon-turn-off' : 'el-icon-open'"></i>
					</div>
				</div>
				<div class="form-control">
					<input
						:type="openPassword ? 'password' : 'text'"
						required=""
						v-model.trim="againPassword"
						@blur="confirmPassword()"
						@keyup="openIconShow()"
					/>
					<label>
						<span style="transition-delay: 0ms">A</span>
						<span style="transition-delay: 50ms">g</span>
						<span style="transition-delay: 150ms">a</span>
						<span style="transition-delay: 200ms">i</span>
						<span style="transition-delay: 250ms">n</span>
						<span style="transition-delay: 300ms">P</span>
						<span style="transition-delay: 350ms">a</span>
						<span style="transition-delay: 400ms">s</span>
						<span style="transition-delay: 450ms">s</span>
						<span style="transition-delay: 500ms">w</span>
						<span style="transition-delay: 550ms">o</span>
						<span style="transition-delay: 600ms">r</span>
						<span style="transition-delay: 650ms">d</span>
					</label>
					<div class="close" @click="openPasswordBtn" v-show="openShow">
						<i :class="openPassword ? 'el-icon-turn-off' : 'el-icon-open'"></i>
					</div>
				</div>
				<div class="form-control">
					<input type="value" required="" v-model.number.trim="code" />
					<label>
						<span style="transition-delay: 0ms">C</span>
						<span style="transition-delay: 50ms">o</span>
						<span style="transition-delay: 100ms">d</span>
						<span style="transition-delay: 150ms">e</span>
					</label>
				</div>
			</div>
			<div class="registerBtn" @click="register"><button>Register</button></div>
			<div class="cockBtn" @click="sendCock"><button>SendCock</button></div>
		</div>
	</div>
</template>

<script>

export default {
	name: "createUser",
	data() {
		return {
			email: "",
			password: "",
			againPassword: "",
			CloseShow: false,
			openPassword: true,
			openShow: false,
			code: '',
			checkEmail: false,
			checkPassword: false
		}
	},
	computed: {
		isShow() {
			return this.$store.state.login.registerShow
		},
	},
	methods: {
		check() {
			// 邮箱验证的正则表达式
			const EmailReg = /^[1-9][0-9]{5,10}@qq.com$/
			if (this.email != '') {
				if (EmailReg.test(this.email)) {
					// 这里是邮箱验证成功的代码
					this.checkEmail = true
				}  else {
					this.$message.warning("邮箱输入错误")
				} 
			} else {
				this.$message.warning("请输入邮箱")
			}
		},
		// 当Username输入内容时，让清除按钮显示
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
		// open的图标是否显示
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
		// 验证两次密码是否匹配
		confirmPassword() {
			if ( this.password == "" ) {
				this.$message.warning("密码不能为空")
			} else {
				// 密码验证的正则表达式
				const PasswordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
				if (PasswordReg.test(this.password)) {
						if (this.againPassword != this.password) {
						this.$message.warning("两次密码不匹配")
					} else {
						this.checkPassword = true
					}
				} else {
					this.$message.warning("密码格式错误")
				}
			}
		},
		// 请求
		async register() {
			let time = new Date()
			const data = {
				email: this.email,
				password: this.password,
				code: this.code,
				codeDate: time
			}
			if (this.checkEmail && this.checkPassword) {
				if (this.code == "") {
					this.$message.warning("请输入验证码")
				} else {
					const res = await this.$store.dispatch("register/handRegister", data)
					if (res) {
						(this.email = ""), (this.password = ""), (this.againPassword = ""), (this.code = "")
						this.$store.commit("login/isShow")
						this.$message.success('注册成功')
						this.checkPassword = false
						this.checkEmail = false
					}
				}
			} else {
				this.$message.warning("请输入正确的邮箱和密码")
			}
		},
    // 发送验证码
    async sendCock() {
			const data = {
				email: this.email,
			}
      if (this.checkEmail && this.checkPassword) {
        const res = await this.$store.dispatch('code/handCode', data)
        if (res) {
					this.$message.success("验证码已发送")
        }
      } 
			else {
        this.$message.warning('请输入邮箱和密码')
      }
    }
	},
}
</script>

<style scoped lang="less">
.register {
	position: relative;
	left: 300px;
	width: 0px;
	height: 500px;
	background-color: #313f4c;
	text-align: center;
	box-shadow: 2px 2px 10px #313f4c;
	z-index: 1;
	transition: all 0.3s;
	.content {
		width: 100%;
		height: 100%;
		.register-logo {
			width: 100%;
			height: 118px;
		}
		.register-logo img {
			position: absolute;
			top: 14px;
			width: 290px;
			left: 0;
		}
		.registerInput {
			position: absolute;
			left: 50px;
			margin-top: 14px;
			.form-control {
				position: relative;
				margin: 20px 0 20px;
				width: 190px;
				input {
					background-color: transparent;
					border: 0;
					border-bottom: 2px #fff solid;
					display: block;
					width: 100%;
					padding: 18px 0 2px;
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
					top: 18px;
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
					top: 20px;
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
		.registerBtn {
			position: absolute;
			width: 120px;
			height: 40px;
			bottom: 40px;
			left: 160px;
		}
		.cockBtn {
			position: absolute;
			width: 120px;
			height: 40px;
			bottom: 40px;
			left: 20px;
		}
		button {
			width: 120px;
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
.registerShow {
	width: 300px;
	transition: all 0.3s;
	overflow: hidden;
}
</style>
