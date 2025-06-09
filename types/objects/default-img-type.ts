export type DefaultImageType = {
	alt: string
	shadow: boolean
	asset: {
		_ref: string
		_type: string
		url: string
		metadata: {
			dimensions: {
				aspectRatio: number
				height: number
				width: number
			}
		}
	}
	crop: {
		_type: string
		top: number
		bottom: number
		left: number
		right: number
	}
	hotspot: {
		_type: string
		height: number
		width: number
		x: number
		y: number
	}
}
