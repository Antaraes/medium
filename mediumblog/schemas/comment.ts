

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'Comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description:"Comment won't show me the site without approved",
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to:[{type:"post"}]
    }),

    
    
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
})
