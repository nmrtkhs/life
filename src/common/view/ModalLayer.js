var ModalLayer = cc.LayerColor.extend({
  _className: "ModalLayer",
  sprite: null,

  ctor: function() {
    this._super(cc.color(0, 0, 0, 255 * .75));
    ModalLayer.prototype.init.call(this);
  },

  init: function() {
    var winSize = cc.director.getWinSize();
    this.sprite = new cc.Scale9Sprite(res.BgDialog_png);
    this.sprite.attr({
        x: winSize.width / 2,
        y: winSize.height / 2,
    });
    this.sprite.width = winSize.width * .8;
    this.sprite.height = winSize.height * .3;
    this.addChild(this.sprite);
  },

  getLayer: function() {
    return this.sprite;
  },
});
