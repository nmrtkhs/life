var GridLayer = cc.Layer.extend({
  ctor:function(posX, posY, areaId)  {
    this._super();

    var gridMaster = TestData.AreaMaster[1].gridMaster;
    var size = cc.winSize;
    var centerPos = cc.p(size.width / 2, size.height / 2);
    var isGoal = false;
    var isJunction = false;
    for (var i = 0; i < gridMaster.length; ++i) {
      var grid = TestData.AreaMaster[areaId].gridMaster[i];
      var resourcePath;
      switch (grid.type) {
        case "plus":
          resourcePath = res.GridYellow_png;
          break;
        case "minus":
          resourcePath = res.GridBlue_png;
          break;
        case "junction":
          resourcePath = res.GridBlue_png;
          isJunction = true;
          break;
        default:
      }
      this.sprite = new cc.Sprite(resourcePath);
      var x = size.width / 2 + posX;
      var y = 128 * i + posY + 100;

      var direction = i % 2 == 0 ? 1 : -1;
      var draw = new cc.DrawNode();
      this.addChild(draw, 0);

      if (isJunction) {
        draw.drawSegment(cc.p(x, y), cc.p(x + 128, y + 128), 5, cc.color(255, 0, 255, 255));
        draw.drawSegment(cc.p(x, y), cc.p(x - 128, y + 128), 5, cc.color(255, 0, 255, 255));
      } else if (!isGoal) {
        draw.drawSegment(cc.p(x, y), cc.p(x, y + 128), 5, cc.color(255, 0, 255, 255));
      }
      // ベジェ曲線の描画ロジック
      // draw.drawQuadBezier(cc.p(x, y), cc.p(x + (direction * 64), y + 64), cc.p(x, y + 128), 3, 10, cc.color(255, 0, 255, 255));

      this.sprite.attr({
        x: x,
        y: y
      });
      this.sprite.setScale(.4);
      this.addChild(this.sprite, 1);
    }
  }
});

var BgLayer = cc.Layer.extend({
  sprite:null,
  currentProgress:0,
  nextProgress: 0,
  ctor:function (posY, mapMaster) {
    this._super();

    var size = cc.winSize;
    this.sprite = new cc.Sprite(res.BgGreen_png);
    this.sprite.attr({
        x: size.width / 2,
        y: size.height / 2 + posY + 100
    });
    this.sprite.setScale(size.height / this.sprite.getContentSize().height);
    this.addChild(this.sprite);

    _.each(mapMaster, function(areaId, areaKey) {
      _areaId = areaId;
      var posX = 0;
      if (mapMaster.length >= 2) {
        posX = areaKey == 0 ? -128 : 128;
      }
      var gridLayer = new GridLayer(posX, posY, areaId);
      this.addChild(gridLayer);
    }.bind(this));

    return true;
  },

  forward: function(progress) {
    this.nextProgres = this.currentProgress + progress;
    this.playForwardAnim();
  },

  playForwardAnim: function() {
    var sequence = cc.sequence(
      cc.moveBy(1, cc.p(0, -128)),
      cc.callFunc(function(){
        this.currentProgress++;
        if (this.currentProgress < this.nextProgres) {
          this.playForwardAnim();
        }
      }, this)
    );
    this.runAction(sequence);

    // ベジェ曲線の移動ロジック
    // var direction = this.currentProgress % 2 == 0 ? -64 : 64;
    // var controlPoints = [ cc.p(0, 0), cc.p(direction, -64), cc.p(0, -128) ];
    // var bezierForward = cc.bezierBy(3, controlPoints);
    // var rep = cc.sequence(bezierForward, cc.callFunc(function(){
    //   this.currentProgress++;
    //   if (this.currentProgress < this.nextProgres) {
    //     this.playForwardAnim();
    //   }
    // }, this));
    // this.runAction(rep);
  }
});

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

    return true;
  }
});

