<script lang="ts">
	export let href = '/';
	export let src: string;
	export let title: string;
	export let tag: 'work' | 'awards' | 'press';
	export let date: Date;
</script>

<a
	{href}
	class="group grid w-full grid-cols-[588px,1fr,max-content] grid-rows-[1fr,max-content] justify-items-start border-t border-black-300 pt-5 text-black-300 dark:text-pink-300 gap-x-5"
>
	<div class="row-span-2 overflow-hidden">
		<img
			class="scale-105 transition-transform duration-[250ms] group-hover:scale-100"
			{src}
			alt=""
		/>
	</div>
	<h2 class="inline h-auto self-start w-full max-w-[842px] text-[42px] font-medium uppercase leading-[1.1]">{title}</h2>
	<p class="col-start-2 row-start-2">
		<span class="uppercase font-bold tracking-tight text-[14px]">{tag}</span> 
		<span>{date}</span>
	</p>
	<img class="row-span-2 w-[30px] h-[30px]" src="/right-arrow.svg" alt="" />
</a>

<style>
	h2 {
		background-image: linear-gradient(theme('colors.black.300'), theme('colors.black.300'));
		background-size: 0% 3px;
		background-position: 0 100%;
		background-repeat: no-repeat;
		transition: background-size 250ms ease-in-out;
	}

	a:hover h2 {
		background-size: 100% 3px;
		background-position: left bottom;
	}
</style>
