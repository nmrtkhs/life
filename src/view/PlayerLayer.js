var PlayerLayer = cc.Layer.extend({
  sprite:null,
  ctor:function () {
    this._super();

    var size = cc.winSize;
    this.sprite = new cc.Sprite(res.Player_png);
    var x = size.width / 2;
    var y = 142;
    this.sprite.attr({
        x: x,
        y: y
    });
    this.setAnchorPoint(.5, 0);
    this.sprite.setScale(.4);
    this.addChild(this.sprite, 0);
    
    var listener = cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      onTouchBegan: function(touch, event) {
          return true;
      },
      onTouchEnded: function(touch, event) {
        var spriteRect = this.sprite.getBoundingBox();
        spriteRect.x += this.sprite.getParent().getPosition().x;
        spriteRect.y += this.sprite.getParent().getPosition().y
        if (cc.rectContainsPoint(spriteRect, touch.getLocation())) {
          eventQueue.enqueue("tapStatus");
        }
      }.bind(this),
    }, this);

    return true;
  }
});