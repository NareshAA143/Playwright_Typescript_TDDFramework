import {Page, Locator, expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class TestPagerPage extends BasePage{

    constructor(page: Page) {
        super(page);
    }

    public async Navigate(){
        const url = process.env.BASE_URL8;
        if (!url) {
            throw new Error('BASE_URL8 environment variable is not defined');
        }
        await this.page.goto(url);
    }

    public async CountFrames(){
        const noOfFrames = await this.page.frames();
        console.log(`Number of frames in the page are: ${noOfFrames.length}`);
    }

    public async InteractWithFrame1(){
        const frame1 = await this.page.frame({name:'left'});
        if(frame1){
            const ele = await frame1.waitForSelector("h1",{state:'visible'});
            const text = await frame1.locator("h1");
            console.log("Text in the left frame is: " + await text.textContent());
            expect(text).toHaveText("Left");
        }
        else{
            console.log("Left Frame not found");
        }
    }

}