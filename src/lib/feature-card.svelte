<script lang="ts">
	export let src: string;
	export let company: string;
	export let imgWidth: string | undefined = undefined;
</script>

<div class="transition-colors">
	<img class="w-[var(--img-width)]" style:--img-width={imgWidth ?? 'auto'} {src} alt="" />
	<hr class="mt-5 max-w-[20px] border-y-[1px] border-black-300 text-black-300" />

	<h2
		class="mt-[100px] text-[22px] font-bold uppercase tracking-tight text-black-300 dark:text-pink-300"
	>
		{company}
	</h2>

	<p class="mt-5 font-normal dark:text-pink-300">
		<slot />
	</p>
</div>
