import { CalendarIcon } from '@sanity/icons'

export default function Event(S) {
  return S.listItem()
    .title('Events')
    .icon(CalendarIcon)
    .child(
      S.documentTypeList('event')
        .title('Events')
        .child(documentId =>
          S.document()
            .documentId(documentId)
            .schemaType('event')
        )
    )
} 