var ChartLayer = cc.LayerColor.extend({
  _className: "ChartLayer",

  ctor: function(onCallback) {
    this._super(cc.color(0, 0, 0, 255 * .75));
    ChartLayer.prototype.init.call(this, onCallback);
  },
  
  init: function(onCallback) {
    var winSize = cc.director.getWinSize();
    var sprite = new cc.Sprite(res.Chart_png);
    sprite.attr({
        x: winSize.width / 2,
        y: winSize.height / 2,
        scale: 1,
    });
    this.addChild(sprite);
   
    var centerX = winSize.width / 2;
    var centerY = winSize.height / 2;
    var draw = new cc.DrawNode();
    this.addChild(draw);
    cc.log(Math.cos(0 / 180 * Math.PI));
    var topPoints = [
      cc.p(centerX + 45 * 5 * Math.sin(0 / 180 * Math.PI), centerY + 45 * 5 * Math.cos(0 / 180 * Math.PI)),
      cc.p(centerX + 45 * 5 * Math.sin(72 / 180 * Math.PI), centerY + 45 * 5 * Math.cos(72 / 180 * Math.PI)),
      cc.p(centerX + 45 * 5 * Math.sin(144 / 180 * Math.PI), centerY + 45 * 5 * Math.cos(144 / 180 * Math.PI)),
      cc.p(centerX + 45 * 5 * Math.sin(216 / 180 * Math.PI), centerY + 45 * 5 * Math.cos(216 / 180 * Math.PI)),
      cc.p(centerX + 45 * 5 * Math.sin(288 / 180 * Math.PI), centerY + 45 * 5 * Math.cos(288 / 180 * Math.PI)),
    ];
    cc.log(topPoints);
    draw.drawPoly(topPoints, cc.color(255,0,0,128), 8, cc.color(0,128,128,255));
    
    var listener = cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      onTouchBegan: function(touch, event) {
          return true;
      },
      onTouchEnded: function(touch, event) {
        onCallback();
      },
    }, this);
  },
});
