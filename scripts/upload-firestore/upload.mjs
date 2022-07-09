import dotenv from "dotenv";
import sharp from "sharp";
import fs from "fs";
import admin from "firebase-admin";
import uuid from "uuid-v4";
import { readFile } from "fs/promises";

const args = process.argv.slice(2);

const firebaseStorageDownloadTokens = uuid();
const serviceAccount = JSON.parse(
  await readFile(
    new URL(
      args[0] === "prod"
        ? "./keys/caroncoin-prod-firebase-adminsdk-3xvku-c893a5df8d.json"
        : "./keys/caroncoin-firebase-adminsdk-84s7z-d92938f42e.json",
      import.meta.url
    )
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket:
    args[0] === "prod" ? "caroncoin-prod.appspot.com" : "caroncoin.appspot.com"
});

dotenv.config();

const actualDir = "./nft-defaults-images/actual/";
const cardsDir = "./nft-defaults-images/cards/";
const thumbDir = "./nft-defaults-images/thumbnails/";
const files = fs.readdirSync(actualDir).filter(file => !file.includes("json"));

async function resize() {
  fs.rmSync("", { recursive: true, force: true });
  for (const file of files) {
    if (file.includes("json")) return;
    await sharp(actualDir + file)
      .resize({
        fit: sharp.fit.cover,
        width: 1600,
        height: 2200
      })
      .jpeg({ quality: 80 })
      .toFile(cardsDir + file);
    await sharp(actualDir + file)
      .resize({
        fit: sharp.fit.cover,
        width: 100,
        height: 100
      })
      .jpeg({ quality: 80 })
      .toFile(thumbDir + file);
  }
}

async function uploadFile(dir, filename) {
  const bucket = admin.storage().bucket();

  const metadata = {
    contentType: "image/png",
    cacheControl: "public, max-age=31536000",
    firebaseStorageDownloadTokens
  };

  const destination = "default-nft-images" + "/" + dir + "/" + uuid();

  // Uploads a local file to the bucket
  const response = await bucket.upload(filename, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    metadata: metadata,
    destination
  });

  console.log(`${filename} uploaded.`);
  console.log(response);
  return {
    link:
      "https://firebasestorage.googleapis.com/v0/b/" +
      bucket.name +
      "/o/" +
      destination +
      "?alt=media&token=" +
      firebaseStorageDownloadTokens,
    linkFb: response[0].metadata.name
  };
}

async function uploadFiles() {
  const responses = await Promise.all(
    files.map(async file => {
      const card = await uploadFile("cards", cardsDir + file);
      const thumb = await uploadFile("thumbnails", thumbDir + file);
      return {
        link: card.link,
        linkFb: card.linkFb,
        thumb: thumb.link,
        thumbFb: thumb.linkFb
      };
    })
  );
  await fs.writeFile(
    "../../backend/tokens/management/commands/default-nft-images.json",
    JSON.stringify(responses),
    "utf8",
    () => {}
  );
}

async function run() {
  await resize();
  await uploadFiles();
}

run();
