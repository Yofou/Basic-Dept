<script lang="ts">
	export let title: string
	export let description: string
</script>

<a href="/" class="group">
	<div class="overflow-hidden">
		<div class="scale-105 group-hover:scale-100 transition-transform duration-500"><slot /></div>
	</div>
	<h1 class="m-5 max-w-max text-black-full font-medium uppercase text-[22px] tracking-tighter">{title}</h1>
	<p class="m-5 -mt-4 max-w-[268px] uppercase font-medium text-[14px] text-black-300 tracking-tight leading-[1.1]">{description}</p>
</a>

<style>
	a h1 {
		background-image: linear-gradient(theme("colors.black.full"), theme("colors.black.full"));
		background-repeat: no-repeat;
		background-position: right bottom;
		background-size: 0% 1px;
		transition: background-size 250ms ease-in-out;
	}

	a:hover h1 {
		background-size: 100% 1px;
		background-position: left bottom;
	}
</style>
