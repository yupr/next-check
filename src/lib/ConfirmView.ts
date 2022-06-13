import { Renderer, Container, Sprite, Texture, Ticker } from 'pixi.js';

import labelData from '../../label.json';

class ConfirmView {
  private renderer: Renderer;

  private container: Container;

  private containerSize: { width: number; height: number };

  constructor() {
    this.containerSize = labelData.container.size;

    this.renderer = new Renderer({
      width: this.containerSize.width,
      height: this.containerSize.height,
      backgroundColor: 0x10bb99,
      backgroundAlpha: 1,
      antialias: true,
      resolution: 1,
    });

    this.container = new Container();
    this.container.sortableChildren = true;

    this.render();
    this.setup();
  }

  render() {
    if (this.renderer.view) {
      const ticker = Ticker.shared;
      ticker.add(() => {
        if (this.renderer.view) {
          this.renderer.render(this.container);
        }
      });
    }
  }

  setup() {
    let sprite = new Sprite();
    sprite = new Sprite(Texture.from('/img/times_square.jpg'));
    sprite.zIndex = 1;
    this.container.addChild(sprite);
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

export default ConfirmView;
