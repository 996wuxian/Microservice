<template>
	<div class="express">
		<div><addExpress></addExpress></div>
		<div><expressContent></expressContent></div>
	</div>
</template>

<script>
import addExpress from "@/components/Express/addExpress.vue"
import expressContent from "@/components/Express/expressContent.vue"

export default {
	components: {
		addExpress,
		expressContent,
	},
}
</script>

<style scoped lang="less">
</style>
