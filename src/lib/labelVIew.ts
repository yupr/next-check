import { Assets, Renderer, Text, Container, Sprite, TextStyle } from 'pixi.js';
import { Ticker } from '@pixi/core';
import { LabelViewInfo } from '@/types';

/**
 * canvasを描画
 */
export class LabelView {
  private renderer: Renderer;

  private container: Container;

  private element: HTMLDivElement | null;

  private canvas: HTMLCanvasElement;

  private nameText?: Text;

  private ticker: Ticker;

  private containerSize: { width: number; height: number };

  private labelViewInfo?: LabelViewInfo;

  // TODO: canvasが描画される前にレンダリングされているため、
  // 画面の表示に係る要素はcanvasオブジェクトが表示できるようになったタイミングでレンダリングする。
  constructor(element: HTMLDivElement | null, labelViewInfo?: LabelViewInfo) {
    this.element = element;
    this.labelViewInfo = labelViewInfo;

    this.containerSize = labelViewInfo?.container.size ?? {
      width: 1192,
      height: 580,
    };

    this.renderer = new Renderer({
      width: this.containerSize.width,
      height: this.containerSize.height,
      backgroundAlpha: 1,
      antialias: true,
      // backgroundColor: 'red', // 表示のラグ確認用。
      // resolution: 1, // チラツキの原因。
    });

    this.container = new Container();
    this.container.sortableChildren = true; // zIndexの有効化

    this.ticker = new Ticker();
    this.ticker.start();

    // 事前にリソースの追加を行ってもラグが生じている.
    Assets.add('bg_particles', '/img/bg_particles.png');

    // TODO: 2度手間だが、型の不整合が起きるのでそれが解消できたら修正。
    this.canvas = this.renderer.view as HTMLCanvasElement;
    this.element?.appendChild(this.canvas);
    this.keepAspectResize();

    this.setup();
    this.render();
  }

  render() {
    if (this.ticker) {
      this.ticker.add(() => {
        this.renderer.render(this.container);
      });
    }
  }

  async setup() {
    const textures = await Assets.load('bg_particles');
    const sprite = Sprite.from(textures);
    sprite.zIndex = 1;
    this.container.addChild(sprite);
  }

  changeText(_name: string) {
    if (!this.labelViewInfo) return;

    if (this.nameText) {
      this.nameText.destroy();
    }

    const { fontSize, position } = this.labelViewInfo.items.nickname;
    const textStyle = new TextStyle({
      fontSize: fontSize,
      fontWeight: 'normal',
      fill: _name === '' ? '#a9a49b' : 'red',
    });

    this.nameText = new Text(
      _name === '' ? 'Type Something' : _name,
      textStyle
    );
    this.nameText.zIndex = 2;
    this.nameText.position.set(position.x, position.y);
    this.container.addChild(this.nameText);
  }

  // toDataURL() {
  //   // 一回噛ませないと生成されない場合がある
  //   // this.renderer.render(this.container);
  //   // const dataURL = this.renderer.view.toDataURL('image/jpeg');
  // }

  // 縦横比を保ったまま矩形の大きさに合わせてリサイズ
  keepAspectResize() {
    // 矩形の大きさを指定
    const borderWidth = 700;
    const borderHeight = 500;

    // 元画像の大きさに対する矩形の幅、高さの比率
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

    if (this.ticker) {
      this.ticker.stop();
      this.ticker.destroy();
    }
  }
}
