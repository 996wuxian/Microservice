<template>
	<div class="pack">
		<div class="nav"><navbar></navbar></div>
		<div class="crumbs"><crumbs></crumbs></div>
		<div><addExpress></addExpress></div>
		<div><expressContent></expressContent></div>
	</div>
</template>

<script>
import navbar from "@/components/Navbar"
import crumbs from "@/components/Crumbs"
import addExpress from "@/components/Express/addExpress.vue"
import expressContent from "@/components/Express/expressContent.vue"

export default {
	components: {
		navbar,
		crumbs,
		addExpress,
		expressContent,
	},
}
</script>

<style scoped lang="less">
.pack {
	height: 100vh;
}
</style>
