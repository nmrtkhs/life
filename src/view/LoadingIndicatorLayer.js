var LoadingIndicatorLayer = cc.LayerColor.extend({
  _className: "LoadingIndicatorLayer",
  sprite: null,

  ctor: function() {
    this._super(cc.color(0, 0, 0, 255 * .75));
    LoadingIndicatorLayer.prototype.init.call(this);
  },

  init: function() {
    var winSize = cc.director.getWinSize();
    
    this.sprite = new cc.Sprite(res.Loading_Indicator_png);
    this.sprite.attr({
        x: winSize.width / 2,
        y: winSize.height / 2,
        scale: 1,
    });
  
    
    var action = cc.rotateBy(0.25, 45).repeatForever();
    this.sprite.runAction(action);
    this.addChild(this.sprite);
  }
});
var LoadingIndicator = {
  layer: null,
  that: null,
  show: function(that) {
    this.that = that;
    this.layer = new LoadingIndicatorLayer();
    cc.eventManager.pauseTarget(that, true);
    that.addChild(this.layer);
  },
  hide: function() {
    this.that.removeChild(this.layer);
    cc.eventManager.resumeTarget(this.that, true);
  }
};