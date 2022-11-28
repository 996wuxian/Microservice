<template>
	<div class="pack">
		<div class="nav"><navbar></navbar></div>
		<div class="crumbs"><crumbs></crumbs></div>
		<div><addPack></addPack></div>
		<div><packContent></packContent></div>
	</div>
</template>

<script>
import navbar from "@/components/Navbar"
import crumbs from "@/components/Crumbs"
import addPack from "@/components/Pack/addPack.vue"
import packContent from "@/components/Pack/packContent.vue"

export default {
	components: {
		navbar,
		crumbs,
		addPack,
		packContent,
	},
}
</script>

<style scoped lang="less">
.pack {
	height: 100vh;
}
</style>
