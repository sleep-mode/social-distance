export async function loadImage(asset: any): Promise<HTMLImageElement> {
    const image = new Image();
    image.src = asset;
    return new Promise(resolve => {
        image.addEventListener('load', () => {
            resolve(image);
        });
    });
}