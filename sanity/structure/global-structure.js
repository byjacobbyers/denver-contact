import { ControlsIcon } from '@sanity/icons'

const Global = (S, context) =>
  S.documentTypeListItem('site')
    .title('Site Config')
    .icon(ControlsIcon)
    .child(
      S.editor()
        .id('site')
        .schemaType('site')
        .documentId('site')
    )

export default Global