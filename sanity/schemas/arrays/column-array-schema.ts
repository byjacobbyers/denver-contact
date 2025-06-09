import { defineType, defineField } from "sanity";
import {InlineElementIcon} from '@sanity/icons'

// Define a column block with content and column fields. Maximum of 3 columns.
const columnArray = defineType({
  title: "Column Array",
  name: "columnArray",
  icon: InlineElementIcon,
  type: "object",
  fields: [
    defineField({
      name: 'columns',
      type: 'array',
      of: [
        {
          type: 'column',
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    select: {
      title: 'columns',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: 'Column Array'
      }
    }
  }
});

export default columnArray;