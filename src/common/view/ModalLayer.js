var ModalLayer = cc.LayerColor.extend({
  _className: "ModalLayer",
  _layer: null,

  ctor: function() {
    this._super(cc.color(0, 0, 0, 255 * .75));
    ModalLayer.prototype.init.call(this);
  },

  init: function() {
    var winSize = cc.director.getWinSize();
    _layer = new cc.LayerColor(cc.color(238, 238, 238), winSize.width * .9, winSize.height * .9);
    _layer.setAnchorPoint(0.5, 0.5);
    _layer.setPosition(winSize.width / 2, winSize.height / 2);
    _layer._ignoreAnchorPointForPosition = false;
    this.addChild(_layer);
  },

  getLayer: function() {
    return _layer;
  },
});
