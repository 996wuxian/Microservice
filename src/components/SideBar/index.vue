<template>
	<div class="sidebarPage">
		<div v-for="(item, index) in navItem" :key="index" class="nav">
			<div class="navItem" @click="toggle(item)">
				<!-- 图标 -->
				<div class="icon"><i :class="item.icon"></i></div>
				<!-- title -->
				<!-- 不写高度时可以给内容写死高度，例如.text给死字体高度，就不会造成塌陷 -->
				<div v-show="!textShow" class="text">{{ item.title }}</div>
				<!-- 展开箭头 -->
				<div v-show="item.children" :class="childrenOpen ? 'down' : 'up'">
					<i v-show="!textShow" class="el-icon-arrow-down"></i>
				</div>
			</div>
			<!-- !!!!如果有孩子，且childrenOpen为真，就绑定样式!!!! -->
			<div
				:class="item.children && childrenOpen ? 'childBoxOpen' : 'childBox'"
			>
				<!-- 儿子(如果有儿子，且open为真就显示) -->
				<div v-show="item.children && childrenOpen">
					<!-- 遍历item里的children -->
					<div
						v-for="(child, i) in item.children"
						:key="i"
						class="listItemChild"
						@click="toggle(child)"
					>
						<div>{{ child.title }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "sidebar",
	data() {
		return {
			navItem: [],
		}
	},
	methods: {
		toggle(item) {
			if (item.children) {
				this.$store.commit("sidebar/SubmenuOpen")
			} else {
				this.$router.push({
					name: item.name,
				})
				// 添加changeBg属性
				// item.changeBg = true
				// // 添加delete属性,由于state里已经定义了首页和文档的，这个是后续添加上的
				// item.deleteIcon = true
				// this.$store.commit("addCrumbsItem", item)
				// this.$store.commit("initCrumbsTitle", item)
			}
		},
	},
	computed: {
		textShow() {
			return this.$store.state.page.SideBarIndent
		},
		// 用vuex来存一个open来控制子菜单打开与关闭
		childrenOpen() {
			return this.$store.state.sidebar.SubmenuOpen
		},
	},
	mounted() {
		this.navItem = this.$store.state.sidebar.NavItem
	},
}
</script>

<style scoped lang="less">
.sidebarPage {
	width: 100%;
	height: 100vh;
	background-color: #304156;
	.nav {
		width: 100%;
		overflow: hidden;
		color: rgb(191, 203, 217);
		background-color: #304156;
		transition: background-color 0.3s;
		line-height: 56px;
		.icon {
			padding: 0 20px;
		}
		.navItem {
			display: flex;
			.text {
				height: 56px;
			}
			.down {
				margin-left: 20px;
				transition: all 0.3s;
			}
			.up {
				margin-left: 20px;
				transform: rotate(180deg);
				transition: all 0.3s;
			}
		}
	}
	.nav:hover {
		background-color: #263445;
		transition: background-color 0.3s;
	}
	.childBox {
		height: 0px;
		transition: all 0.2s;
	}
	.childBoxOpen {
		overflow: hidden;
		height: 224px;
		transition: all 0.2s;
	}
	.listItemChild {
		background-color: #1f2d3d;
		transition: background-color 0.3s;
		padding: 0 45px;
	}
	.listItemChild:hover {
		background-color: #001528;
		transition: background-color 0.3s;
	}
}
.increase {
	width: 100%;
	transition: all 0.3s;
}
</style>
