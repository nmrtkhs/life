var LAYER_BG = 1;
var LAYER_PLAYER = 2;
var LAYER_HUD = 3;

var SpaceLayer = cc.Layer.extend({
  ctor:function(posX, posY, areaId)  {
    this._super();
    var spaceColor = {
      'start': cc.color(255, 0, 0),
      'plus': cc.color(0, 255, 255),
      'minus': cc.color(0, 0, 255),
      'goal': cc.color(0,0,0)
    }

    var areaMaster = TestData.AreaMaster[areaId];
    var size = cc.winSize;
    var centerPos = cc.p(size.width / 2, size.height / 2);
    var spaceMaster = TestData.SpaceMaster[areaId];

    for (var i = 0; i < spaceMaster.length; ++i) {
      // this.sprite = new cc.Sprite(resourcePath);
      var x = size.width / 2 + posX;
      var y = 128 * i + posY + 100;

      var direction = i % 2 == 0 ? 1 : -1;
      var draw = new cc.DrawNode();
      this.addChild(draw, 0);

      if (i == spaceMaster.length - 1) {
        switch (areaMaster.junctionType) {
          case "normal":
            draw.drawSegment(cc.p(x, y), cc.p(x, y + 128), 5, cc.color(255, 0, 255, 255));
            break;

          case "toTwo":
            draw.drawSegment(cc.p(x, y), cc.p(x + 128, y + 128), 5, cc.color(255, 0, 255, 255));
            draw.drawSegment(cc.p(x, y), cc.p(x - 128, y + 128), 5, cc.color(255, 0, 255, 255));
            break;

          case "toOne":
            if (posX > 0) {
              draw.drawSegment(cc.p(x, y), cc.p(x - 128, y + 128), 5, cc.color(255, 0, 255, 255));
            } else {
              draw.drawSegment(cc.p(x, y), cc.p(x + 128, y + 128), 5, cc.color(255, 0, 255, 255));
            }
          break;
          default:
          break;
        }
      } else {
        draw.drawSegment(cc.p(x, y), cc.p(x, y + 128), 5, cc.color(255, 0, 255, 255));
      }
      // ベジェ曲線の描画ロジック
      // draw.drawQuadBezier(cc.p(x, y), cc.p(x + (direction * 64), y + 64), cc.p(x, y + 128), 3, 10, cc.color(255, 0, 255, 255));
      var color = spaceMaster[i].value >= 0 ? spaceColor['plus'] : spaceColor['minus'];
      if (spaceMaster[i].type == 'goal' ||
      spaceMaster[i].type == 'start') {
        color = spaceColor[spaceMaster[i].type];
      }
      draw.drawDot(cc.p(x, y), 40, cc.color(255, 0, 255, 255));
      draw.drawDot(cc.p(x, y), 35, color);
    }
  }
});

