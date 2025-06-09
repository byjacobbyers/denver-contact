import { defineType, defineField } from "sanity";
import { UsersIcon } from '@sanity/icons';
import { Rule } from 'sanity';

// Define the review block schema with an array of strings as title and an array of references to reviews
export default defineType({
  title: "Review Block",
  name: "reviewBlock",
  icon: UsersIcon,
  type: "object",
  fields: [
    defineField({
      title: 'Active',
      name: 'active',
      type: 'boolean',
      description: 'Set to false if you need to remove from page but not delete',
      initialValue: true,
    }),
    defineField({
      title: 'Anchor',
      name: 'anchor',
      type: 'string',
      description: 'The anchor for the section. No hash symbols. Optional.',
      validation: Rule => Rule.regex(/^[a-z0-9-]+$/).warning('Use only lowercase letters, numbers, and hyphens'),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      title: 'Reviews',
      name: 'reviews',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'review' }] }],
      validation: Rule => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      active: 'active',
    },
    prepare({ title, active }) {
      return {
        title: title || 'Reviews',
        subtitle: active ? 'Active' : 'Inactive',
      }
    },
  }
});
