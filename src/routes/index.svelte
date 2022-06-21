<script lang="ts">
	import AgencySpotlight from '$lib/agency-spotlight.svelte';
	import Featured from '$lib/featured.svelte';
	import Footer from '$lib/footer.svelte';
	import Header from '$lib/header.svelte';
	import InternalWork from '$lib/internal-work.svelte';
	import News from '$lib/news.svelte';
	import Work from '$lib/work.svelte';
</script>

<Header />
<main class="w-full px-5 mb-20 md:pb-[188px] md:px-20">
	<Work />
	<Featured />
	<AgencySpotlight />
	<News />
	<InternalWork />
</main>

<Footer />
