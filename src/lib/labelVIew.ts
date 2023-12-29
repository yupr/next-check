import { Assets, Renderer, Text, Container, Sprite, TextStyle } from 'pixi.js';
import { Ticker } from '@pixi/core';
import { LabelViewInfo } from '@/types';

/**
 * canvasを描画
 */
export class LabelView {
  private renderer: Renderer;

  private container: Container;

  private nameText?: Text;

  private ticker: Ticker;

  private containerSize: { width: number; height: number };

  private labelViewInfo: LabelViewInfo;

  constructor(labelViewInfo: LabelViewInfo) {
    this.labelViewInfo = labelViewInfo;

    this.renderer = new Renderer({
      width: labelViewInfo.container.size.width,
      height: labelViewInfo.container.size.height,
      backgroundAlpha: 1,
      antialias: false, // パフォーマンス向上
      backgroundColor: 'red',
      // resolution: 1,
    });

    this.container = new Container();
    this.container.sortableChildren = true; // zIndexの有効化
    this.containerSize = labelViewInfo.container.size;

    // start animation
    this.ticker = new Ticker();
    this.ticker.start();

    this.render();
    this.setup();
  }

  // Containerとその更新結果を監視してrendererに反映。
  render() {
    this.ticker.add(() => {
      this.renderer.render(this.container);
    });
  }

  // 初期描画に必要な処理を実行後、生成したCanvas要素に反映。
  async setup() {
    const inputTextSprite = await this.getInputTextSprite();

    // 背景画像のSpriteを生成。
    const textures = await Assets.load('/img/bg_particles.png');
    const sprite = Sprite.from(textures);
    sprite.zIndex = 1;

    // Spriteをコンテナに追加。
    this.container.addChild(inputTextSprite);
    this.container.addChild(sprite);

    // コンテナをレンダラーにレンダリングされた後、canvas要素をdomに追加して画面に表示。
    const canvasElement = document.getElementById('canvas');
    canvasElement?.appendChild(this.renderer.view as HTMLCanvasElement);
    this.keepAspectResize();
  }

  // 文言変更時に再生成されるSpriteをコンテナーに追加。
  async changeText(inputText: string) {
    if (this.nameText) {
      this.nameText.destroy();
    }

    const inputTextSprite = await this.getInputTextSprite(inputText);
    this.container.addChild(inputTextSprite);
  }

  // 入力文言のSpriteを生成。
  private async getInputTextSprite(inputText?: string) {
    const { fontSize, position } = this.labelViewInfo.items.nickname;

    const textStyle = new TextStyle({
      fontSize: fontSize,
      fontWeight: 'normal',
      fill: inputText ? 'red' : '#a9a49b',
    });

    this.nameText = new Text(
      inputText ? inputText : 'Type Something',
      textStyle
    );

    this.nameText.zIndex = 2;
    this.nameText.position.set(position.x, position.y);

    return this.nameText;
  }

  // 縦横比を保ったまま矩形の大きさに合わせてリサイズ。
  keepAspectResize() {
    // 矩形の大きさを指定
    const borderWidth = 700;
    const borderHeight = 500;

    // 元画像の大きさに対する矩形の幅、高さの比率。
    const ratio = Math.min(
      borderWidth / this.containerSize.width,
      borderHeight / this.containerSize.height
    );

    const resizeWidth = Math.round(ratio * this.containerSize.width);
    const resizeHeight = Math.round(ratio * this.containerSize.height);

    if (this.renderer.view.style) {
      this.renderer.view.style.width = `${resizeWidth}px`;
      this.renderer.view.style.height = `${resizeHeight}px`;
    }
  }

  // toDataURL() {
  //   // 一回噛ませないと生成されない場合がある。
  //   // this.renderer.render(this.container);
  //   // const dataURL = this.renderer.view.toDataURL('image/jpeg');
  // }

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
