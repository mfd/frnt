class CoverSprite extends PIXI.Sprite {

    constructor ( texture, frameWidth, frameHeight, hAlign = 0.5, vAlign = 0.5 ) {
        super(texture);

        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.hAlign = hAlign;
        this.vAlign = vAlign;

        this.resize = ::this.resize;

        this.width = this.frameWidth;
        this.height = this.frameHeight;
    }

    resize ( frameWidth, frameHeight ) {
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;

        const textureWidth = this.texture.baseTexture.width;
        const textureHeight = this.texture.baseTexture.height;

        const widthFrame = Math.min(textureWidth, textureHeight * this.frameWidth / this.frameHeight);
        const heightFrame = Math.min(textureHeight, widthFrame * this.frameHeight / this.frameWidth);

        const x = Math.max(0, Math.min(textureWidth, textureWidth * 0.5 - widthFrame * 0.5 - 1));
        const y = Math.max(0, Math.min(textureHeight, textureHeight * 0.5 - heightFrame * 0.5 - 1));

        this.texture.frame = new PIXI.Rectangle(x, y, widthFrame, heightFrame);

        this.width = Math.round(this.frameWidth);
        this.height = Math.round(this.frameHeight);
    }

}

export default CoverSprite;