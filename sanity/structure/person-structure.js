import { UsersIcon } from '@sanity/icons'

export default function Person(S) {
  return S.listItem()
    .title('Guest Teachers')
    .icon(UsersIcon)
    .child(
      S.documentTypeList('person')
        .title('Guest Teachers')
        .child(documentId =>
          S.document()
            .documentId(documentId)
            .schemaType('person')
        )
    )
} 