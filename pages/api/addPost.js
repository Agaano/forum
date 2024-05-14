import { PrismaClient } from '@prisma/client'
import { Buffer } from 'buffer'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import streamToBlob from 'stream-to-blob'
const prisma = new PrismaClient()

export const config = {
	api: {
		bodyParser: false,
	},
}

export default async function handler(req, res) {
	const form = new IncomingForm()
	form.parse(req, (err, fields, files) => {
		if (err) res.status(500).send()
		const image = files.image
		const readStream = fs.createReadStream(image.filepath)
		streamToBlob(readStream, image.mimetype).then(blob => {
			blob.arrayBuffer().then(async buffer => {
				const arrayBuffer = new Uint8Array(buffer)
				const post = await prisma.posts.create({
					data: {
						title: fields.title,
						author: fields.author,
						description: fields.description,
						theme: fields.categories,
						image: Buffer.from(arrayBuffer),
						image1: fields.image1,
						image2: fields.image2,
						image3: fields.image3,
					},
				})
				prisma
					.$disconnect()
					.then(() => {
						res.status(200).send()
					})
					.catch(err => {
						console.log(err)
					})
			})
		})
	})
}
