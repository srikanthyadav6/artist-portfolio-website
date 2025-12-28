import { getCliClient } from 'sanity/cli'
import { createReadStream } from 'fs'
import { basename } from 'path'

const client = getCliClient({ apiVersion: '2023-05-03' })

// Correct artifacts directory based on previous steps
const ARTIFACTS_DIR = 'C:/Users/Srika/.gemini/antigravity/brain/ae79af86-47c1-47b5-8f60-0077d834382d'

const images = [
    {
        title: 'Autumn Whisper',
        file: 'autumn_whisper_1766918715731.png'
    },
    {
        title: 'Serenity in Blue',
        file: 'serenity_in_blue_1766918743234.png'
    },
    {
        title: 'The Silent Gaze',
        file: 'silent_gaze_1766918781217.png'
    },
    {
        title: 'City Echoes',
        file: 'city_echoes_1766918810568.png'
    },
    {
        title: 'Golden Hour',
        file: 'golden_hour_1766919169318.png'
    },
    {
        title: 'Fragmented Reality',
        file: 'fragmented_reality_1766919188279.png'
    }
]

async function uploadImages() {
    console.log('Starting image upload...')

    for (const item of images) {
        const filePath = `${ARTIFACTS_DIR}/${item.file}`
        console.log(`Processing ${item.title} from ${filePath}...`)

        try {
            // 1. Upload asset
            const asset = await client.assets.upload('image', createReadStream(filePath), {
                filename: basename(filePath)
            })
            console.log(`Uploaded asset: ${asset._id}`)

            // 2. Find document
            const doc = await client.fetch('*[_type == "painting" && title == $title][0]', { title: item.title })

            if (doc) {
                // 3. Patch document
                await client.patch(doc._id)
                    .set({
                        image: {
                            _type: 'image',
                            asset: {
                                _type: 'reference',
                                _ref: asset._id
                            }
                        }
                    })
                    .commit()
                console.log(`Updated document ${doc._id} with new image.`)
            } else {
                console.warn(`Document not found for title: ${item.title}`)
            }

        } catch (err) {
            console.error(`Failed to process ${item.title}:`, err.message)
        }
    }

    // Upload Artist Photo
    console.log('Processing Artist Photo...')
    try {
        const artistPhotoPath = `${ARTIFACTS_DIR}/elara_vance_portrait_1766919497024.png`
        const asset = await client.assets.upload('image', createReadStream(artistPhotoPath), {
            filename: basename(artistPhotoPath)
        })
        console.log(`Uploaded artist photo asset: ${asset._id}`)

        const artistDoc = await client.fetch('*[_type == "artist"][0]')
        if (artistDoc) {
            await client.patch(artistDoc._id)
                .set({
                    photo: {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: asset._id
                        }
                    }
                })
                .commit()
            console.log(`Updated artist profile with new photo.`)
        } else {
            console.warn(`Artist document not found.`)
        }
    } catch (err) {
        console.error(`Failed to upload artist photo:`, err.message)
    }

    console.log('Done!')
}

uploadImages()
