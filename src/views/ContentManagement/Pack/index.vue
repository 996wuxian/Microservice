<template>
	<div class="pack">
		<div><addPack></addPack></div>
		<div><packContent></packContent></div>
	</div>
</template>

<script>
import addPack from "@/components/Pack/addPack.vue"
import packContent from "@/components/Pack/packContent.vue"

export default {
	components: {
		addPack,
		packContent,
	},
}
</script>

<style scoped lang="less">
</style>
