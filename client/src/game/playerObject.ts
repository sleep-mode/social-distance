import { Canvas } from "./canvas";
import { ctx } from "./context";
import { Drawable } from "./drawable";
import { Player } from "./models/Player";
import CharacterImage from "./assets/Character.png";
import { loadImage } from "./utility";

let sprite: HTMLImageElement;
loadImage(CharacterImage).then(res => {
    sprite = res;
});

export class PlayerObject implements Drawable {
    private socketId: string;
    private player: Player;
    private sprite?: HTMLImageElement;
    constructor(player: Player) {
        this.player = player;
        this.socketId = player.socketId;
    }

    public getPlayer(): Player {
        return this.player;
    }

    public update(deltaTime: number) {
        this.player.x += 300 * this.player.direction * deltaTime;
    }

    public sync(player: Player) {
        this.player = player;
    }

    draw: (canvas: Canvas) => void = (canvas) => {
        if (!sprite) return;

        const context = canvas.context;

        if (this.socketId === ctx.clientId) {
            context.font = '12px Tahoma';
            context.fillStyle = '#fff';
        } else {
            context.fillStyle = '#f0f';
        }
        const offset = this.getSpriteOffset();
        context.drawImage(sprite, offset.sx, offset.sy, offset.sw, offset.sh, this.player.x + canvas.viewPort - 30, canvas.height - 60, 60, 60);
        context.fillText(this.socketId, this.player.x + canvas.viewPort, canvas.height - 65);
    };

    private getSpriteOffset() {
        const isMyPlayer = this.socketId === ctx.clientId;
        const direction = this.player.direction;
        const animationFrame = Math.ceil((Date.now() / 100) % 2) - 1;
        return {
            sx: (direction === 1 ? 0 : 180) + animationFrame * 60,
            sy: isMyPlayer ? 60 : 180,
            sw: 60,
            sh: 60,
        }
    }
}