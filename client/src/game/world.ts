import BackgroundImage1 from './assets/bg-1.png';
import BackgroundImage2 from './assets/bg-2.png';
import BackgroundImage3 from './assets/bg-3.png';
import BackgroundImage4 from './assets/bg-4.png';
import BackgroundImage5 from './assets/bg-5.png';

import { Canvas } from './canvas';
import { Drawable } from './drawable';
import { loadImage } from './utility';

const pendingImages = [
    BackgroundImage1,
    BackgroundImage2,
    BackgroundImage3,
    BackgroundImage4,
    BackgroundImage5,
].map(loadImage);

let backgrounds: HTMLImageElement[];
Promise.all(pendingImages).then(images => {
    backgrounds = images;
});

export class World implements Drawable {
    private width: number;

    constructor(width: number) {
        this.width = width;
    }

    draw = (canvas: Canvas) => {
        if (!backgrounds) return;

        backgrounds.forEach((bg, index) => {
            canvas.context.drawImage(bg, canvas.viewPort + index * bg.width, 0, bg.width, bg.height);
        });
    }
}
