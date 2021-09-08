import sharp from 'sharp'
import path from 'path'
import fs from 'fs-extra'
import { v4 as uuidv4 } from 'uuid';

const resize = async (photos, carId) => {
    try {
        const dir = `static/images/cars/${carId}`
        await fs.ensureDir(dir)
        const promises = []
        const fileNames = []
        let fileName;
        sharp.cache(false)
        for (let i = 0; i < photos.length; i++) {
            fileName = uuidv4()
            fileNames.push(`${fileName}.webp`)
            promises.push(sharp(Buffer.from(photos[i], "base64")).webp({ lossless: true }).toFile(`${dir}/${fileName}.webp`))
            // promises.push(sharp(Buffer.from(photos[i], "base64")).resize(200).toFormat("webp").webp({ lossless: true }).toFile(`${dir}/${fileName}_thumb.webp`))
        }
        Promise.all(promises)
        console.log(fileNames);
        return fileNames
    } catch (error) {

    }
}

export const post = async (request) => {
    try {
        const { Photos, ...vehicle } = request.body
        const res = await fetch("http://localhost:3999/cars", {
            method: "post",
            body: JSON.stringify(vehicle),
            headers: {

                "content-type": "application/json",
            },
        });
        const car = await res.json()

        const fileNames = await resize(Photos, car.id)
        await fetch(`http://localhost:3999/cars/${car.id}`, {
            method: "patch",
            body: JSON.stringify({ Photos: fileNames }),
            headers: {
                "content-type": "application/json",
            },
        })
    } catch (error) {

    }
};