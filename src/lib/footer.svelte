<script>
	import FooterEmailInput from '$lib/footer-email-input.svelte';
	import FooterList from './footer-list.svelte';
</script>

<footer
	class="dark noise-bg grid w-full grid-cols-1 grid-rows-[max-content,1fr,max-content] md:grid-cols-[1fr,1.2fr] md:grid-rows-[1fr,60px] gap-x-40 gap-y-[60px] md:gap-y-[120px] px-5 md:px-20 pt-[60px] md:pt-[120px]"
>
	<form on:submit|preventDefault class="w-full">
		<h1 class="mb-[60px] md:mb-[120px] text-[32px] font-bold tracking-tight text-white-full">B/D®</h1>

		<h1 class="md:hidden text-white-300 mb-4">
			We collaborate with ambitious brands and people. Let's build.
			<a class="underline" href="mailto:biz@basicagency.com">biz@basicagency.com</a>
		</h1>

		<fieldset class="w-full">
			<h2 class="mb-2 text-[18px] font-medium uppercase tracking-tighter text-white-300">
				<span class="mr-[6px] text-[1.6em]">●</span> STAY IN THE KNOW
			</h2>
			<FooterEmailInput />
		</fieldset>
	</form>

	<section class="h-full">
		<h1
			class="hidden max-w-[30ch] text-[32px] font-normal leading-[1.1] tracking-tight text-white-300 md:block"
		>
			We collaborate with ambitious brands and people. Let's build.
			<a class="underline" href="mailto:biz@basicagency.com">biz@basicagency.com</a>
		</h1>

		<div class="md:mt-[calc(72px+28px)] grid w-full grid-flow-row gap-[3.125rem] md:gap-0 md:grid-cols-3">
			<FooterList title="social">
				<a href="/">Instagram</a>
				<a href="/">Twitter</a>
				<a href="/">LinkedIn</a>
				<a href="/">Facebook</a>
			</FooterList>

			<FooterList title="initatives">
				<a href="/">Crafted</a>
				<a href="/">Culture Manual</a>
				<a href="/">Applied</a>
				<a href="/">Brandbeats</a>
				<a href="/">Moves</a>
				<a href="/">B®/Good</a>
			</FooterList>

			<FooterList title="Offices">
				<a id="address" href="/">
					<address>San Diego - CA</address>
					<address>New York - NY</address>
					<address>Bay Area - CA</address>
					<address>St. Louis - MO</address>
					<address>Amersterdan - NL</address>
					<address>London - EN</address>
					<address>Berlin - GE</address>
					<address>Argentina - AR</address>
				</a>
			</FooterList>
		</div>
	</section>

	<section
		class=" dark-footer-noisebg justify-items-center md:justify-items-start md:col-span-2 -mx-5 md:-mx-20 grid grid-cols-[repeat(2,minmax(max-content,1fr))] md:grid-cols-[max-content,1fr,repeat(3,max-content)] md:grid-rows-1 items-center py-5 md:py-0 px-5 md:px-20 text-[11px] font-medium uppercase tracking-tight text-[#5e5e5e]"
	>
		<p class="col-span-2 md:col-auto">BASIC/DEPT®, INC 10 - 22©</p>
		<h1 class="md:justify-self-center col-span-2 md:col-auto text-center">EASY TO UNDERSTAND, IMPOSSIBLE TO IGNORE.™</h1>
		<a class="row-start-4 md:row-start-auto" href="/">terms</a>,
		<a class="row-start-4 md:row-start-auto" href="/">privacy policy</a>
	</section>
</footer>

<style>
	.dark-footer-noisebg {
		@apply noise-bg;
		background: url('/noise.png') #191918;
	}

	#address:hover {
		@apply no-underline;
	}

	#address > address:hover {
		@apply underline;
	}
</style>