var StatusLayer = cc.Layer.extend({
  turnLabel: null,
  nameLabel: null,
  isTapDice: false,
  ctor: function() {
    this._super();
    var draw = new cc.DrawNode();
    this.addChild(draw);

    var winSize = cc.winSize;
    var topPoints = [
      cc.p(0, winSize.height),
      cc.p(winSize.width, winSize.height),
      cc.p(winSize.width, winSize.height - 100),
      cc.p(0, winSize.height - 100),
    ];
    draw.drawPoly(topPoints, cc.color(255,0,0,128), 8, cc.color(0,128,128,255));

    var blockSize = cc.size(100, 100);

    // ターン数のラベル
    this.turnLabel = new cc.LabelTTF(
      "年齢:" + 19,
      "Arial",
      24,
      blockSize,
      cc.TEXT_ALIGNMENT_LEFT,
      cc.VERTICAL_TEXT_ALIGNMENT_CENTER
    );
    this.turnLabel.anchorX = 0;
    this.turnLabel.anchorY = 0;
    this.turnLabel.x = winSize.width - 100;
    this.turnLabel.y = winSize.height - blockSize.height;
    this.addChild(this.turnLabel);

    // 名前
    this.nameLabel = new cc.LabelTTF(
      "名前:" + TestData.UserData.name,
      "Arial",
      24,
      blockSize,
      cc.TEXT_ALIGNMENT_LEFT,
      cc.VERTICAL_TEXT_ALIGNMENT_CENTER
    );
    this.nameLabel.anchorX = 0;
    this.nameLabel.anchorY = 0;
    this.nameLabel.x = 0;
    this.nameLabel.y = winSize.height - blockSize.height;
    this.addChild(this.nameLabel);

    var bottomPoints = [
      cc.p(0, 0),
      cc.p(winSize.width, 0),
      cc.p(winSize.width, 100),
      cc.p(0, 100),
    ];
    draw.drawPoly(bottomPoints, cc.color(255,0,0,128), 8, cc.color(0,128,128,255));

    var button = new ccui.Button();
    button.setTouchEnabled(true);
    button.loadTextures("res/button_dice.png");
    button.setPosition(winSize.width - 60, 60);
    button.setScale(.5);
    // button.setContentSize(cc.size(10, 10));
    button.addTouchEventListener(function(){
      eventQueue.enqueue("tapDice");
    } ,this);
    this.addChild(button);

    return;
  },

  updateTurn: function(turnStr) {
    this.turnLabel.setString("年齢:" + TestData.UserData.turn);
  }
});

var GameScene = cc.Scene.extend({
  stateMachine: null,
  bgLayer: [],
  ctor: function() {
    this._super();
    this.stateMachine = new StateMachine(this);
    this.stateMachine.spawn(this.stateWaitInput);

    var bgPos = 0;
    _.each(TestData.MapMaster, function(mapMaster) {
      var bgLayer = new BgLayer(bgPos, mapMaster);
      bgPos += TestData.AreaMaster[_areaId].gridMaster.length * 128;
      this.bgLayer.push(bgLayer);
      this.addChild(bgLayer);
    }.bind(this));

    var playerLayer = new PlayerLayer();
    this.addChild(playerLayer);

    var statusLayer = new StatusLayer();
    statusLayer.updateTurn(30);
    this.addChild(statusLayer);

    var listener = cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      onTouchBegan: function(touch, event) {
          return true;
      },
      onTouchEnded: function(touch, event) {
        // 何度もおせないように一度押したらアクションを無効化する
        // cc.eventManager.removeListener(listener);
      }.bind(this),
    }, this);

    this.scheduleUpdate();
  },

  onEnter:function () {
    this._super();
  },
  update: function(dt) {
    this.stateMachine.exec();
  },
  stateWaitInput: function() {
    while (event = eventQueue.dequeue()) {
      switch (event) {
        case 'tapDice':
          var progress = _.random(1, 6);
          var dialogLayer = new DialogLayer( progress + "進みますよ,まじで進みますよ、本当に進みますよそれでもいいんですか？", function(){
            _.each(this.bgLayer, function(bgLayer){
             bgLayer.forward(progress);
            });
          }.bind(this));
          this.addChild(dialogLayer);
          this.stateMachine.switchTo(this.stateWaitForward);
          break;
        default:
        break;
      }
    }
  },
  stateWaitForward: function() {
  },
});
