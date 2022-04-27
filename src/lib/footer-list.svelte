<script lang="ts">
	export let title: string;
</script>

<div class="flex flex-col">
	<h2
		class="flex items-center mb-4 gap-2 text-[18px] font-medium uppercase text-white-300 before:h-[14px] before:w-[14px] before:rounded-full before:bg-white-300 before:content-['']"
	>
		{title}
	</h2>
	<slot />
</div>

<style>
	div > :global(a),
	div :global(address) {
		@apply text-[16px] not-italic font-normal text-white-300;
	}

	div > :global(a:hover) {
		@apply underline;
	}
</style>
