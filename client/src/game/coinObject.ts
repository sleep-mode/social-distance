import { Canvas } from "./canvas";
import { Drawable } from "./drawable";
import { Coin } from "./models/Coin";
import CoinImage from "./assets/coin.png";
import { loadImage } from "./utility";

export const disappearTime: number =  0.5;
const disappearHeight: number = 250;

const spriteSize = {
    x: 48,
    y: 48,
};

let sprite: HTMLImageElement;
loadImage(CoinImage).then(res => {
    sprite = res;
});

export class CoinObject implements Drawable {
    private coin: Coin;
    private disappearing: boolean;
    private disappearStartTime: number = 0;

    constructor(coin: Coin) {
        this.coin = coin;
        this.disappearing = false;
    }

    public sync(coin: Coin) {
        this.coin = coin;
    }

    public disappear() {
        if (this.disappearing) return;

        this.disappearing = true;
        this.disappearStartTime = Date.now();
    }

    draw: (canvas: Canvas) => void = (canvas) => {
        if (!sprite) return;

        const offset = this.getSpriteOffset();
        const heightOffset = this.disappearing ? this.calcHeight() : 0;
        canvas.context.drawImage(
            sprite,
            offset.sx,
            offset.sy,
            offset.sw,
            offset.sh,
            Math.round(this.coin.x + canvas.viewPort - spriteSize.x / 2),
            Math.round(canvas.height - spriteSize.y - 20 + heightOffset),
            spriteSize.x,
            spriteSize.y
        );
    };

    private calcHeight() {
        const now = Date.now();
        const x = Math.min((now - this.disappearStartTime) / 1000, disappearTime);
        return -Math.round(disappearHeight * (-Math.pow(x - disappearTime, 2) + disappearTime * disappearTime));
    }

    private getSpriteOffset() {
        const animSpeed = this.disappearing ? 40 : 100;
        const animationFrame = Math.ceil((Date.now() / animSpeed) % 6) - 1;
        return {
            sx: Math.ceil(animationFrame * spriteSize.x),
            sy: this.coin.amount === 5 ? 0 : spriteSize.y,
            sw: spriteSize.x,
            sh: spriteSize.y,
        }
    }
}