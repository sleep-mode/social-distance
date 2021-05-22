import BackgroundImage from './assets/bg_1.png';
import { Canvas } from './canvas';
import { Drawable } from './drawable';
import { loadImage } from './utility';

export class World implements Drawable {
    private bg?: HTMLImageElement;
    private width: number;
    private initialized: boolean;

    constructor(width: number) {
        this.width = width;
        this.initialized = false;
    }

    async initialize() {
        this.bg = await loadImage(BackgroundImage);
        this.initialized = true;
    }

    draw = (canvas: Canvas) => {
        if (!this.initialized) return;

        if (this.bg != null) {
            canvas.context.drawImage(this.bg, canvas.viewPort, canvas.height - this.bg.height, this.bg.width, this.bg.height);
        }
    }
}