import { Canvas } from "./canvas";
import { ctx } from "./context";
import { Drawable } from "./drawable";
import { Player } from "./player";
import CharacterImage from "./assets/Character.png";

export class PlayerObject implements Drawable {
    private socketId: string;
    private player: Player;
    constructor(player: Player) {
        this.player = player;
        this.socketId = player.socketId;
    }

    draw: (canvas: Canvas) => void = (canvas) => {
        const context = canvas.context;

        context.beginPath();
        if (this.socketId === ctx.clientId) {
            context.font = '12px Tahoma';
            context.fillStyle = '#fff';
        } else {
            context.fillStyle = '#f0f';
        }
        context.arc(this.player.x + canvas.viewPort, canvas.height - 30, 30, 0, Math.PI * 2, true);
        context.fill();
        context.fillText(this.socketId, this.player.x + canvas.viewPort, canvas.height - 65);
    };
}