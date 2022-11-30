<template>
	<div class="pack">
		<div class="nav"><navbar></navbar></div>
		<div class="crumbs"><crumbs></crumbs></div>
		<div><addOther></addOther></div>
		<div><otherContent></otherContent></div>
	</div>
</template>

<script>
import navbar from "@/components/Navbar"
import crumbs from "@/components/Crumbs"
import addOther from "@/components/Other/addOther.vue"
import otherContent from "@/components/Other/otherContent.vue"

export default {
	components: {
		navbar,
		crumbs,
		addOther,
		otherContent,
	},
}
</script>

<style scoped lang="less">
.pack {
	height: 100vh;
}
</style>
