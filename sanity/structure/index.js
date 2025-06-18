import Global from './global-structure'
import Navigation from './navigation-structure'
import Page from './page-structure'
import Review from './review-structure'
import Event from './event-structure'
import Person from './person-structure'

export const deskStructure = (S, context) => {
	return S.list()
		.title('Content')
		.items([
			Page(S),
      Event(S),
      // Person(S),
      Review(S, context),
			Global(S, context),
			Navigation(S),
		])
}
