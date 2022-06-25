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
	class="group grid w-full grid-cols-[1fr,max-content] grid-rows-[1fr,repeat(2,max-content)] md:grid-cols-[588px,1fr,max-content] md:grid-rows-[1fr,max-content] justify-items-start gap-x-5 border-t border-black-300 pt-5 text-black-300 dark:text-pink-300"
>
	<div class="col-span-2 md:col-auto md:row-span-2 overflow-hidden">
		<img
			loading="lazy"
			class="scale-105 transition-transform duration-[250ms] group-hover:scale-100"
			{src}
			alt=""
		/>
	</div>

	<h2
		class="col-span-2 md:col-auto h-auto w-full max-w-[842px] self-start text-[24px] mt-5 md:mt-0 md:text-[42px] font-medium uppercase leading-[1.1] group-hover:underline"
	>
		{title}
	</h2>
	<p class="md:col-start-2 md:row-start-2 text-[14px] self-end md:self-auto">
		<span class="font-bold uppercase tracking-tight">{tag}</span>
		<span class="ml-2 text-[14px] font-medium"
			>{DateTime.fromJSDate(date).toFormat('dd.LL.yyyy')}</span
		>
	</p>
	<img loading="lazy" class="mt-5 md:mt-0 self-center md:self-auto md:row-span-2 h-[30px] w-[30px]" src="/right-arrow.svg" alt="" />
</a>
