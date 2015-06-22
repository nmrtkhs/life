var DialogLayer = ModalLayer.extend({
  _className: "DialogLayer",
  _box: null,

  ctor: function(message, onCallback) {
    this._super();
    cc.associateWithNative(this, cc.Layer);
    DialogLayer.prototype.init.call(this, message, onCallback);
  },

  init: function(message, onCallback) {
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

    var button = new ccui.Button();
    button.setTouchEnabled(true);
    button.setScale9Enabled(true);

    button.loadTextures("res/button_red.png", "res/button_red.png");
    button.setPosition(winSize.width / 2, winSize.height / 2 - 100);
    button.setContentSize(cc.size(winSize.width / 2, 50));
    button.setTitleFontSize(48);
    button.addTouchEventListener(function(){
      onCallback();
      this.removeFromParent();
    } ,this);
    button.setTitleText("OK");
    this.addChild(button);
  },
});
