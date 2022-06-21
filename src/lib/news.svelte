<script>
	import Button from './button.svelte';
	import NewsCard from './news-card.svelte';
</script>

<section class="mt-[180px] flex flex-col gap-4 md:gap-20">
	<h1 class="sr-only">Featured News</h1>

	<div class="grid grid-cols-2">
		<h1
			class="max-w-[6ch] text-[42px] font-bold uppercase leading-[1.1] tracking-tight text-black-300 dark:text-pink-300"
		>
			Featured News
		</h1>
		<Button class="self-center justify-self-end dark:text-pink-300">View All</Button>
	</div>

	<NewsCard
		src="/news-1.jpg"
		title="a fresh collab with brixton just in time for spring"
		tag="work"
		date={new Date(Date.now())}
	/>

	<NewsCard
		src="/news-2.png"
		title="BASIC® Earns 12 Nominations in 26th Annual Webby Awards"
		tag="awards"
		date={new Date(Date.now())}
	/>

	<NewsCard
		src="/news-3.png"
		title="Patagonia Recognized for Environmental Impact at The Inaugural Anthem Awards"
		tag="awards"
		date={new Date(Date.now())}
	/>

	<NewsCard
		src="/news-4.jpg"
		title="Cowboy and BASIC® Recognized Across 8 Categories"
		tag="awards"
		date={new Date(Date.now())}
	/>

	<NewsCard
		src="/news-5.png"
		title="FAST CO.: BASIC® and KFC Team Up for a Digital Overhaul"
		tag="press"
		date={new Date(Date.now())}
	/>

	<NewsCard
		src="/news-6.jpg"
		title="BASIC® and Webex Champion “Hybrid Collaboration” As Next Evolution of Workplace Culture"
		tag="press"
		date={new Date(Date.now())}
	/>

	<NewsCard
		src="/news-7.png"
		title="BASIC recognized with 2020 Star Award for Technology by KFC"
		tag="awards"
		date={new Date(Date.now())}
	/>
</section>
