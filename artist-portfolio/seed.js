import { getCliClient } from 'sanity/cli'

// This script is meant to be run via 'npx sanity exec seed.js --with-user-token'
const client = getCliClient({ apiVersion: '2023-05-03' })

const dummyPaintings = [
    {
        title: "Autumn Whisper",
        category: "Landscape",
        price: "$1,200",
        dimensions: "24x36 in",
        imageUrl: "https://placehold.co/800x600/E3D5CA/2D2D2D.png?text=Autumn+Whisper",
        featured: true
    },
    {
        title: "Serenity in Blue",
        category: "Abstract",
        price: "$950",
        dimensions: "20x20 in",
        imageUrl: "https://placehold.co/600x600/D5E3E2/2D2D2D.png?text=Serenity",
        featured: true
    },
    {
        title: "The Silent Gaze",
        category: "Portrait",
        price: "$1,800",
        dimensions: "30x40 in",
        imageUrl: "https://placehold.co/600x800/E2D5E3/2D2D2D.png?text=The+Silent+Gaze",
        featured: true
    },
    {
        title: "City Echoes",
        category: "Urban",
        price: "$1,100",
        dimensions: "24x24 in",
        imageUrl: "https://placehold.co/600x600/D5D5E3/2D2D2D.png?text=City+Echoes",
        featured: false
    },
    {
        title: "Golden Hour",
        category: "Landscape",
        price: "$1,500",
        dimensions: "36x24 in",
        imageUrl: "https://placehold.co/900x600/E3E0D5/2D2D2D.png?text=Golden+Hour",
        featured: false
    },
    {
        title: "Fragmented Reality",
        category: "Abstract",
        price: "$2,200",
        dimensions: "40x40 in",
        imageUrl: "https://placehold.co/800x800/E3D5D5/2D2D2D.png?text=Fragmented",
        featured: false
    }
];

async function seed() {
    console.log('Seeding data...');

    // Seed Artist Profile
    console.log('Creating Artist Profile...');
    await client.createOrReplace({
        _id: 'artist-profile',
        _type: 'artist',
        name: 'MOULIKA JONNALA',
        quote: 'My work is an exploration of memory and place. I try not to just paint what I see, but how it felt to be there.',
        bio: [
            {
                _type: 'block',
                _key: 'bio1',
                style: 'normal',
                children: [{ _type: 'span', _key: 'span1', text: 'Elara Vance is an oil painter based in the Pacific Northwest, known for her emotive landscapes and textured abstract works. With over a decade of experience, she captures the fleeting moments of light and shadow that define our natural world.' }],
                markDefs: []
            },
            {
                _type: 'block',
                _key: 'bio2',
                style: 'normal',
                children: [{ _type: 'span', _key: 'span2', text: 'Her works have been exhibited in galleries across Seattle, Portland, and San Francisco. When not painting, she teaches workshops on oil techniques and color theory.' }],
                markDefs: []
            }
        ],
        instagram: 'https://instagram.com/moulikajonnala',
        twitter: 'https://twitter.com/moulikajonnala',
        email: 'moulika@example.com'
    });
    console.log('Artist Profile created!');

    // Seed Home Page
    console.log('Creating Home Page settings...');
    await client.createOrReplace({
        _id: 'home-page',
        _type: 'homePage',
        tagline: 'Capturing light, preserving moments.',
        description: 'Explore the collection of oil paintings by Elara Vance. A journey through landscapes, emotion, and abstract forms.',
        ctaText: 'View Collection'
    });
    console.log('Home Page settings created!');

    // Seed Site Settings
    console.log('Creating Site Settings...');
    await client.createOrReplace({
        _id: 'site-settings',
        _type: 'siteSettings',
        siteName: 'MOULIKA JONNALA',
        socialLinks: [
            { _key: 'ig', platform: 'Instagram', url: 'https://instagram.com' },
            { _key: 'tw', platform: 'Twitter', url: 'https://twitter.com' },
            { _key: 'em', platform: 'Email', url: 'mailto:hello@elaravance.com' }
        ]
    });
    console.log('Site Settings created!');

    // Seed Contact Page
    console.log('Creating Contact Page settings...');
    await client.createOrReplace({
        _id: 'contact-page',
        _type: 'contactPage',
        subheading: 'Get in Touch',
        heading: "Let's Connect",
        description: 'Inquiries about commissions, exhibitions, or purchasing artwork.'
    });
    console.log('Contact Page settings created!');

    // Seed Paintings
    for (const p of dummyPaintings) {
        try {
            console.log(`Processing ${p.title}...`);

            // 1. Fetch image
            const res = await fetch(p.imageUrl);
            if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
            const arrayBuffer = await res.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // 2. Upload asset
            console.log(`  Uploading image...`);
            const asset = await client.assets.upload('image', buffer, {
                filename: p.title.replace(/\s+/g, '-') + '.png'
            });

            // 3. Create document
            console.log(`  Creating document...`);
            await client.create({
                _type: 'painting',
                title: p.title,
                slug: { _type: 'slug', current: p.title.toLowerCase().replace(/\s+/g, '-') },
                category: p.category,
                price: p.price,
                dimensions: p.dimensions,
                featured: p.featured,
                image: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: asset._id
                    }
                }
            });
            console.log(`  Done!`);
        } catch (err) {
            console.error(`  Error creating ${p.title}:`, err.message);
        }
    }
    console.log('Seeding complete!');
}

seed();
