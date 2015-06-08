var BgLayer = cc.Layer.extend({
  sprite:null,
  ctor:function () {
    this._super();

    var size = cc.winSize;
    this.sprite = new cc.Sprite(res.BgGreen_png);
    this.sprite.attr({
        x: size.width / 2,
        y: size.height / 2,
    });
    this.setScale(size.height / this.sprite.getContentSize().height);
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
    var x = size.width / 2;
    var y = 160;
    this.sprite.attr({
        x: x,
        y: y
    });
    this.setAnchorPoint(.5, 0);
    this.sprite.setScale(.4);
    this.addChild(this.sprite, 0);

    var controlPoints = [ cc.p(0, 64), cc.p(64, 64), cc.p(-64, 64) ];
    var bezierForward = cc.bezierBy(10, controlPoints);
    var rep = cc.sequence(bezierForward).repeatForever();
    this.runAction(rep);

    return true;
  }
});

var GridLayer = cc.Layer.extend({
  ctor:function()  {
    this._super();

    var gridMaster = TestData.AreaMaster[1].gridMaster;
    var size = cc.winSize;
    var centerPos = cc.p(size.width / 2, size.height / 2);
    for (var i = 0; i < gridMaster.length; ++i) {
      var grid = TestData.AreaMaster[1].gridMaster[i];
      var resourcePath;
      cc.log(grid);
      switch (grid.type) {
        case "plus":
        resourcePath = res.GridYellow_png;
        break;
        case "minus":
        resourcePath = res.GridBlue_png;
        break;
        default:
      }
      this.sprite = new cc.Sprite(resourcePath);
      var x = size.width / 2;
      var y = 128 * i + 128;

      var direction = i % 2 == 0 ? 1 : -1;
      var draw = new cc.DrawNode();
      this.addChild(draw);
      draw.drawQuadBezier(cc.p(x, y), cc.p(x + (direction * 64), y + 64), cc.p(x, y + 128), 50, 10, cc.color(255, 0, 255, 255));

      this.sprite.attr({
        x: x,
        y: y
      });
      this.sprite.setScale(.4);
      this.addChild(this.sprite, 0);
    }
  }
});

var GameScene = cc.Scene.extend({
  onEnter:function () {
    this._super();

    var bgLayer = new BgLayer();
    this.addChild(bgLayer);
    var gridLayer = new GridLayer();
    this.addChild(gridLayer);
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
