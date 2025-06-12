import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { StarFilledIcon } from '@sanity/icons'

const Review = (S, context) => {
	return S.listItem()
		.title('Reviews')
		.icon(StarFilledIcon)
		.child(
			S.list()
				.title('Reviews')
				.items([
					S.listItem({
						id: 'review',
						title: 'Reviews',
						schemaType: 'review',
						icon: StarFilledIcon,
						child: () =>
							S.documentTypeList('review')
								.title('Reviews')
								.filter('_type == $type')
								.params({ type: 'review' })
					}),
					orderableDocumentListDeskItem({
						type: 'review',
						title: 'Order Reviews',
						icon: StarFilledIcon,
						id: 'review-order',
						createIntent: false,
						menuItems: [],
						S,
						context,
					}),
				])
		)
}

export default Review


