var InputNameLayer = ModalLayer.extend({
  _className: "InputNameLayer",
  userNameBox: null,
  passwordBox: null,

  ctor: function(onCallback) {
    this._super();
    cc.associateWithNative(this, cc.Layer);
    InputNameLayer.prototype.init.call(this, onCallback);
  },

  init: function(onCallback) {
    cc.log(this.sprite);
    var winSize = cc.director.getWinSize();
    this.sprite.height = winSize.height * .5;
    
    // ユーザ名入力ボックス
    this.userNameBox = new cc.EditBox(
      cc.size(this.getLayer().width - 50, 100),
      new cc.Scale9Sprite("res/editbox.png")
    );
    this.userNameBox.setPlaceHolder("名前を入力する");
    this.userNameBox.setPosition(winSize.width / 2, winSize.height / 2 + 150);
    this.userNameBox.setFontColor(cc.color(256, 256, 256));
    this.userNameBox.setDelegate(this);
    this.userNameBox.setFontSize(48);
    this.userNameBox.setPlaceholderFontSize(48);
    this.userNameBox.setMaxLength(10);
    this.addChild(this.userNameBox);
    
    // パスワード入力ボックス
    this.passwordBox = new cc.EditBox(
      cc.size(this.getLayer().width - 50, 100),
      new cc.Scale9Sprite("res/editbox.png")
    );
    this.passwordBox.setPlaceHolder("passowrdを入力する");
    this.passwordBox.setPosition(winSize.width / 2, winSize.height / 2);
    this.passwordBox.setFontColor(cc.color(256, 256, 256));
    this.passwordBox.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
    this.passwordBox.setDelegate(this);
    this.passwordBox.setFontSize(48);
    this.passwordBox.setPlaceholderFontSize(48);
    this.passwordBox.setMaxLength(10);
    this.addChild(this.passwordBox);

    var signInButton = new ccui.Button();
    signInButton.setTouchEnabled(true);
    signInButton.setScale9Enabled(true);
    signInButton.loadTextures("res/button_red.png", "res/button_red.png");
    signInButton.setPosition(winSize.width / 2 - 120, winSize.height / 2 - 150);
    signInButton.setContentSize(cc.size(winSize.width / 3, 50));
    signInButton.setTitleFontSize(48);
    var clicked = false;
    // ログイン有無の確認（Boolean値が返ります）
if(Parse.User.current()){
cc.log("ログイン済");
    var UserData = Parse.Object.extend("UserData");
    var userData = new UserData();
    cc.log(userData);
    userData.set("createdBy", Parse.User.current());
    userData.set("moeny", 1);
    userData.save();
    // ログイン済
}else{
cc.log("みログイン");
    // 未ログイン
}
    signInButton.addTouchEventListener(function(){
      var userName = this.userNameBox.getString();
      var password = this.passwordBox.getString();
      Parse.User.logOut();
      if (!clicked && userName !== "" && password !== "") {
        clicked = true;
//        onCallback(this.userNameBox.getString());
        Parse.User.logIn(userName, password, {
          success: function(user){
              // ログイン成功
cc.log("ログイン成功");
          },
          error: function(user, error){
              // ログイン失敗
cc.log("ログイン失敗");
          }
        });
      }
    } ,this);
    signInButton.setTitleText("ログイン");
    this.addChild(signInButton);
    
    var signUpButton = new ccui.Button();
    signUpButton.setTouchEnabled(true);
    signUpButton.setScale9Enabled(true);
    signUpButton.loadTextures("res/button_red.png", "res/button_red.png");
    signUpButton.setPosition(winSize.width / 2 + 120, winSize.height / 2 - 150);
    signUpButton.setContentSize(cc.size(winSize.width / 3, 50));
    signUpButton.setTitleFontSize(48);
    var clicked = false;
    signUpButton.addTouchEventListener(function(){
      var userName = this.userNameBox.getString();
      var password = this.passwordBox.getString();
      if (!clicked && userName !== "" && password !== "") {
        var user = new Parse.User();
        user.set("username", userName);
        user.set("password", password);
        
        clicked = true;
//        onCallback(this.userNameBox.getString());
        user.signUp(null, {
          success: function(user){
              // サインアップ成功
              cc.log("成功");
          },
          error: function(user, error){
              // サインアップ失敗
              cc.log("失敗");
          }
        });
      }
    } ,this);
    signUpButton.setTitleText("新規登録");
    this.addChild(signUpButton);
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
