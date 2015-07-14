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
   
    var user = Parse.User.current();
    
    var centerX = winSize.width / 2;
    var centerY = winSize.height / 2;
    var draw = new cc.DrawNode();
    this.addChild(draw);
    cc.log(user.get('income') * 2.25);
    cc.log(user.get('health') * 2.25);
    cc.log(user.get('housing') * 2.25);
    cc.log(user.get('education') * 2.25);
    cc.log(user.get('environment') * 2.25);
    cc.log(Math.cos(0 / 180 * Math.PI));
    var topPoints = [
//      cc.p(centerX + 45 * 5 * Math.sin(0 / 180 * Math.PI), centerY + 45 * 5 * Math.cos(0 / 180 * Math.PI)),
//      cc.p(centerX + 45 * 5 * Math.sin(72 / 180 * Math.PI), centerY + 45 * 5 * Math.cos(72 / 180 * Math.PI)),
//      cc.p(centerX + 45 * 5 * Math.sin(144 / 180 * Math.PI), centerY + 45 * 5 * Math.cos(144 / 180 * Math.PI)),
//      cc.p(centerX + 45 * 5 * Math.sin(216 / 180 * Math.PI), centerY + 45 * 5 * Math.cos(216 / 180 * Math.PI)),
//      cc.p(centerX + 45 * 5 * Math.sin(288 / 180 * Math.PI), centerY + 45 * 5 * Math.cos(288 / 180 * Math.PI)),
      
      cc.p(centerX + user.get('income') * 2.25 * Math.sin(0 / 180 * Math.PI), centerY + user.get('income') * 2.25 * Math.cos(0 / 180 * Math.PI)),
      cc.p(centerX + user.get('health') * 2.25  * Math.sin(72 / 180 * Math.PI), centerY + user.get('health') * 2.25 * Math.cos(72 / 180 * Math.PI)),
      cc.p(centerX + user.get('housing') * 2.25  * Math.sin(144 / 180 * Math.PI), centerY + user.get('housing') * 2.25 * Math.cos(144 / 180 * Math.PI)),
      cc.p(centerX + user.get('education') * 2.25  * Math.sin(216 / 180 * Math.PI), centerY + user.get('education') * 2.25 * Math.cos(216 / 180 * Math.PI)),
      cc.p(centerX + user.get('environment') * 2.25  * Math.sin(288 / 180 * Math.PI), centerY + user.get('environment') * 2.25 * Math.cos(288 / 180 * Math.PI)),
    ];
    cc.log(topPoints);
    draw.drawPoly(topPoints, cc.color(255,0,0,128), 8, cc.color(0,128,128,255));
    
    var blockSize = cc.size(400, 200);
    var label = new cc.LabelTTF(
      user.get("jobtypedetail"),
      "Arial",
      24,
      blockSize,
      cc.TEXT_ALIGNMENT_CENTER,
      cc.VERTICAL_TEXT_ALIGNMENT_CENTER
    );
     label.anchorX = 0.5;
     label.anchorY = 1;
    label.x = winSize.width / 2;
    label.y = winSize.height / 2 + 500;
    label.color = cc.color(255, 255, 255);
    label.fillStyle = cc.color(128, 128, 128);
    this.addChild(label);
    
    var listener = cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      onTouchBegan: function(touch, event) {
          return true;
      },
      onTouchEnded: function(touch, event) {
        if (cc.rectContainsPoint(label.getBoundingBox(), touch.getLocation())) {
          window.open(user.get("jobUrlPc"));
        } else {
          onCallback();
        }
      },
    }, this);
  },
});
