<button
	class="rounded-[16px] border border-[color:var(--color)] px-[30px] py-2 text-[11px] font-medium uppercase {$$props.class ??
		''}"
>
	<slot />
</button>

<style>
	button {
		background-image: linear-gradient(
			var(--color, theme('colors.black.full')),
			var(--color, theme('colors.black.full'))
		);
		background-size: 100% 0%;
		background-repeat: no-repeat;
		background-position: left bottom;
		transition: background-size 250ms ease-in-out, color 250ms ease-in-out;
		color: var(--color, theme('colors.black.full'));
	}

	button:hover {
		background-size: 100% 100%;
		color: var(--hover-color, var(--color, white));
	}
</style>
