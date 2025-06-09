import { title } from "process";
import { defineType, defineField } from "sanity";


const column = defineType({
  title: "Column",
  name: "column",
  type: "object",
  fields: [
    defineField({
      name: 'image',
      type: 'defaultImage',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
  ],
  preview: {
    select: {
      media: "image",
      title: "content",
    },
  },
});

export default column;