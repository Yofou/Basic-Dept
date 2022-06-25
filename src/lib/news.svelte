<script>
	import Button from './button.svelte';
	import NewsCard from './news-card.svelte';
	import news1 from '$static/news-1.jpg?webp';
	import news2 from '$static/news-2.png?webp';
	import news3 from '$static/news-3.png?webp';
	import news4 from '$static/news-4.jpg?webp';
	import news5 from '$static/news-5.png?webp';
	import news6 from '$static/news-6.jpg?webp';
	import news7 from '$static/news-7.png?webp';
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
		src={news1}
		title="a fresh collab with brixton just in time for spring"
		tag="work"
		date={new Date(Date.now())}
	/>

	<NewsCard
		src={news2}
		title="BASIC® Earns 12 Nominations in 26th Annual Webby Awards"
		tag="awards"
		date={new Date(Date.now())}
	/>

	<NewsCard
		src={news3}
		title="Patagonia Recognized for Environmental Impact at The Inaugural Anthem Awards"
		tag="awards"
		date={new Date(Date.now())}
	/>

	<NewsCard
		src={news4}
		title="Cowboy and BASIC® Recognized Across 8 Categories"
		tag="awards"
		date={new Date(Date.now())}
	/>

	<NewsCard
		src={news5}
		title="FAST CO.: BASIC® and KFC Team Up for a Digital Overhaul"
		tag="press"
		date={new Date(Date.now())}
	/>

	<NewsCard
		src={news6}
		title="BASIC® and Webex Champion “Hybrid Collaboration” As Next Evolution of Workplace Culture"
		tag="press"
		date={new Date(Date.now())}
	/>

	<NewsCard
		src={news7}
		title="BASIC recognized with 2020 Star Award for Technology by KFC"
		tag="awards"
		date={new Date(Date.now())}
	/>
</section>
