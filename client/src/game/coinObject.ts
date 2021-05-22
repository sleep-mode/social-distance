import { Canvas } from "./canvas";
import { Drawable } from "./drawable";
import { Coin } from "./models/Coin";
import CoinImage from "./assets/coin.svg";
import { loadImage } from "./utility";

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

    constructor(coin: Coin) {
        this.coin = coin;
    }

    public sync(coin: Coin) {
        this.coin = coin;
    }

    draw: (canvas: Canvas) => void = (canvas) => {
        if (!sprite) return;

        const offset = this.getSpriteOffset();
        canvas.context.drawImage(
            sprite,
            offset.sx,
            offset.sy,
            offset.sw,
            offset.sh,
            Math.round(this.coin.x + canvas.viewPort - spriteSize.x / 2),
            Math.round(canvas.height - spriteSize.y),
            spriteSize.x,
            spriteSize.y
        );
    };

    private getSpriteOffset() {
        const animationFrame = Math.ceil((Date.now() / 100) % 6) - 1;
        return {
            sx: (animationFrame * spriteSize.x),
            sy: 0,
            sw: spriteSize.x,
            sh: spriteSize.y,
        }
    }
}