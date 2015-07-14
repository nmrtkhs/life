var InputNameLayer = ModalLayer.extend({
  _className: "InputNameLayer",
  userNameBox: null,
  passwordBox: null,
  isDialog: false,

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
    signInButton.addTouchEventListener(function(){
      var userName = this.userNameBox.getString();
      var password = this.passwordBox.getString();
      if (!this.isDialog && userName !== "" && password !== "") {
        LoadingIndicator.show(this);
        var that = this;
        Parse.User.logIn(userName, password, {
          success: function(user){
            LoadingIndicator.hide();
            onCallback(that.userNameBox.getString());
          },
          error: function(user, error){
            LoadingIndicator.hide();
            that.showErrorDialog(error);
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
    signUpButton.addTouchEventListener(function(){
      var userName = this.userNameBox.getString();
      var password = this.passwordBox.getString();
      if (!this.isDialog && userName !== "" && password !== "") {
        var user = new Parse.User();
        user.set("username", userName);
        user.set("password", password);
        
        LoadingIndicator.show(this);
        var that = this;
        user.signUp(null, {
          success: function(user){
            user.set("housing", 5);
            user.set("income", 5);
            user.set("education", 5);
            user.set("environment", 5);
            user.set("health", 5);
            user.set("turn", 0);
            user.set("mapProgress", 0);
            user.set("areaProgress", 0);
            user.set("salaryMin", 0);
            user.set("salaryMax", 0);
            user.set("jobtypedetail", "");
            user.set("area", "");
            user.set("map", "");
            user.save();
            onCallback(that.userNameBox.getString());
          },
          error: function(user, error){
            LoadingIndicator.hide();
            that.showErrorDialog(error);
          }
        });
      }
    } ,this);
    signUpButton.setTitleText("新規登録");
    this.addChild(signUpButton);
  },
  
  showErrorDialog: function(error) {
    this.isDialog = true;
    this.userNameBox.setVisible(false);
    this.passwordBox.setVisible(false);
    var message = ErrorMessage.Parse[error.code];
    if (message === 'undefined') {
      message = error.message;
    }
    var dialogLayer = new DialogLayer(message, function(){
        this.isDialog = false;
        this.userNameBox.setVisible(true);
        this.passwordBox.setVisible(true);
    }.bind(this));
    this.addChild(dialogLayer);
  },
});
