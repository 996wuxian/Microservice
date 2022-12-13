<template>
	<div class="personal">
		<div class="content">
			<div class="about"><div></div></div>
			<div class="myOrder"><div></div></div>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.personal {
	.content {
		width: 100%;
		display: flex;
		justify-content: space-between;
		height: 85vh;
		overflow: auto;
		.about {
			width: 25%;
			height: 575px;
			margin: 20px;
			box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
		}
		.myOrder {
			width: 75%;
			height: 700px;
			margin: 20px;
			box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
		}
	}
}
</style>
