import { DefaultDocumentNodeResolver } from 'sanity/structure'
import ReviewComponent from '../components/review'


export const defaultDocumentNode: DefaultDocumentNodeResolver = (
	S,
	{ schemaType },
) => {
	switch (schemaType) {
		case `review`:
			return S.document().views([
				S.view.form(),
				S.view
					.component(ReviewComponent as any)
					.title('Preview'),
			])
		default:
			return S.document().views([S.view.form()])
	}
}
