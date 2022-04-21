import { Application, Sprite, Texture, Text } from 'pixi.js';

// type props = {
// canvas: HTMLCanvasElement;
// }

/**
 * canvasを描画し、
 * base64dataURLに変換
 */
class LabelView {
  app: Application;

  constructor() {
    const { Application } = require('pixi.js');

    // キャンパスサイズと背景色を指定してステージを作成
    this.app = new Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });
  }

  createApp() {
    // 特定の要素に追加するのであれば
    // const el = document.getElementsByClassName('canvas__img')[0];
    // el.appendChild(app.view);
    // それをbodyに追加
    document.body.appendChild(this.app.view);
    return this.app;
  }

  async canvas() {
    const app = this.createApp();
    const texture: Texture = await Texture.fromURL(
      '../../img/bg_particles.png'
    );
    const sprite = Sprite.from(texture);
    app.stage.addChild(sprite);
    const titleText = new Text('Hello World!');
    app.stage.addChild(titleText);
  }
}

// const counter = new LabelView();
// counter.increment();
// const data = new LabelView();
export default LabelView;
