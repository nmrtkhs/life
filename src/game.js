var BgLayer = cc.Layer.extend({
  sprite:null,
  ctor:function () {
    this._super();

    var size = cc.winSize;
    this.sprite = new cc.Sprite(res.GameBg_png);
    this.sprite.attr({
        x: size.width / 2,
        y: size.height / 2,
    });
    this.setScale(size.width / this.sprite.getContentSize().width);
    this.addChild(this.sprite, 0);

    return true;
  }
});

var PlayerLayer = cc.Layer.extend({
  sprite:null,
  ctor:function () {
    this._super();

    var size = cc.winSize;
    this.sprite = new cc.Sprite(res.Player_png);
    this.sprite.attr({
        x: size.width / 2,
        y: size.height / 2,
    });
    this.sprite.setScale(.4);
    this.addChild(this.sprite, 0);

    return true;
  }
});

var GameScene = cc.Scene.extend({
  onEnter:function () {
    this._super();

    var bgLayer = new BgLayer();
    this.addChild(bgLayer);
    var playerLayer = new PlayerLayer();
    this.addChild(playerLayer);

    var listener = cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      onTouchBegan: function(touch, event) {
          return true;
      },
      onTouchEnded: function(touch, event) {
        // 何度もおせないように一度押したらアクションを無効化する
        cc.eventManager.removeListener(listener);
      }.bind(this),
    }, this);
  }
});
