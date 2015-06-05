var InputNameLayer = ModalLayer.extend({
  _className: "InputNameLayer",
  _box: null,

  ctor: function(onCallback) {
    this._super();
    cc.associateWithNative(this, cc.Layer);
    InputNameLayer.prototype.init.call(this, onCallback);
  },

  init: function(onCallback) {
    var winSize = cc.director.getWinSize();
    this._box = new cc.EditBox(
      // cc.size(winSize.width * .7, winSize.height * .1),
      cc.size(this.getLayer().width - 50, 100),
      new cc.Scale9Sprite("res/editbox.png")
    );
    this._box.setPlaceHolder("名前を入力する");
    // this._box.x = 220;
    // this._box.y = 50;
    this._box.setPosition(winSize.width / 2, winSize.height / 2);
    this._box.setFontColor(cc.color(256, 256, 256));
    this._box.setDelegate(this);
    this._box.setFontSize(48);
    this._box.setPlaceholderFontSize(48);
    this._box.setMaxLength(10);
    this.addChild(this._box);

    var button = new ccui.Button();
    button.setTouchEnabled(true);
    button.setScale9Enabled(true);
    // button.loadTextures("res/button_red.png", "res/cocosui/buttonHighlighted.png", "");
    button.loadTextures("res/button_red.png");
    // button.x = this.getLayer().width / 2.0;
    // button.y = this.getLayer().height / 2.0;
    button.setPosition(winSize.width / 2, winSize.height / 2 - 100);
    button.setContentSize(cc.size(winSize.width / 2, 50));
    button.setTitleFontSize(48);
    var clicked = false;
    button.addTouchEventListener(function(){
      var name = this._box.getString();
      if (!clicked && name !== "") {
        clicked = true;
        onCallback(this._box.getString());
      }
    } ,this);
    button.setTitleText("決定");
    this.addChild(button);
  },

  okClick: function (sender, type) {
    switch (type) {
      // case ccui.Widget.TOUCH_BEGAN:
      //     this._topDisplayLabel.setString("Touch Down");
      //     break;
      // case ccui.Widget.TOUCH_MOVED:
      //     this._topDisplayLabel.setString("Touch Move");
      //     break;
      case ccui.Widget.TOUCH_ENDED:
          break;
      // case ccui.Widget.TOUCH_CANCELED:
      //     this._topDisplayLabel.setString("Touch Cancelled");
      //     break;

      default:
          break;
    }
  },
});
