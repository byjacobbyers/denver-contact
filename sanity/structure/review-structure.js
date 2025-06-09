import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { UsersIcon } from '@sanity/icons'

const Review = (S, context) => {
	return S.listItem()
		.title('Reviews')
		.icon(UsersIcon)
		.child(
			S.list()
				.title('Reviews')
				.items([
					S.listItem({
						id: 'review',
						title: 'Reviews',
						schemaType: 'review',
						icon: UsersIcon,
						child: () =>
							S.documentTypeList('review')
								.title('Reviews')
								.filter('_type == $type')
								.params({ type: 'review' })
					}),
					orderableDocumentListDeskItem({
						type: 'review',
						title: 'Order Reviews',
						icon: UsersIcon,
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


