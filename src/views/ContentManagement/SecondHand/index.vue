<template>
	<div class="pack">
		<div class="nav"><navbar></navbar></div>
		<div class="crumbs"><crumbs></crumbs></div>
		<div><addSecondHand></addSecondHand></div>
		<div><secondHandContent></secondHandContent></div>
	</div>
</template>

<script>
import navbar from "@/components/Navbar"
import crumbs from "@/components/Crumbs"
import addSecondHand from "@/components/SecondHand/addSecondHand.vue"
import secondHandContent from "@/components/SecondHand/secondHandContent.vue"

export default {
	components: {
		navbar,
		crumbs,
		addSecondHand,
		secondHandContent,
	},
}
</script>

<style scoped lang="less">
.pack {
	height: 100vh;
}
</style>
