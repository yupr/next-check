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

  private sprite?: Sprite;

  private nameText?: Text;

  private containerSize: { width: number; height: number };

  private xRatio: number;

  constructor(element: HTMLElement | null) {
    if (element) this.element = element;
    utils.skipHello(); //Todo: what?

    this.renderer = new Renderer({
      width: 600,
      height: 400,
      backgroundColor: 0x10bb99,
      clearBeforeRender: true,
      // antialias: true,
      // resolution: 1
    });
    this.container = new Container();
    this.container.sortableChildren = true; // zIndexの有効化
    this.element?.appendChild(this.renderer.view);

    this.containerSize = labelData.container.size;
    this.xRatio = this.renderer.view.width / this.containerSize.width; //リサイズ後と元画像の枠の幅の比率

    // window.addEventListener('resize', () => {
    //   this.resize();
    // });

    this.keepAspectResize();

    requestAnimationFrame(() => {
      this.render();
    });

    this.load();
  }

  render() {
    if (this.renderer.view) {
      requestAnimationFrame(() => {
        this.render();
      });
      this.renderer.render(this.container);
    }
  }

  load() {
    const sprite = new Sprite(Texture.from('/img/bg_particles.png'));
    sprite.width = 100;
    sprite.height = 50;
    sprite.position.set(100, 30);
    this.container.addChild(sprite);

    // sprite = new Sprite(Texture.from('/img/cat.jpeg'));
    // sprite.width = 64;
    // sprite.height = 96;
    // sprite.position.set(30, 30);
    // sprite.zIndex = 1;
    // this.container.addChild(sprite);

    // sprite = new Sprite(Texture.from('/img/hana.jpeg'));
    // sprite.width = 64;
    // sprite.height = 96;
    // sprite.position.set(0, 0);
    // sprite.zIndex = -1;
    // this.container.addChild(sprite);

    // 初期表示はキャッシュを残しておく必要がないので、sprite表示後明示的ににクリア
    utils.clearTextureCache();
  }

  select(src: string) {
    const imageList = ['/img/hana.jpeg'];
    const newImageList = [...imageList, src];

    if (this.sprite) {
      this.sprite.destroy();
    }

    this.container.children.forEach((child: any, index) => {
      const cachId = child.texture?.textureCacheIds[0];
      if (cachId && newImageList.includes(cachId)) {
        this.container.children[index].destroy();
      }
    });

    newImageList.forEach((imgSrc, index) => {
      this.sprite = new Sprite(Texture.from(imgSrc));
      this.sprite.width = 64;
      this.sprite.height = 96;
      this.sprite.position.x = (index + 1) * 3 * 30;
      this.container.addChild(this.sprite);
    });
  }

  changeText(_name: string) {
    if (this.nameText) {
      this.nameText.destroy();
    }

    const { fontSize, position } = labelData.items.nickname;
    const textStyle = new TextStyle({
      fontSize: fontSize * this.xRatio,
      fontWeight: 'normal',
      fill: _name === '' ? '#a9a49b' : 'black',
    });
    this.nameText = new Text(_name === '' ? 'Your Name' : _name, textStyle);
    this.nameText.x = position.x * this.xRatio;
    this.nameText.y = position.y * this.xRatio;
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

    if (this.renderer.view) {
      this.renderer.view.width = resizeWidth;
      this.renderer.view.height = resizeHeight;

      console.log('size', resizeWidth, resizeHeight, ratio);
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
