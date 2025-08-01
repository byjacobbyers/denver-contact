'use client'


'use client'
import { ReactNode } from 'react'

// blocks
import HeroBlock from '@/components/hero-block'
import CtaBlock from '@/components/cta-block'
import ColumnBlock from '@/components/column-block'
import ReviewBlock from '@/components/review-block'
import TextBlock from '@/components/text-block'
import FaqBlock from '@/components/faq-block'
import ImageBlock from '@/components/image-block'
import GalleryBlock from '@/components/gallery-block'
import SpacerBlock from '@/components/spacer-block'
import DividerBlock from '@/components/divider-block'
import EventsBlock from '@/components/events-block'
import FormBlock from '@/components/form-block'

interface BodySerializers {
	[key: string]: {
		component: React.FC<any>
		wrapper?: React.FC<{ children: ReactNode }>
		args?: any
	}
}

const bodySerializers: BodySerializers = {
	heroBlock: {
		component: HeroBlock,
		wrapper: ({ children }) => <>{children}</>,
	},
	ctaBlock: {
		component: CtaBlock,
		wrapper: ({ children }) => <>{children}</>,
	},
	columnBlock: {
    component: ColumnBlock,
    wrapper: ({ children }) => <>{children}</>,
  },
  reviewBlock: {
    component: ReviewBlock,
    wrapper: ({ children }) => <>{children}</>,
  },
  textBlock: {
    component: TextBlock,
    wrapper: ({ children }) => <>{children}</>,
  },
  faqBlock: {
    component: FaqBlock,
    wrapper: ({ children }) => <>{children}</>,
  },
  imageBlock: {
    component: ImageBlock,
    wrapper: ({ children }) => <>{children}</>,
  },
  galleryBlock: {
    component: GalleryBlock,
    wrapper: ({ children }) => <>{children}</>,
  },
  spacerBlock: {
    component: SpacerBlock,
    wrapper: ({ children }) => <>{children}</>,
  },
  dividerBlock: {
    component: DividerBlock,
    wrapper: ({ children }) => <>{children}</>,
  },
  eventsBlock: {
    component: EventsBlock,
    wrapper: ({ children }) => <>{children}</>,
  },
  formBlock: {
    component: FormBlock,
    wrapper: ({ children }) => <>{children}</>,
  },
}

function getSerializers() {
	const res: { [key: string]: React.FC<any> } = {}
	for (const [key, value] of Object.entries(bodySerializers)) {
		if (key === 'block') continue
		const Component = value.component
		res[key] = props => <Component {...props.node} />
	}
	return res
}

export const blockSerializers = getSerializers()

interface ComponentProps {
	body: {
		_key: string
		_type: string
	}[]
}

const Sections: React.FC<ComponentProps> = ({ body }) => {
	if (!body) return <></>
	return body.map((item, index) => {
		const type = item._type
		const serializer = bodySerializers[type]
		const Component = serializer?.component
		const args = serializer?.args
		const Wrapper = serializer?.wrapper

		if (!Component || !serializer)
			throw new Error(`No serializer implemented for body object: ${type}`)

		return Wrapper ? (
			<Wrapper key={item._key}>
				<Component {...item} {...args} componentIndex={index} />
			</Wrapper>
		) : (
			<Component key={item._key} {...item} {...args} componentIndex={index} />
		)
	})
}

export default Sections
