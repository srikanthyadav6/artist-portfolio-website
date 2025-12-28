import { defineField, defineType } from 'sanity'

export const homePageType = defineType({
    name: 'homePage',
    title: 'Home Page',
    type: 'document',
    fields: [
        defineField({
            name: 'tagline',
            title: 'Hero Tagline',
            type: 'string',
            description: 'Main headline e.g. "Capturing light, preserving moments."',
        }),
        defineField({
            name: 'description',
            title: 'Hero Description',
            type: 'text',
            description: 'Short paragraph below the tagline',
        }),
        defineField({
            name: 'ctaText',
            title: 'Button Text',
            type: 'string',
            initialValue: 'View Collection',
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Home Page Settings' }
        },
    },
})
