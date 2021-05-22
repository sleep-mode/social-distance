import BackgroundImage from './assets/bg_1.png';

export class World {
    private bg?: HTMLImageElement;
    private readonly canvas: CanvasRenderingContext2D;
    private width: number;
    private initialized: boolean;

    constructor(canvas: CanvasRenderingContext2D, width: number) {
        this.canvas = canvas;
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

    public render(position: number) {
        if (!this.initialized) return;

        if (this.bg != null) {
            this.canvas.drawImage(this.bg, 0, 0, window.innerWidth, window.innerHeight);
        }
    }
}