<script lang="ts">
	export let title: string;
</script>

<div class="flex flex-col">
	<h2
		class="mb-4 flex items-center gap-2 text-[14px] md:text-[18px] font-medium uppercase text-white-300 before:h-[14px] before:w-[14px] before:rounded-full before:bg-white-300 before:content-['']"
	>
		{title}
	</h2>
	<slot />
</div>

<style lang="scss">
	div > :global(a),
	div :global(address) {
		@apply text-[14px] font-normal not-italic text-white-300;


		@media (min-width: 768px) {
			font-size: 16px;
		}
	}
		
	div > :global(a:hover) {
		@apply underline;
	}
</style>
