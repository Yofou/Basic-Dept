<script lang="ts">
	import AgencySpotlight from '$lib/agency-spotlight.svelte';
	import Featured from '$lib/featured.svelte';
	import Header from '$lib/header.svelte';
	import Work from '$lib/work.svelte';
</script>

<Header />
<main class="px-20 relative pb-[188px]">
	<Work />
	<Featured />
	<AgencySpotlight />
</main>
