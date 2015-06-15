var DialogSelectLayer = ModalLayer.extend({
  _className: "DialogSelectLayer",
  _box: null,

  // 基本は右がok 左はcancell
  ctor: function(message, rightMessage, leftMessage, onRightCallback, onLeftCallback) {
    this._super();
    cc.associateWithNative(this, cc.Layer);
    DialogSelectLayer.prototype.init.call(this, message, rightMessage, leftMessage, onRightCallback, onLeftCallback);
  },

  init: function(message, rightMessage, leftMessage, onRightCallback, onLeftCallback) {
    var winSize = cc.director.getWinSize();

    var blockSize = cc.size(400, 400);
    var label = new cc.LabelTTF(
      message,
      "Arial",
      24,
      blockSize,
      cc.TEXT_ALIGNMENT_CENTER,
      cc.VERTICAL_TEXT_ALIGNMENT_CENTER
    );
    // label.anchorX = 0;
    // label.anchorY = 0;
    label.x = winSize.width / 2;
    label.y = winSize.height / 2  + 100;
    label.color = cc.color(0, 0, 0);
    this.addChild(label);

    var rightButton = new ccui.Button();
    rightButton.setTouchEnabled(true);
    rightButton.setScale9Enabled(true);

    rightButton.loadTextures("res/button_red.png");
    rightButton.setPosition(winSize.width / 2 + 100, winSize.height / 2 - 100);
    rightButton.setContentSize(cc.size(winSize.width / 4, 50));
    rightButton.setTitleFontSize(48);
    rightButton.addTouchEventListener(function(){
      onRightCallback();
      this.removeFromParent();
    } ,this);
    rightButton.setTitleText(rightMessage);
    this.addChild(rightButton);

    var leftButton = new ccui.Button();
    leftButton.setTouchEnabled(true);
    leftButton.setScale9Enabled(true);

    leftButton.loadTextures("res/button_red.png");
    leftButton.setPosition(winSize.width / 2 - 100, winSize.height / 2 - 100);
    leftButton.setContentSize(cc.size(winSize.width / 4, 50));
    leftButton.setTitleFontSize(48);
    leftButton.addTouchEventListener(function(){
      onLeftCallback();
      this.removeFromParent();
    } ,this);
    leftButton.setTitleText(leftMessage);
    this.addChild(leftButton);
  },
});
