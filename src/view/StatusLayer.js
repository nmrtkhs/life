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

    var button = new ccui.Button();
    button.setTouchEnabled(true);
    button.loadTextures("res/roulette_6.png", "res/roulette_6.png", "");
    button.setPosition(winSize.width - 65, 65);
    button.setScale(.25);
    // button.setContentSize(cc.size(10, 10));
    button.addTouchEventListener(function(){
      eventQueue.enqueue("tapRoulette");
    } ,this);
    this.addChild(button);

    return;
  },

  updateTurn: function(turnStr) {
    this.turnLabel.setString("年齢:" + TestData.UserData.turn);
  }
});