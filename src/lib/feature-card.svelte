<script lang="ts">
	export let src: string
	export let company: string
	export let imgWidth: string | undefined = undefined
</script>

<div>
	<img class="w-[var(--img-width)]" style:--img-width={imgWidth ?? "auto"} {src} alt="">
	<hr class="max-w-[20px] text-black-300 border-black-300 border-y-[1px] mt-5">

	<h2 class="text-black-300 uppercase text-[22px] font-bold tracking-tight mt-[100px]">{company}</h2>

	<p class="mt-5 font-normal">
		<slot />
	</p>
</div>
