<script>
	import NewsCard from './news-card.svelte';
</script>

<section class="mt-[180px] flex flex-col gap-20">
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
