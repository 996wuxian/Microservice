<template>
	<div class="navbar">
		<div class="content">
			<div class="menu_left">
				<div class="icon" @click="indentBtn">
					<i class="el-icon-s-fold" :class="flipBtn ? 'flip' : 'flipAfter'"></i>
				</div>
				<!-- 遍历路径信息 -->
				<div class="title" v-for="(item, i) in currPath" :key="i">
					{{ item.title }}
					<span v-show="CrumbsIsShow(item, i)"> / </span>
				</div>
			</div>
			<!-- 个人中心板块 -->
			<div class="personal" @click="btnPersonal">
				<div class="logo"><img src="" alt="" /></div>
				<div
					class="personalIcon"
					:class="rotate ? 'personalIconRotate' : 'personalIconRotated'"
				>
					<i :class="rotate ? 'el-icon-s-tools' : 'el-icon-setting'"></i>
				</div>
				<!-- 控制高度变化transition -->
				<div class="personalContent">
					<!-- 倒三角 -->
					<div class="triangle" v-show="rotate"></div>
					<!-- 控制外边框 -->
					<div class="mask" :class="rotate ? 'maskOpen' : 'mask'">
						<!-- 控制flex布局 -->
						<div class="list" v-show="rotate">
							<div @click="person">个人中心</div>
							<div @click="toHome">首页</div>
							<div><a href="">项目地址</a></div>
							<div class="loginOut" @click="loginOut">退出登录</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { removeToken } from '@/utils/auth'

export default {
	name: "navbar",
	data() {
		return {
			title: "",
			flipBtn: false,
			rotate: false,
			currPath: [], // 用来装vuex存的路径信息
		}
	},
	methods: {
		// 缩进按钮
		indentBtn() {
			this.$store.commit('page/changeSideBar')
			this.flipBtn = this.$store.state.page.SideBarIndent
			// 让有children的菜单打开时，点缩进按钮让其关闭,并让二级菜单的字体隐藏
			if (this.flipBtn) {
			  this.$store.commit('sidebar/SubmenuClose')
			}
		},
		// 个人中心按钮
		btnPersonal() {
			this.rotate = !this.rotate
		},
		// 面包屑斜线
		CrumbsIsShow(e, i) {
			// 如果是1级菜单，则i=0，二级为 0 1
			// 当遍历出第一个item, 0 , 2 - 1 = 0? false, 结果为true, 显示斜杠
			// 当遍历出第二个item, 1 , 2 - 1 = 1? true, 结果为false, 隐藏斜杠
			return this.currPath.length - 1 == i ? false : true
		},
		// 前往个人中心
		person() {
			console.log('个人中心');
		},
		// 前往首页
		toHome() {
			this.$router.push({
				name: 'home'
			})
		},
		// 退出登录
		loginOut() {
			removeToken()
			this.$router.push({
				name: 'login'
			})
			this.$message.success('退出登录成功')
		}
	},
	mounted() {
		if(this.$route.meta.title) {
		  this.title = this.$route.meta.title
		}
		// // 当页面加载完后，让vuex里存的路径给当前组件
		this.currPath = this.$store.state.sidebar.currPath
	},
}
</script>

<style scoped lang="less">
.navbar {
	border-bottom: 1px solid beige;
	.content {
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-around;
		line-height: 50px;
		.menu_left {
			flex-grow: 1;
			display: flex;
		}
		.icon {
			font-size: 20px;
			vertical-align: middle;
			padding: 0 16px;
			.flip {
				transform: rotateY(180deg);
				transition: all 0.3s;
			}
			.flipAfter {
				transition: all 0.3s;
			}
		}
		.title {
			color: #97a8be;
			float: left;
			span {
				margin: 0 5px;
			}
		}
		.personal {
			width: 94px;
			height: 40px;
			display: flex;
			line-height: 0;
			position: relative;
			.logo {
				width: 40px;
				height: 40px;
			}
			.logo img {
				width: 40px;
				height: 40px;
				box-shadow: 1px 1px 4px rgb(151, 168, 190, 0.6);
				border-radius: 3px;
				margin-top: 5px;
			}
			.personalIcon {
				position: absolute;
				width: 16px;
				height: 16px;
				left: 45px;
				top: 30px;
			}
			.personalIconRotate {
				transform: rotate(180deg);
				transition: all 0.3s;
			}
			.personalIconRotated {
				transition: all 0.33s;
			}
			.personalContent {
				position: absolute;
				top: 50px;
				left: -28px;
				height: 0px;
				width: 90px;
				font-size: 14px;
				.triangle {
					position: absolute;
					left: 45%;
					top: -4px;
					width: 0px;
					height: 0px;
					border: 7px solid transparent;
					border-bottom-color: #e1e9f3;
					z-index: 2;
				}
				.mask {
					box-shadow: 0px 1px 3px rgb(151, 168, 190, 0.6);
					width: 90px;
					margin-top: 10px;
					height: 0px;
					transition: all 0.3s;
					background-color: #fff;
					.list {
						display: flex;
						flex-direction: column;
						div {
							height: 32px;
							line-height: 32px;
							padding-left: 15px;
							background-color: #fff;
						}
						div:hover {
							color: #46a6ff;
							transition: all 0.3s;
							background-color: rgba(222, 231, 242, 0.9);
						}
						.loginOut {
							border-top: 1px solid rgba(222, 231, 242, 0.9);
						}
					}
				}
				.maskOpen {
					height: 140px;
					transition: all 0.3s;
					overflow: hidden;
				}
			}
		}
	}
}
</style>
