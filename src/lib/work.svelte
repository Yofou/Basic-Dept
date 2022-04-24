<script lang="ts">
	import Button from "./button.svelte";
import WorkCards from "./work-cards.svelte";
</script>

<section class="grid grid-cols-[1fr,max-content] grid-rows-1 py-32">
	<div class="max-w-[75ch] flex flex-col gap-10 items-start">
		<p class="text-[38px] text-black-300 font-medium tracking-tighter leading-[1]">
			BASIC/DEPT® is a global branding and digital design agency building products, services, and eCommerce experiences that turn cultural values into company value.
		</p>
		<Button --color="rgb(37,36,34)" --hover-color="white">See the work</Button>
	</div>

	<img class="w-[685px]" src="/bd.svg" alt="">
</section>

<section class="grid grid-cols-3 gap-5">
	<WorkCards title="patagonia" description="An eCommerce experience driven by Patagonia’s brand mission">
		<img src="/work-card-1.jpg" alt="">
	</WorkCards>

	<WorkCards title="wilson" description="A century-old sports brand finding its place in culture">
		<img src="/work-card-2.jpg" alt="">
	</WorkCards>

	<WorkCards title="google store" description="An eCommerce experience helping Google bring its hardware to people across the globe">
		<video autoplay loop muted>
			<source src="/Google-Store-Web-Design-Case-Study-Thumbnail-02.mp4" type="video/mp4">
		</video>
	</WorkCards>
</section>
