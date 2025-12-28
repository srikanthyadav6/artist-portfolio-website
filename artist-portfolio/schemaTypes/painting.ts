import { defineField, defineType } from 'sanity'

export const paintingType = defineType({
    name: 'painting',
    title: 'Painting',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'title' },
        }),
        defineField({
            name: 'category',
            type: 'string',
            options: {
                list: [
                    { title: 'Landscape', value: 'Landscape' },
                    { title: 'Portrait', value: 'Portrait' },
                    { title: 'Abstract', value: 'Abstract' },
                    { title: 'Urban', value: 'Urban' },
                ],
            },
        }),
        defineField({
            name: 'image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'price',
            type: 'string',
        }),
        defineField({
            name: 'dimensions',
            type: 'string',
        }),
        defineField({
            name: 'featured',
            type: 'boolean',
            initialValue: false,
        }),
    ],
})
