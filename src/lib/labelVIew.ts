import {
  Renderer,
  Text,
  Container,
  Sprite,
  utils,
  TextStyle,
  Texture,
} from 'pixi.js';

import labelData from '../../label.json';

/**
 * canvasを描画
 */
class LabelView {
  private renderer: Renderer;

  private container: Container;

  private element?: HTMLElement;

  private canvas: HTMLCanvasElement;

  private nameText?: Text;

  private containerSize: { width: number; height: number };

  constructor(element: HTMLElement | null) {
    this.element = element as HTMLElement;
    utils.skipHello();

    this.containerSize = labelData.container.size;
    this.renderer = new Renderer({
      width: this.containerSize.width,
      height: this.containerSize.height,
      backgroundColor: 0x10bb99,
      antialias: true,
      resolution: 1,
    });
    this.container = new Container();
    this.container.sortableChildren = true; // zIndexの有効化

    this.canvas = this.renderer.view;
    this.element?.appendChild(this.canvas);

    this.keepAspectResize();

    requestAnimationFrame(() => {
      this.render();
    });
    this.setup();
  }

  render() {
    if (this.renderer.view) {
      requestAnimationFrame(() => {
        this.render();
      });
      this.renderer.render(this.container);
    }
  }

  setup() {
    let sprite = new Sprite();
    sprite = new Sprite(Texture.from('/img/times_square.jpg'));
    sprite.width = 768;
    sprite.height = 510;
    sprite.zIndex = 1;
    this.container.addChild(sprite);
  }

  changeText(_name: string) {
    if (this.nameText) {
      this.nameText.destroy();
    }

    const { fontSize, position } = labelData.items.nickname;
    const textStyle = new TextStyle({
      fontSize: fontSize,
      fontWeight: 'normal',
      fill: _name === '' ? '#a9a49b' : 'black',
    });
    this.nameText = new Text(_name === '' ? 'Your Name' : _name, textStyle);
    this.nameText.position.set(position.x, position.y);
    this.container.addChild(this.nameText);
  }

  // 縦横比を保ったまま矩形の大きさに合わせてリサイズ
  keepAspectResize() {
    // 矩形の大きさを指定
    const borderWidth = 600;
    const borderHeight = 500;

    // 元画像の大きさ対する矩形の幅、高さの比率
    const ratio = Math.min(
      borderWidth / this.containerSize.width,
      borderHeight / this.containerSize.height
    );

    const resizeWidth = Math.round(ratio * this.containerSize.width);
    const resizeHeight = Math.round(ratio * this.containerSize.height);

    if (this.canvas) {
      this.canvas.style.width = `${resizeWidth}px`;
      this.canvas.style.height = `${resizeHeight}px`;
    }
  }

  destroy() {
    if (this.container && !this.container.destroyed) {
      this.container.destroy();
    }

    if (this.renderer) {
      this.renderer.destroy(true);
    }
  }
}

export default LabelView;
