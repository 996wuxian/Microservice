<template>
	<div class="forgotPwd" :class="showForgotPwd ? 'forgotPwdShow' : ''">
		<div class="content" v-show="showForgotPwd">
			<div class="forgotPwdShow-logo">
				<img src="@/assets/img/Login/change-logo.png" alt="" />
			</div>
			<div class="forgotPwdShowInput">
				<div class="form-control" v-show="ecInputShow">
					<input
						type="value"
						required=""
						v-model.trim="email"
						@blur="check()"
						@keyup="clearBtnShow()"
					/>
					<label>
						<span style="transition-delay: 0ms">E</span>
						<span style="transition-delay: 50ms">m</span>
						<span style="transition-delay: 100ms">a</span>
						<span style="transition-delay: 150ms">i</span>
						<span style="transition-delay: 200ms">l</span>
					</label>
					<div class="close" v-show="CloseShow" @click="clearValue">
						<i class="el-icon-circle-close"></i>
					</div>
				</div>
				<div class="form-control" v-show="pwdInputShow">
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
				<div class="form-control" v-show="pwdInputShow">
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
				<div class="form-control" v-show="ecInputShow">
					<input type="value" required="" v-model.number.trim="code" />
					<label>
						<span style="transition-delay: 0ms">C</span>
						<span style="transition-delay: 50ms">o</span>
						<span style="transition-delay: 100ms">d</span>
						<span style="transition-delay: 150ms">e</span>
					</label>
				</div>
			</div>
			<div class="cockBtn" @click="sendCock" v-show="ecInputShow"><button>SendCock</button></div>
			<div class="confirm" @click="confirmed" v-show="ecInputShow"><button>Confirm</button></div>
			<div class="changeBtn" @click="change" v-show="pwdInputShow"><button>Change</button></div>
		</div>
	</div>
</template>

<script>

export default {
	name: "forgotPassword",
	data() {
		return {
			email: "",
			getEmail: '',
			password: "",
			againPassword: "",
      // 
			CloseShow: false,
			openPassword: true,
			openShow: false,
			code: '',
      // 
			checkEmail: false,
			checkPassword: false,
		}
	},
	computed: {
		showForgotPwd() {
			return this.$store.state.login.forgotPasswordShow
		},
		pwdInputShow() {
			return this.$store.state.forgot.pwdInputShow
		},
		ecInputShow() {
			return this.$store.state.forgot.ecInputShow
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
			if (this.email.trim != '') {
				this.CloseShow = true
			} else {
				this.CloseShow = false
			}
		},
		// 点击清除按钮清除输入框的内容然后让清除按钮隐藏
		clearValue() {
			if (this.email.trim != '') {
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
					this.$message.warning("密码格式错误,密码需6位且包含数字和字母")
				}
			}
		},
		// 发送验证码
    async sendCock() {
			const data = {
				email: this.email,
			}
      if (this.checkEmail) {
        const res = await this.$store.dispatch('forgot/forgotCode', data)
        if (res) {
					this.$message.success("验证码已发送")
        }
      } 
			else {
        this.$message.warning('请输入邮箱')
      }
    },
		// 确认验证码和邮箱是否存在数据库
    async confirmed() {
			this.getEmail = this.email
			let time = new Date()
			const data = {
				email: this.email,
				code: this.code,
				codeTime: time
			}
			if (this.email && this.code) {
				// 查询请求的code是否和数据库的一样
        const res = await this.$store.dispatch('forgot/confirmChange', data)
				if (res) {
					this.$message.success('请输入新的密码')
					this.$store.commit('forgot/pwdInputShow')
					this.$store.commit('forgot/ecInputShow')
					// 在清空前将这个邮箱赋值给...
					this.email = ''
					this.code = ''
					// 让清除图标隐藏(bug)
					this.CloseShow = false
				}
			} else if(this.email === '') {
				this.$message.warning('请输入QQ邮箱')
			} else {
				this.$message.warning('请输入验证码')
			}
    },
    async change() {
			const data = {
				email: this.getEmail,
				password: this.password
				// 使用后要释放内存
			}
			if (this.password && this.againPassword) {
        const res = await this.$store.dispatch('forgot/handForgot', data)
				if (res) {
					this.$message.success('请输入新的密码')
					this.$store.commit('forgot/pwdInputShow')
					this.$store.commit('forgot/ecInputShow')
					// 在清空前将这个邮箱赋值给...
					this.email = ''
					this.code = ''
					// 让清除图标隐藏(bug)
					this.CloseShow = false
				}
			} else if(this.email === '') {
				this.$message.warning('请输入QQ邮箱')
			} else {
				this.$message.warning('请输入验证码')
			}
			this.$store.commit('login/forgotPasswordHide')
			this.$message.success('修改成功')
    }
  }
}
</script>

<style scoped lang="less">
.forgotPwd {
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
		.forgotPwdShow-logo {
			width: 100%;
			height: 118px;
		}
		.forgotPwdShow-logo img {
			position: absolute;
			top: 32px;
			width: 290px;
			left: 0;
		}
		.forgotPwdShowInput {
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
    .confirm {
      position: absolute;
			width: 120px;
			height: 40px;
			bottom: 160px;
			left: 160px;
    }
		.changeBtn {
			position: absolute;
			width: 200px;
			height: 40px;
			bottom: 160px;
			left: 47px;
		}
		.changeBtn button {
			width: 200px;
		}
		.cockBtn {
			position: absolute;
			width: 120px;
			height: 40px;
			bottom: 160px;
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
.forgotPwdShow {
	width: 300px;
	transition: all 0.3s;
	overflow: hidden;
}
</style>
