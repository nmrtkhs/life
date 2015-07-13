var RankingDialogLayer = ModalLayer.extend({
  _className: "RankingDialogLayer",
  message: "",

  ctor: function() {
    this._super();
    cc.associateWithNative(this, cc.Layer);
    RankingDialogLayer.prototype.init.call(this);
  },

  init: function(message, onCallback) {
    var winSize = cc.director.getWinSize();
    this.sprite.height = winSize.height * .8;
    
    var that = this;
    LoadingIndicator.show(this);
    // ランキング処理
    var RankingScore = Parse.Object.extend("RankingScore");
    var rankingScore = new RankingScore();
    var user = Parse.User.current();
    rankingScore.save(
      {
        createdBy: user,
        income: user.get("income"),
        housing: user.get("housing"),
        education: user.get("education"),
        environment: user.get("environment"),
        health: user.get("health"),
      }
    ).then(function(object) {
      var query = new Parse.Query("RankingScore");
      query.limit(100);
      query.descending("income");
      return query.find();
    }).then(function(result){
      for (var i = 0; i < result.length; ++i) {
        if (user.get("income") >= result[i].get("income")) {
          var rank = i + 1;
          that.message += "お金:" + rank + "位\n";
          
          var query = new Parse.Query("RankingScore");
          query.limit(100);
          query.descending("income");
          return query.find();
        }
      }
    }).then(function(result){
      for (var i = 0; i < result.length; ++i) {
        if (user.get("housing") >= result[i].get("housing")) {
          var rank = i + 1;
          that.message += "住居:" + rank + "位\n";
          
          var query = new Parse.Query("RankingScore");
          query.limit(100);
          query.descending("housing");
          return query.find();
        }
      }
    }).then(function(result){
      for (var i = 0; i < result.length; ++i) {
        if (user.get("education") >= result[i].get("education")) {
          var rank = i + 1;
          that.message += "教育:" + rank + "位\n";
          
          var query = new Parse.Query("RankingScore");
          query.limit(100);
          query.descending("education");
          return query.find();
        }
      }
    }).then(function(result){
      for (var i = 0; i < result.length; ++i) {
        if (user.get("environment") >= result[i].get("environment")) {
          var rank = i + 1;
          that.message += "環境:" + rank + "位\n";
          
          var query = new Parse.Query("RankingScore");
          query.limit(100);
          query.descending("environment");
          return query.find();
        }
      }
    }).then(function(result){
      for (var i = 0; i < result.length; ++i) {
        if (user.get("health") >= result[i].get("health")) {
          var rank = i + 1;
          that.message += "健康:" + rank + "位\n";
          
          user.set("housing", 0);
          user.set("income", 0);
          user.set("education", 0);
          user.set("environment", 0);
          user.set("health", 0);
          user.set("money", 0);
          user.set("turn", 0);
          user.set("mapProgress", 0);
          user.set("areaProgress", 0);
          user.set("salaryMin", 0);
          user.set("salaryMax", 0);
          user.set("jobtypedetail", "");
          user.set("area", "");
          user.set("map", "");
          return user.save();
        }
      }
    }).then(function() {
      that.setupContents();
      LoadingIndicator.hide();
      return;
    });
  },
  setupContents: function() {
    var winSize = cc.director.getWinSize();
    this.sprite.height = winSize.height * .8;
    
    var blockSize = cc.size(400, 800);
    var label = new cc.LabelTTF(
      this.message,
      "Arial",
      24,
      blockSize,
      cc.TEXT_ALIGNMENT_CENTER,
      cc.VERTICAL_TEXT_ALIGNMENT_CENTER
    );
     label.anchorX = 0.5;
     label.anchorY = 1;
    label.x = winSize.width / 2;
    label.y = winSize.height / 2 + 600;
    label.color = cc.color(0, 0, 0);
    this.addChild(label);

    var button = new ccui.Button();
    button.setTouchEnabled(true);
    button.setScale9Enabled(true);

    button.loadTextures("res/button_red.png", "res/button_red.png");
    button.setPosition(winSize.width / 2, winSize.height / 2 - 400);
    button.setContentSize(cc.size(winSize.width / 2, 50));
    button.setTitleFontSize(48);
    button.addTouchEventListener(function(){
      
      Parse.User.logOut();
      var scene = new TitleScene();
      var transition = new cc.TransitionFade(1.0, scene);
      cc.director.runScene(transition);
    } ,this);
    button.setTitleText("OK");
    this.addChild(button);
  },
});
