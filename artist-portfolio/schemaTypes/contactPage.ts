import { defineField, defineType } from 'sanity'

export const contactPageType = defineType({
    name: 'contactPage',
    title: 'Contact Page',
    type: 'document',
    fields: [
        defineField({
            name: 'subheading',
            title: 'Subheading',
            type: 'string',
            description: 'Small text above the heading (e.g., "Get in Touch")',
            initialValue: 'Get in Touch',
        }),
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            description: 'Main page heading (e.g., "Let\'s Connect")',
            initialValue: "Let's Connect",
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Short description below the heading',
            initialValue: 'Inquiries about commissions, exhibitions, or purchasing artwork.',
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Contact Page Settings' }
        },
    },
})
