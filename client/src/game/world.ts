import BackgroundImage from './assets/bg_1.png';
import { Drawable } from './drawable';

export class World implements Drawable {
    private bg?: HTMLImageElement;
    private width: number;
    private initialized: boolean;

    constructor(width: number) {
        this.width = width;
        this.initialized = false;
    }

    async initialize() {
        this.bg = await this.loadImage(BackgroundImage);
        this.initialized = true;
    }
    
    async loadImage(asset: any): Promise<HTMLImageElement> {
        const image = new Image();
        image.src = asset;
        return new Promise(resolve => {
            image.addEventListener('load', () => {
                resolve(image);
            });
        });
    }

    draw = (canvas: CanvasRenderingContext2D) => {
        if (!this.initialized) return;

        if (this.bg != null) {
            canvas.drawImage(this.bg, 0, 0, window.innerWidth, window.innerHeight);
        }
    }
}