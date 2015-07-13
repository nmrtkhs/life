var DialogMultiSelectLayer = ModalLayer.extend({
  _className: "DialogLayer",
  _box: null,

  ctor: function(message, isBig, onCallback) {
    this._super();
    cc.associateWithNative(this, cc.Layer);
    DialogMultiSelectLayer.prototype.init.call(this, message, isBig, onCallback);
  },

  init: function(message, isBig, onCallback) {
    var winSize = cc.director.getWinSize();

    var blockSize = cc.size(400, 400);
    if (isBig) {
      blockSize = cc.size(400, 800);
    }
    
    var label = new cc.LabelTTF(
      message,
      "Arial",
      24,
      blockSize,
      cc.TEXT_ALIGNMENT_CENTER,
      cc.VERTICAL_TEXT_ALIGNMENT_CENTER
    );
     label.anchorX = 0.5;
     label.anchorY = 1;
    label.x = winSize.width / 2;
    label.y = winSize.height / 2 + 250;
    label.color = cc.color(0, 0, 0);
    this.addChild(label);

    var button = new ccui.Button();
    button.setTouchEnabled(true);
    button.setScale9Enabled(true);

    button.loadTextures("res/button_red.png", "res/button_red.png");
    button.setPosition(winSize.width / 2, winSize.height / 2 - 100);
    button.setContentSize(cc.size(winSize.width / 2 + 100, 50));
    button.setTitleFontSize(48);
    button.addTouchEventListener(function(){
      onCallback();
    } ,this);
    button.setTitleText("ルーレットを回す");
    
    if (isBig) {
      label.y = winSize.height / 2 + 450;
      button.setPosition(winSize.width / 2, winSize.height / 2 - 250);
      this.sprite.height = winSize.height * .6;
    }
    
    this.addChild(button);
  },
});
