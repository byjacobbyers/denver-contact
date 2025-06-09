import { PresentationIcon } from '@sanity/icons'

const Page = S => {
	return S.listItem()
		.title('Pages')
		.icon(PresentationIcon)
		.child(
			S.documentList()
				.title('Pages')
				.menuItems(S.documentTypeList('page').getMenuItems())
				.filter('_type == "page"')
				.defaultOrdering([{ field: '_createdAt', direction: 'desc' }]),
		)
}

export default Page
