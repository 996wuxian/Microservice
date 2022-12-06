<template>
	<div class="other">
		<div><addOther></addOther></div>
		<div><otherContent></otherContent></div>
	</div>
</template>

<script>
import addOther from "@/components/Other/addOther.vue"
import otherContent from "@/components/Other/otherContent.vue"

export default {
	components: {
		addOther,
		otherContent,
	},
}
</script>

<style scoped lang="less">
</style>
