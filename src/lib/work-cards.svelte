<script lang="ts">
	export let title: string;
	export let description: string;
</script>

<a href="/" class="group">
	<div class="overflow-hidden">
		<div class="scale-105 transition-transform duration-500 group-hover:scale-100"><slot /></div>
	</div>
	<h1 class="m-5 max-w-max text-[22px] font-medium uppercase tracking-tighter text-black-full">
		{title}
	</h1>
	<p
		class="m-5 -mt-4 max-w-[268px] text-[14px] font-medium uppercase leading-[1.1] tracking-tight text-black-300"
	>
		{description}
	</p>
</a>

<style>
	a h1 {
		background-image: linear-gradient(theme('colors.black.full'), theme('colors.black.full'));
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
