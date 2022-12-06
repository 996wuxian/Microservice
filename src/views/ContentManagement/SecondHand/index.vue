<template>
	<div class="pack">
		<div><addSecondHand></addSecondHand></div>
		<div><secondHandContent></secondHandContent></div>
	</div>
</template>

<script>
import addSecondHand from "@/components/SecondHand/addSecondHand.vue"
import secondHandContent from "@/components/SecondHand/secondHandContent.vue"

export default {
	components: {
		addSecondHand,
		secondHandContent,
	},
}
</script>

<style scoped lang="less">
</style>
