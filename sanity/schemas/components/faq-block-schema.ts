import { defineType, defineField } from "sanity";
import { ErrorOutlineIcon, BlockContentIcon } from "@sanity/icons";

const faqBlock = defineType({
  title: "FAQ Block",
  name: "faqBlock",
  type: "object",
  icon: ErrorOutlineIcon,
  fields: [
    defineField({
      title: "Active?",
      name: "active",
      type: "boolean",
      description: "Set to false if you need to remove from page but not delete",
      initialValue: true,
    }),
    defineField({
      title: "Anchor",
      name: "anchor",
      type: "string",
      description: "The anchor for the section. No hash symbols. Optional.",
    }),
    defineField({
      title: "FAQs",
      name: "faqs",
      type: "array",
      of: [
        {
          type: "object",
          title: "FAQ",
          icon: BlockContentIcon,
          fields: [
            defineField({
              title: "Question",
              name: "question",
              type: "string",
              description: "The question being asked.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: "Answer",
              name: "answer",
              type: "simpleText",
              description: "The answer to the question.",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "question",
              subtitle: "answer",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Untitled Question",
                subtitle: subtitle ? subtitle[0].children[0].text : "No answer provided",
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "anchor",
      active: "active",
    },
    prepare({ title, active }) {
      return {
        title: `FAQ Block - ${title || "Untitled"}`,
        subtitle: active ? "Active" : "Not Active",
      };
    },
  },
});

export default faqBlock;