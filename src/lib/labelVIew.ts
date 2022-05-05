import {
  Application,
  Renderer,
  Text,
  Container,
  Sprite,
  utils,
  TextStyle,
} from 'pixi.js';

// type props = {
// canvas: HTMLCanvasElement;
// }

/**
 * canvasを描画
 */
class LabelView {
  private app: Application;

  private renderer: Renderer;

  private container: Container;

  private element?: HTMLElement;

  private nameText?: Text;

  private textStyle: TextStyle;

  private coordinate: { x: number; y: number };

  private containerSize: { width: number; height: number };

  constructor(element: HTMLElement | null) {
    if (element) this.element = element;
    this.app = new Application();
    this.renderer = new Renderer({
      width: 800,
      height: 600,
      backgroundColor: 0x10bb99,
    });
    this.container = new Container();

    // backend側で生成した画像の情報を元に、アスペクト比を用いてフロントで描画する大きさ、座標に配置されるよう調整
    const data = {
      containerSize: { width: 400, height: 200 },
      coordinate: { x: 130, y: 85 },

      // パターン1: フロントで生成する画像より大きい場合
      // containerSize: { width: 800, height: 400 },
      // coordinate: { x: 260, y: 170 },

      // パターン2: フロントで生成する画像より極端に小さい場合
      // containerSize: { width: 100, height: 50 },
      // coordinate: { x: 32.5, y: 21.25 },

      fontSize: 30,
    };
    // -----------------------------------------------------------------------------------------

    const { containerSize, coordinate, fontSize } = data;
    this.coordinate = coordinate;
    this.containerSize = containerSize;

    this.renderer.view.width = 600; // 横幅は固定
    this.renderer.view.height =
      (this.renderer.view.width / this.containerSize.width) *
      this.containerSize.height;

    this.textStyle = new TextStyle({
      fontSize:
        fontSize * (this.renderer.view.width / this.containerSize.width),
      fontWeight: 'normal',
      fill: '#a9a49b',
    });

    // 画像を読み込む
    this.app.loader.add('/img/bg_particles.png').load(() => {
      this.setup();
    });
  }

  setup() {
    // 画像設定する前にキャッシュを削除。気休め程度
    utils.clearTextureCache();

    const sprite = new Sprite(
      this.app.loader.resources['/img/bg_particles.png'].texture
    );
    this.nameText = new Text('Your Name', this.textStyle);

    // 座標指定
    this.nameText.x =
      this.coordinate.x * (this.renderer.view.width / this.containerSize.width);
    this.nameText.y =
      this.coordinate.y * (this.renderer.view.width / this.containerSize.width);

    this.container.addChild(sprite);
    this.container.addChild(this.nameText);

    this.renderer.render(this.container);
    // canvas要素を追加
    this.element?.appendChild(this.renderer.view);
  }

  // nameが変更されたらその都度 viewをいじる
  changeText(_name: string) {
    if (this.nameText && !this.nameText.destroyed) {
      this.nameText.destroy();
    }

    if (_name.length === 0) {
      this.nameText = new Text('Your Name', this.textStyle);
    } else {
      this.nameText = new Text(_name, { fill: 'green' });
    }

    // 座標指定
    this.nameText.x =
      this.coordinate.x * (this.renderer.view.width / this.containerSize.width);
    this.nameText.y =
      this.coordinate.y * (this.renderer.view.width / this.containerSize.width);

    this.container.addChild(this.nameText);
    this.renderer.render(this.container);
  }

  // キャッシュ周り削除
  destroy() {
    if (this.container && !this.container.destroyed) {
      this.container.destroy();
    }

    if (this.renderer.view) {
      this.renderer.destroy();
    }

    // これ入れないとcanvas要素が重複して表示される。
    if (this.app.loader) {
      this.app.loader.destroy();
    }
  }
}

export default LabelView;
