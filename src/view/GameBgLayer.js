var GameBgLayer = cc.Layer.extend({
  sprite:null,
  currentAreaProgress:0,
  nextProgress: 0,
  ctor:function (posY, areaIds) {
    this._super();

    var size = cc.winSize;
    this.sprite = new cc.Sprite(res.BgGreen_png);
    this.sprite.attr({
        x: size.width / 2,
        y: size.height / 2 + posY
    });
    this.sprite.setScaleX(size.width / this.sprite.getContentSize().width);
    this.sprite.setScaleY(size.height / this.sprite.getContentSize().height);
    this.addChild(this.sprite);

    return true;
  },
});