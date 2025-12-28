import { defineField, defineType } from 'sanity'

export const artistType = defineType({
    name: 'artist',
    title: 'Artist Profile',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Artist Name',
            type: 'string',
        }),
        defineField({
            name: 'photo',
            title: 'Artist Photo',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'bio',
            title: 'Biography',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'quote',
            title: 'Artist Quote',
            type: 'text',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'photo',
        },
    },
})
