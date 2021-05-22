import { Canvas } from "./canvas";

export interface Drawable {
    draw: (canvas: Canvas) => void;
}