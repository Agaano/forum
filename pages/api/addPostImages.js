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
		const image1 = files.image1
        if (!!image1) {
            const readStream1 = fs.createReadStream(image1.filepath)
            streamToBlob(readStream1, image1.mimetype).then(blob => {
                blob.arrayBuffer().then(async buffer => {
                    const arrayBuffer = new Uint8Array(buffer)
                    console.log("HAIIII FROM IMAGE 1")
                    await prisma.posts.update({where: {ID: +fields.id}, data: {image1: Buffer.from(arrayBuffer)}})
                    await prisma.$disconnect();
                })
            })
        } else {
            res.status(200).send();
        } 
        const image2 = files.image2
        if (!!image2) {
            const readStream2 = fs.createReadStream(image2.filepath)
            streamToBlob(readStream2, image2.mimetype).then(blob => {
                blob.arrayBuffer().then(async buffer => {
                    const arrayBuffer = new Uint8Array(buffer)
                    console.log("HAIIII FROM IMAGE 2")
                    await prisma.posts.update({where: {ID: +fields.id}, data: {image2: Buffer.from(arrayBuffer)}})
                    await prisma.$disconnect();
                })
            })
        } else {
            res.status(200).send();
        }
        const image3 = files.image3
		if (!!image3) {
            const readStream3 = fs.createReadStream(image3.filepath)
            streamToBlob(readStream3, image3.mimetype).then(blob => {
                blob.arrayBuffer().then(async buffer => {
                    const arrayBuffer = new Uint8Array(buffer)
                    console.log("HAIIII FROM IMAGE 3")
                    await prisma.posts.update({where: {ID: +fields.id}, data: {image3: Buffer.from(arrayBuffer)}})
                    await prisma.$disconnect();
                    res.status(200).send();
                })
            })
        } else {
            res.status(200).send();
        }
    })
}