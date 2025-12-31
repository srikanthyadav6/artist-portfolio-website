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
        defineField({
            name: 'instagram',
            title: 'Instagram URL',
            type: 'url',
            description: 'Full Instagram profile URL',
        }),
        defineField({
            name: 'twitter',
            title: 'Twitter URL',
            type: 'url',
            description: 'Full Twitter/X profile URL',
        }),
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
            description: 'Contact email address',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'photo',
        },
    },
})
