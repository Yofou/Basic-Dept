import type Transition from "./transition-type"
import { quadInOut } from "svelte/easing"

const xSlide = (node: HTMLElement, options: Record<string, unknown> | undefined): Transition => {
	const styles = getComputedStyle(node)
	const width = parseFloat(styles.width)
	const paddingLeft = parseFloat(styles.paddingLeft)
	const paddingRight = parseFloat(styles.paddingRight)
	const marginLeft = parseFloat(styles.marginLeft)
	const marginRight = parseFloat(styles.marginRight)
	const borderLeft = parseFloat(styles.borderLeftWidth)
	const borderRight = parseFloat(styles.borderRightWidth)

	return {
		delay: 300,
		duration: 150,
		easing: quadInOut,
		css: t => `
			overflow: hidden;
			width: ${t * width};
			padding-left: ${t * paddingLeft};
			padding-right: ${t * paddingRight};
			margin-left: ${t * marginLeft};
			margin-right: ${t * marginRight};
			border-left-width: ${borderLeft};
			border-right-width: ${borderRight};
		`,
	}
}

export default xSlide
