import { ControlsIcon, ConfettiIcon, EarthAmericasIcon } from '@sanity/icons'

const Global = (S, context) => {
	return S.listItem()
		.title('Global')
		.icon(EarthAmericasIcon)
		.child(
			S.list()
				.title('Global')
				.items([
          S.documentTypeListItem('announcement')
						.title('Announcement')
						.icon(ConfettiIcon)
						.child(S.editor().id('announcement').schemaType('announcement').documentId('announcement')),
					S.documentTypeListItem('site')
						.title('Site Config')
						.icon(ControlsIcon)
						.child(S.editor().id('site').schemaType('site').documentId('site')),
				]),
		)
}

export default Global