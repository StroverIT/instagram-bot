import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export const POST = async (request: Request) => {
  const { instagramCookies, instagramProfile } = await request.json();

  const cookiesArray = JSON.parse(instagramCookies);

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setCookie(...cookiesArray);
  await page.cookies(instagramProfile);

  await page.goto(instagramProfile);

  //   const rowsClasses = "._ac7v.xras4av.xgc1b0m.xat24cr.xzboxd6";
  const firstPictureClassName =
    ".x1lliihq.x1n2onr6.xh8yej3.x4gyw5p.xfllauq.xo2y696.x11i5rnm.x2pgyrj";
  const nextButtonClassName =
    'span[style="display: inline-block; transform: rotate(90deg);"]';

  await page.waitForSelector(firstPictureClassName);
  await page?.click(firstPictureClassName);

  while (await page.$(nextButtonClassName)) {
    await waitAndLikeButton(page);
    await page.click(nextButtonClassName);
  }

  await waitAndLikeButton(page);
  await browser.close();

  return NextResponse.json({ message: "Hello World" });
};

async function waitAndLikeButton(page) {
  const likeButtonClassName = ".x1rg5ohu.xp7jhwk";

  await page.waitForSelector(likeButtonClassName);
  const likeButton = await page.$(likeButtonClassName);
  const likeButtonText = await likeButton?.evaluate((node) => node.textContent);
  if (likeButtonText === "Like") {
    await likeButton?.click();
    await likeButton?.click();
  }
}
