import { defineType, defineField } from "sanity";
import React, { FC } from 'react'
import {TextIcon} from '@sanity/icons'

const smallText: FC = (props: any) => {
  return <span style={{ fontSize: '14px', margin: 0 }}>{props.children} </span>
}

const simpleText = defineType({
  title: "Text",
  name: "simpleText",
  type: "array",
  icon: TextIcon,
  of: [
    {
      type: "block",
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Small', value: 'small', component: smallText },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
    },
  ],
});

export default simpleText;