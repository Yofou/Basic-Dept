<script lang="ts">
	import { DateTime } from 'luxon';

	export let href = '/';
	export let src: string;
	export let title: string;
	export let tag: 'work' | 'awards' | 'press';
	export let date: Date;
</script>

<a
	{href}
	class="group grid w-full grid-cols-[588px,1fr,max-content] grid-rows-[1fr,max-content] justify-items-start gap-x-5 border-t border-black-300 pt-5 text-black-300 dark:text-pink-300"
>
	<div class="row-span-2 overflow-hidden">
		<img
			class="scale-105 transition-transform duration-[250ms] group-hover:scale-100"
			{src}
			alt=""
		/>
	</div>
	<h2
		class="h-auto w-full max-w-[842px] self-start text-[42px] font-medium uppercase leading-[1.1] group-hover:underline"
	>
		{title}
	</h2>
	<p class="col-start-2 row-start-2 text-[14px]">
		<span class="font-bold uppercase tracking-tight">{tag}</span>
		<span class="ml-2 text-[14px] font-medium"
			>{DateTime.fromJSDate(date).toFormat('dd.LL.yyyy')}</span
		>
	</p>
	<img class="row-span-2 h-[30px] w-[30px]" src="/right-arrow.svg" alt="" />
</a>