var BgLayer = cc.Layer.extend({
  sprite:null,
  currentAreaProgress:0,
  nextProgress: 0,
  ctor:function (posY, areaIds) {
    this._super();

    var size = cc.winSize;
    this.sprite = new cc.Sprite(res.BgGreen_png);
    this.sprite.attr({
        x: size.width / 2,
        y: size.height / 2 + posY + 100
    });
    this.sprite.setScale(size.height / this.sprite.getContentSize().height);
    this.addChild(this.sprite);

    _.each(areaIds, function(areaId, areaKey) {
      _areaId = areaId;
      var posX = 0;
      if (areaIds.length >= 2) {
        posX = areaKey == 0 ? -128 : 128;
      }
      var spaceLayer = new SpaceLayer(posX, posY, areaId);
      this.addChild(spaceLayer);
    }.bind(this));

    return true;
  },
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
      cc.size(400, 100),
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
    button.loadTextures("res/button_dice.png", "res/button_dice.png", "");
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
  playerLayer: null,
  remainingStep: 0,
  endBgProgressNum: 0,
  isSelect: false,
  isRightSelect: false,
  currentMap: "",
  // currentMap: "47",
  currentMapProgress: 0,
  currentArea: "47_20",
  currentAreaProgress: 0,
  mapSelectMap: {},
  ctor: function() {
    this._super();
    this.stateMachine = new StateMachine(this);
    this.stateMachine.spawn(this.stateAreaSelectDialog);

    this.playerLayer = new PlayerLayer();
    this.addChild(this.playerLayer, LAYER_PLAYER);

    var statusLayer = new StatusLayer();
    statusLayer.updateTurn(30);
    this.addChild(statusLayer, LAYER_HUD);

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
  stateAreaSelectDialog: function() {
    if (this.currentMap == "") {
      var dialogText = "";
      for (var i = 1; i <= 6; ++i) {
        var mapId = Object.keys(TestData.MapMaster)[_.random(1, TestData.MapMaster.length)];
        this.mapSelectMap[i] = mapId;
        dialogText += i + ":" + TestData.PrefecturesMaster[mapId].name;
        if (i % 2 == 0) {
          dialogText += "\n";
        } else {
          dialogText += "  ";
        }
      }
      this.isSelect = false;
      var dialogLayer = new DialogLayer( dialogText , function(){
        this.isSelect = true;
      }.bind(this));
      this.addChild(dialogLayer, LAYER_HUD);
      this.stateMachine.switchTo(this.stateWaitAreaSelectDialog);
    } else {
      this.stateMachine.switchTo(this.stateJobSelect);
    }
  },
  stateWaitAreaSelectDialog: function() {
    if (this.isSelect) {
      this.isSelect = false;
      eventQueue.clear();
      this.stateMachine.switchTo(this.stateWaitInputArea);
    }
  },
  stateWaitInputArea: function() {
    while (event = eventQueue.dequeue()) {
      switch (event) {
        case 'tapDice':
          var diceResult = _.random(1, 6);
          this.currentMap = this.mapSelectMap[diceResult];
          this.currentMap = "47";//todo
          var dialogLayer = new DialogLayer( TestData.PrefecturesMaster[this.currentMap].name + "に決定", function(){
            this.isSelect = true;
          }.bind(this));
          this.addChild(dialogLayer, LAYER_HUD);
          this.stateMachine.switchTo(this.stateWaitAreaDecide);
          return;
        default:
        break;
      }
    }
  },
  stateWaitAreaDecide: function() {
    if (this.isSelect) {
      this.isSelect = false;
      this.stateMachine.switchTo(this.stateJobSelect);
    }
  },
  stateJobSelect: function() {
    if (Object.keys(TestData.UserData.job).length == 0)  {
      cc.loader.loadJs("src/vendor/parse-1.4.2.min.js", function(err){
          if(err) return console.log("load failed");
          //success
          Parse.localStorage = cc.sys.localStorage
          Parse.initialize("mSG7zu4TcARzR3oyRADDXA2ShP6l7Kw5XigzNjUt", "Fqu944VkhOEZaUsM80Me97rcpKvNuD4kfUCTHsRB");

          var TestObject = Parse.Object.extend("TestObject");
          var testObject = new TestObject();
          testObject.save({foo: "bar"}).then(function(object) {
              cc.log("yay! it worked");
          });

          // Parse.Cloud.run('hello', {spc: "001" + this.currentArea}, {
          var areaCode = "0" + this.currentMap;
          cc.log(areaCode);
          Parse.Cloud.run('hello', {spc: areaCode}, {
            success: function(result) {
              cc.log(result);
            },
            error: function(error) {
            }
          });
      }.bind(this));

      this.stateMachine.switchTo(this.stateWaitJobSelect);
    } else {
      eventQueue.clear();
      this.stateMachine.switchTo(this.stateSetBgLayer);
    }
  },
  stateWaitJobSelect: function() {
    this.stateMachine.switchTo(this.stateSetBgLayer);
  },
  stateSetBgLayer: function() {
    var bgPos = 0;
    _.each(TestData.MapMaster[this.currentMap], function(mapMaster) {
      var bgLayer = new BgLayer(bgPos, mapMaster.areaIds);
      bgPos += TestData.SpaceMaster[mapMaster.areaIds[0]].length * 128;
      this.bgLayer.push(bgLayer);
      this.addChild(bgLayer, LAYER_BG);
    }.bind(this));
    this.stateMachine.switchTo(this.stateWaitInput);
  },
  stateWaitInput: function() {
    while (event = eventQueue.dequeue()) {
      switch (event) {
        case 'tapDice':
          this.remainingStep = _.random(1, 6);
          // this.remainingStep = 19;
          var dialogLayer = new DialogLayer( this.remainingStep + "進みますよ？", function(){
            this.endBgProgress = 0;
            this.isSelect = true;
          }.bind(this));
          this.addChild(dialogLayer, LAYER_HUD);
          this.stateMachine.switchTo(this.stateConfirmProgress);
          return;
        default:
        break;
      }
    }
  },
  stateConfirmProgress: function() {
    if (this.isSelect) {
      this.isSelect = false;
      // this.stateMachine.switchTo(this.stateForward);
      this.stateMachine.switchTo(this.stateCheckJunction);
    }
  },
  stateCheckJunction: function() {
    var areaMaster = TestData.AreaMaster[this.currentArea];
    if (this.currentAreaProgress >= TestData.SpaceMaster[this.currentArea].length - 1) {
      if (areaMaster.junctionType == "toTwo") {
        var dialogLayer = new DialogSelectLayer("どちらに進みますか", "右", "左", function(){
          this.isSelect = true;
          this.isRightSelect = true;
        }.bind(this),
        function() {
          this.isSelect = true;
        }.bind(this));
        this.addChild(dialogLayer, LAYER_HUD);
        this.stateMachine.switchTo(this.stateWaitJunction);
      } else if (areaMaster.junctionType == "toOne") {
        if (this.playerLayer.getPosition().x > 0) {
          this.playerLayer.runAction(cc.moveBy(1, cc.p(-128, 0)))
        } else {
          this.playerLayer.runAction(cc.moveBy(1, cc.p(128, 0)))
        }
        this.stateMachine.switchTo(this.stateForward);
      } else {
        this.stateMachine.switchTo(this.stateForward);
      }
    } else {
      this.stateMachine.switchTo(this.stateForward);
    }
  },
  stateWaitJunction: function() {
    if (this.isSelect) {
      this.isSelect = false;
      this.playerLayer.runAction(cc.moveBy(1, cc.p(this.isRightSelect ? 128 : -128, 0)))
      this.currentMapProgress++;
      this.currentAreaProgress = -1;
      var areaInfo = TestData.MapMaster[this.currentMap][this.currentMapProgress];
      this.currentArea = areaInfo.areaIds[this.isRightSelect ? 0 : 1];
      this.isRightSelect = false;
      this.stateMachine.switchTo(this.stateForward);
    }
  },
  stateForward: function() {
    this.remainingStep--;
    this.currentAreaProgress++;
    if (this.currentAreaProgress >= TestData.SpaceMaster[this.currentArea].length) {
      this.currentAreaProgress = 0;
      this.currentMapProgress++;
      var areaInfo = TestData.MapMaster[this.currentMap][this.currentMapProgress];
      this.currentArea = areaInfo.areaIds[0];
    }
    _.each(this.bgLayer, function(bgLayer){
      // bgLayer.forward(progress);
      var sequence = cc.sequence(
        cc.moveBy(1, cc.p(0, -128)),
        cc.callFunc(function(){
          this.endBgProgressNum++;
        }, this)
      );
      bgLayer.runAction(sequence);
    }.bind(this));

    this.stateMachine.switchTo(this.stateForwarding);
  },
  stateForwarding: function() {
    // 全てのアニメが完了
    if (this.endBgProgressNum == this.bgLayer.length) {
      this.endBgProgressNum = 0;
      if (TestData.SpaceMaster[this.currentArea][this.currentAreaProgress].type == "goal") {
        var dialogLayer = new DialogLayer("おめでとう！！ゴールしました", function(){
          this.isSelect = true;
        }.bind(this));
        this.addChild(dialogLayer, LAYER_HUD);
        this.stateMachine.switchTo(this.stateEnd);
        return;
      }
      if (this.remainingStep <= 0) {
        this.stateMachine.switchTo(this.stateEvent);
      } else {
        this.stateMachine.switchTo(this.stateCheckJunction);
      }
    }
  },
  stateEvent: function() {
    cc.log("stateEvent");
    var dialogLayer = new DialogLayer(TestData.SpaceMaster[this.currentArea][this.currentAreaProgress].description, function(){
      this.isSelect = true;
    }.bind(this));
    this.addChild(dialogLayer, LAYER_HUD);
    this.stateMachine.switchTo(this.stateWaitEvent);
  },
  stateWaitEvent: function() {
    cc.log("stateWaitEvent");
    if (this.isSelect) {
      this.isSelect = false;
      eventQueue.clear();
      this.stateMachine.switchTo(this.stateWaitInput);
    }
  },
  stateEnd: function() {

  },
});
