import { defineType, defineField } from "sanity";
import {InlineIcon} from '@sanity/icons'


// Define a column block with content and column fields. Maximum of 3 columns.
const columnBlock = defineType({
  title: "Column Block",
  name: "columnBlock",
  icon: InlineIcon,
  type: "object",
  fields: [
    defineField({
			title: 'Active?',
			name: 'active',
			type: 'boolean',
			description:
				'Set to false if you need to remove from page but not delete',
			initialValue: true,
		}),
    defineField(
      {
        title: "Anchor",
        name: "anchor",
        type: "string",
        description: "The anchor for the section. No hash symbols. Optional.",
      }
    ),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      title: "Rows",
      name: "rows",
      type: "array",
      of: [
        {
          type: "columnArray",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'content',
      active: 'active',
    },
    prepare({title, active}) {
      return {
        title: 'Columns',
        subtitle: active ? 'Active' : 'Inactive',
      }
    }
  }
});

export default columnBlock;