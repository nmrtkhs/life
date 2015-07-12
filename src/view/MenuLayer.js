var MenuLayer = cc.LayerColor.extend({
  _className: "MenuLayer",
  sprite: null,

  ctor: function() {
    this._super(cc.color(244, 244, 244));
    MenuLayer.prototype.init.call(this);
  },

  init: function() {
    var winSize = cc.director.getWinSize();
    
    var logoutButton = new ccui.Button();
    logoutButton.setTouchEnabled(true);
    logoutButton.setScale9Enabled(true);
    logoutButton.loadTextures("res/button_red.png", "res/button_red.png");
    logoutButton.setPosition(winSize.width / 2 - 70, winSize.height / 2 - 150);
    logoutButton.setContentSize(cc.size(winSize.width / 2, 50));
    logoutButton.setTitleFontSize(48);
    logoutButton.addTouchEventListener(function(){
      // ログアウトしてタイトルに戻す
      Parse.User.logOut();
      var scene = new TitleScene();
      var transition = new cc.TransitionFade(1.0, scene);
      cc.director.runScene(transition);
    } ,this);
    logoutButton.setTitleText("ログアウト");
    this.addChild(logoutButton);
  },
});
