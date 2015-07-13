var LAYER_BG = 1;
var LAYER_SPACE = 2;
var LAYER_PLAYER = 3;
var LAYER_HUD = 4;

var GameScene = cc.Scene.extend({
  stateMachine: null,
  chartLayer: null,
  gameLayer: null,
  menuLayer: null,
  bgLayers: [],
  spaceLayers: [],
  playerLayer: null,
  remainingStep: 0,
  endBgProgressNum: 0,
  isSelect: false,
  isRightSelect: false,
  isMenuTransition: false,
  isRequest: false,
  currentMapProgress: 0,
  currentArea: "47_20",
  currentAreaProgress: 0,
  rouletteResult: -1,
  multiSelctDialogLyaer: null,
  user: null,
  sjtbKeys: {},
  areaDivision: {},
  shigotoNaviResult: {},
  ctor: function() {
    this._super();
    this.stateMachine = new StateMachine(this);
    this.stateMachine.spawn(this.stateAreaSelectDialog);

    this.gameLayer = new cc.Layer();
    this.addChild(this.gameLayer);
    
    this.menuLayer = new MenuLayer();
    this.addChild(this.menuLayer);
    this.menuLayer.setVisible(false);
    this.menuLayer.setPosition(640, 0);
    
    this.playerLayer = new PlayerLayer();
    this.gameLayer.addChild(this.playerLayer, LAYER_PLAYER);

    var statusLayer = new StatusLayer();
    statusLayer.updateTurn(30);
    this.gameLayer.addChild(statusLayer, LAYER_HUD);
   
    this.bglayers = [];
    cc.log("init:" + this.bgLayers.length);
    this.spaceLayers = [];
    this.user = Parse.User.current();
    this.currentAreaProgress = this.user.get('areaProgress');
    this.currentMapProgress = this.user.get('mapProgress');
    cc.log(this.currentAreaProgress);
    cc.log(this.currentMapProgress);

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
  showMenu: function() {
    this.isMenuTransition = true;
    this.gameLayer.runAction(
      cc.sequence(
        cc.moveBy(.3, cc.p(-500, 0)).easing(cc.easeIn(.3)),
        cc.callFunc(function() {this.isMenuTransition = false;}, this)
      )
    );
    this.menuLayer.setVisible(true);
    this.menuLayer.runAction(cc.moveBy(.3, cc.p(-500, 0)).easing(cc.easeIn(.3)));
  },
  hideMenu: function() {
    this.isMenuTransition = true;
    this.gameLayer.runAction(
      cc.sequence(
        cc.moveBy(.3, cc.p(500, 0)).easing(cc.easeIn(.3)),
        cc.callFunc(function() {this.isMenuTransition = false;}, this)
      )
    );
    this.menuLayer.runAction(cc.moveBy(.3, cc.p(500, 0)).easing(cc.easeIn(.3)));
  },
  stateAreaSelectDialog: function() {
    if (this.user.get('area') === "") {
      var dialogText = "地域を選択します\n";
      var areaDivisionKeys = Object.keys(TestData.AreaDivisionMaster);
      for (var i = 0; i < areaDivisionKeys.length; ++i) {
        var key = areaDivisionKeys[i];
        var areaDivision = TestData.AreaDivisionMaster[key];
//        var mapId = Object.keys(TestData.MapMaster)[_.random(1, TestData.MapMaster.length)];
//        this.mapSelectMap[i] = mapId;
        dialogText += key + ":" + areaDivision.name;
        if (i % 2 == 1) {
          dialogText += "\n";
        } else {
          dialogText += "  ";
        }
      }
      this.isSelect = false;
      this.multiSelectDialogLayer = new DialogMultiSelectLayer(dialogText, false, function(){
        this.isSelect = true;
      }.bind(this));
      this.addChild(this.multiSelectDialogLayer, LAYER_HUD);
      this.stateMachine.switchTo(this.stateWaitAreaDivisionSelectDialog);
    } else {
      this.stateMachine.switchTo(this.stateJobCategorySelect);
    }
  },
  stateWaitAreaDivisionSelectDialog: function() {
    if (!this.isSelect) {
      return;
    }
    this.isSelect = false;
    eventQueue.clear();
    this.stateMachine.switchTo(this.stateAreaDivisionSelectRoulete);
  },
  stateAreaDivisionSelectRoulete: function() {
    var rouletteLayer = new RouletteLayer(function(rouletteResult){
      this.rouletteResult = rouletteResult;
    }.bind(this), Object.keys(TestData.AreaDivisionMaster).length);
    this.addChild(rouletteLayer, LAYER_HUD);
    this.stateMachine.switchTo(this.stateAreaDivisionSelectWaitRoulette);
  },
  stateAreaDivisionSelectWaitRoulette: function() {
    if (this.rouletteResult <= 0) {
      return;
    }
    this.areaDivision = TestData.AreaDivisionMaster[this.rouletteResult];
    this.removeChild(this.multiSelectDialogLayer);
    this.prefectures = this.areaDivision.prefectures;
    var dialogText = "都道府県を選択します\n";
    
    if (this.prefectures.length == 1) {
      this.rouletteResult = 1;
      this.stateMachine.switchTo(this.stateWaitAreaSelectRoulette);
      return;
    }
    for (var i = 0; i < this.prefectures.length; ++i) {
      dialogText += i+1 + ":" + TestData.PrefecturesMaster[this.prefectures[i]].name;
      if (i % 2 == 1) {
        dialogText += "\n";
      } else {
        dialogText += "  ";
      }
    }
    this.isSelect = false;
    this.multiSelectDialogLayer = new DialogMultiSelectLayer(dialogText, false, function(){
      this.isSelect = true;
    }.bind(this));
    this.addChild(this.multiSelectDialogLayer, LAYER_HUD);
    this.stateMachine.switchTo(this.stateWaitAreaSelectDialog);
  },
  stateWaitAreaSelectDialog: function() {
    if (!this.isSelect) {
      return;
    }
    this.rouletteResult = 0;
    var rouletteLayer = new RouletteLayer(function(rouletteResult){
      this.rouletteResult = rouletteResult;
    }.bind(this), Object.keys(this.areaDivision.prefectures).length);
    this.addChild(rouletteLayer, LAYER_HUD);
    this.stateMachine.switchTo(this.stateWaitAreaSelectRoulette);
  },
  stateWaitAreaSelectRoulette: function() {
    if (this.rouletteResult <= 0) {
      return;
    }
    this.removeChild(this.multiSelectDialogLayer);
//    this.currentMap = this.prefectures[this.rouletteResult-1];
    this.currentMap = "47";//todo
    this.user.set('map', "47")//todo:
    this.user.set('area', TestData.MapMaster["47"][0].areaIds[0]);
    this.user.save();
    this.isSelect = false;
    var dialogLayer = new DialogLayer( TestData.PrefecturesMaster[this.currentMap].name + "に決定", function(){
      this.isSelect = true;
    }.bind(this));
    this.addChild(dialogLayer, LAYER_HUD);
    this.stateMachine.switchTo(this.stateWaitAreaDecide);
  },
  stateWaitAreaDecide: function() {
    if (!this.isSelect) {
      return;
    }
    this.isSelect = false;
    this.stateMachine.switchTo(this.stateJobCategorySelect);
  },
  stateJobCategorySelect: function() {
    if (this.user.get('jobtypedetail') === "")  {
      this.sjtbKeys = Object.keys(TestData.ShigotoNavi.sjtb);
      // ランダムでジョブ大枠を決定
      this.sjtbKeys = this.sjtbKeys.map(function(a){return {weight:Math.random(), value:a}})
        .sort(function(a, b){return a.weight - b.weight})
        .map(function(a){return a.value});
      this.stateMachine.switchTo(this.stateShowJobCategorySelectDialog);
    } else {
      eventQueue.clear();
      this.stateMachine.switchTo(this.stateSetBgLayer);
    }
  },
  stateShowJobCategorySelectDialog: function() {
    var dialogText = "職業カテゴリを選択します\n";
    var max = this.sjtbKeys.length > 10 ? 10 : this.sjtbKeys.length;
    for (var i = 0; i < max; ++i) {
      dialogText += i+1 + ":" + TestData.ShigotoNavi.sjtb[this.sjtbKeys[i]];
      dialogText += "\n";
    }
    this.isSelect = false;
    this.multiSelectDialogLayer = new DialogMultiSelectLayer(dialogText, true, function(){
      this.isSelect = true;
    }.bind(this));
    this.addChild(this.multiSelectDialogLayer, LAYER_HUD);
    this.stateMachine.switchTo(this.stateWaitJobCategorySelectDialog);
  },
  stateWaitJobCategorySelectDialog: function() {
    if (!this.isSelect) {
      return;
    }
    this.rouletteResult = 0;
    var max = this.sjtbKeys.length > 10 ? 10 : this.sjtbKeys.length;
    var rouletteLayer = new RouletteLayer(function(rouletteResult){
      this.rouletteResult = rouletteResult;
    }.bind(this), max);
    this.addChild(rouletteLayer, LAYER_HUD);
    this.stateMachine.switchTo(this.stateWaitJobCategorySelectRoulette);
  },
  stateWaitJobCategorySelectRoulette: function() {
    if (this.rouletteResult <= 0) {
      return;
    }
    this.removeChild(this.multiSelectDialogLayer);

    this.shigotoNaviResult = {};
    this.isRequest = true;
    LoadingIndicator.show(this);
    var areaCode = "0" + this.user.get('map');
    var that = this;
    Parse.Cloud.run('hello', {spc: areaCode, jt: this.sjtbKeys[this.rouletteResult - 1]}, {
      success: function(result) {
        that.shigotoNaviResult = JSON.parse(result).result;
        cc.log("result: " + result);
        that.isRequest = false;
      },
      error: function(error) {
        cc.log("error:" + error);
        that.isRequest = false;
      }
    });
    this.stateMachine.switchTo(this.stateWaitRequestJob);
  },
  stateWaitRequestJob: function() {
    if (this.isRequest) {
      return;
    }
    LoadingIndicator.hide();
    cc.log(this.shigotoNaviResult);
    if (this.shigotoNaviResult == null) {
      //対象職種がなかったのでもう一回
      this.isSelect = false;
      var dialogLayer = new DialogLayer("対応職種が見つかりませんでした。再度ルーレットを回します", function(){
        this.isSelect = true;
      }.bind(this));
      this.sjtbKeys.splice(this.rouletteResult - 1, 1);
      this.addChild(dialogLayer, LAYER_HUD);
      this.stateMachine.switchTo(this.stateWaitErrorDialogRequestJob);
      return;
    }
    var keys = Object.keys(this.shigotoNaviResult);
    
    var dialogText = "職業を選択します\n";
    for (var i = 0; i < keys.length; ++i) {
      dialogText += i+1 + ":" + decodeURI(this.shigotoNaviResult[keys[i]].jobtypedetail);
      dialogText += "\n";
    }
    this.isSelect = false;
    this.multiSelectDialogLayer = new DialogMultiSelectLayer(dialogText, true, function(){
      this.isSelect = true;
    }.bind(this));
    this.addChild(this.multiSelectDialogLayer, LAYER_HUD);
    this.stateMachine.switchTo(this.stateWaitJobSelectDialog);
  },
  stateWaitErrorDialogRequestJob: function() {
    if (!this.isSelect) {
      return;
    }
    this.stateMachine.switchTo(this.stateWaitJobCategorySelectDialog);
  },
  stateWaitJobSelectDialog: function() {
    if (!this.isSelect) {
      return;
    }
    if (Object.keys(this.shigotoNaviResult).length == 1) {
      this.rouletteResult = 1;
      this.stateMachine.switchTo(this.stateWaitJobSelectRoulette);
      return;
    }
    
    this.rouletteResult = 0;
    var rouletteLayer = new RouletteLayer(function(rouletteResult){
      this.rouletteResult = rouletteResult;
    }.bind(this), Object.keys(this.shigotoNaviResult).length);
    this.addChild(rouletteLayer, LAYER_HUD);
    this.stateMachine.switchTo(this.stateWaitJobSelectRoulette);
  },
  stateWaitJobSelectRoulette: function() {
    if (this.rouletteResult <= 0) {
      return;
    }
    this.removeChild(this.multiSelectDialogLayer);
    
    // ここで仕事保持しよう
    var job = this.shigotoNaviResult[this.rouletteResult - 1];
    // 年収の計算
    var salary = 0;
    this.user.set('jobtypedetail', decodeURI(job.jobtypedetail));
    if (job.salary_y_min) {
      this.user.set('salaryMin', job.salary_y_min);
			if (job.salary_y_max) {
        this.user.set('salaryMax', job.salary_y_max);
				salary = parseInt((job.salary_y_min + job.salary_y_max) / 2);
			} else {
				salary = parseInt(job.salary_y_min);
			}
		} else if (job.salary_y_max) {
      this.user.set('salaryMax', job.salary_y_max);
      salary = parseInt(job.salary_y_max);
		} else if (job.salary_m_min) {
      this.user.set('salaryMin', job.salary_y_min);
			if (job.salary_m_max) {
        this.user.set('salaryMax', job.salary_m_max);
				salary = parseInt((job.salary_m_min + job.salary_m_max) / 2 * 12);
			} else {
				salary = parseInt(job.salary_m_min * 12);
			}
		} else if (job.salary_m_max) {
				salary = parseInt(job.salary_m_max * 12);
        this.user.set('salaryMax', job.salary_m_max * 12);
		} else if (job.salary_d_min) {
      this.user.set('salaryMin', job.salary_d_min * 12);
			if (job.salary_d_max) {
        this.user.set('salaryMax', job.salary_d_max * 20 * 12);
				salary = parseInt((job.salary_d_min + job.salary_d_max) / 2 * 20 * 12);
			} else {
				salary = parseInt(job.salary_d_min * 20 * 12);
			}
		} else if (job.salary_y_max) {
        this.user.set('salaryMax', job.salary_d_max * 20 * 12);
				salary = parseInt(job.salary_d_max * 20 * 12);
		}
    
    this.user.set('jobUrlPc', job.url);
    this.user.set('jobUrlSp', job.url_sp);
    this.user.save();
    var dialogLayer = new DialogLayer(decodeURI(this.shigotoNaviResult[this.rouletteResult - 1].jobtypedetail) + "(平均年収" + Number(salary).toLocaleString() +  ")に決定", function(){
      this.isSelect = true;
    }.bind(this));
    this.addChild(dialogLayer, LAYER_HUD);
    this.stateMachine.switchTo(this.stateWaitJobDecide);
  },
  stateWaitJobDecide: function() {
    if (!this.isSelect) {
      return;
    }
    this.isSelect = false;
    
     this.stateMachine.switchTo(this.stateSetBgLayer);
  },
  stateSetBgLayer: function() {
    var mapProgress = this.user.get('mapProgress');
    var areaProgress = this.user.get('areaProgress');
    this.currentArea = this.user.get('area');
    var playerPosY = 0;
    for (var i = 0; i <= mapProgress; ++i) {
      var area = TestData.MapMaster[this.user.get('map')][i];
      if (i == mapProgress) {
        if (area.areaIds.length >= 2) {
          var playerPosX = area.areaIds[0] == this.currentArea ? 128 : -128;
          this.playerLayer.setPosition(playerPosX, 0);
        }
        playerPosY += 128 * areaProgress;
        break;
      }
      playerPosY += TestData.SpaceMaster[area.areaIds[0]].length * 128;
    }
    
    var spacePosY = -playerPosY;
    _.each(TestData.MapMaster[this.user.get('map')], function(mapMaster) {
      _.each(mapMaster.areaIds, function(areaId, areaKey) {
        var posX = 0;
        if (mapMaster.areaIds.length >= 2) {
          posX = areaKey == 0 ? -128 : 128;
        }
        var spaceLayer = new SpaceLayer(posX, spacePosY, areaId);
        this.spaceLayers.push(spaceLayer);
        this.gameLayer.addChild(spaceLayer, LAYER_SPACE);
      }.bind(this));
      spacePosY += TestData.SpaceMaster[mapMaster.areaIds[0]].length * 128;
    }.bind(this));
    var bgPos = -playerPosY;
    _.each(TestData.MapMaster[this.user.get('map')], function(mapMaster) {
      var bgLayer = new GameBgLayer(bgPos, mapMaster.areaIds);
      bgPos += TestData.SpaceMaster[mapMaster.areaIds[0]].length * 128;
      this.bgLayers.push(bgLayer);
      cc.log("nanja---" + this.bgLayers.length);
      this.gameLayer.addChild(bgLayer, LAYER_BG);
    }.bind(this));
    this.stateMachine.switchTo(this.stateWaitInput);
  },
  stateWaitInput: function() {
    while (event = eventQueue.dequeue()) {
      switch (event) {
        case 'tapRoulette':
          this.rouletteResult = this.endBgProgressNum = 0;;
          var rouletteLayer = new RouletteLayer(function(rouletteResult){
          this.rouletteResult = rouletteResult;
          }.bind(this), 6);
          this.addChild(rouletteLayer, LAYER_HUD);
          this.stateMachine.switchTo(this.stateWaitSpaceRoulette);
          break;
        case 'tapStatus':
          // todo statusChartLayerを表示する
          this.chartLayer = new ChartLayer(function() {
            this.removeChild(this.chartLayer);
            this.chartLayer = null;
          }.bind(this));
          this.addChild(this.chartLayer, LAYER_HUD);
          this.stateMachine.switchTo(this.stateWaitChartLayer);
          break;
        case 'tapMenu':
          this.showMenu();
          this.stateMachine.switchTo(this.stateWaitMenuLeftTransition);
        default:
        break;
      }
    }
  },
  stateWaitMenuLeftTransition: function() {
    if (this.isMenuTransition) {
      return;
    }
    this.stateMachine.switchTo(this.stateWaitMenuInput);
  },
  stateWaitMenuInput: function() {
    while (event = eventQueue.dequeue()) {
      switch (event) {
        case 'tapMenu':
          this.hideMenu();
          this.stateMachine.switchTo(this.stateWaitMenuRightTransition);
        default:
        break;
      }
    }
  },
  stateWaitMenuRightTransition: function() {
    if (this.isMenuTransition) {
      return;
    }
    this.stateMachine.switchTo(this.stateWaitInput);
  },
  stateWaitChartLayer: function() {
    if (this.chartLayer != null) {
      return;
    }
    eventQueue.clear();
    this.stateMachine.switchTo(this.stateWaitInput);
  },
  stateWaitSpaceRoulette: function() {
    if (this.rouletteResult <= 0) {
      return;
    }
    this.remainingStep = this.rouletteResult;
    this.stateMachine.switchTo(this.stateCheckJunction);
  },
  stateCheckJunction: function() {
    var areaMaster = TestData.AreaMaster[this.currentArea];
    if (this.currentAreaProgress >= TestData.SpaceMaster[this.currentArea].length - 1) {
      if (areaMaster.junctionType == "toTwo") {
        this.isSelect = false;
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
      var areaInfo = TestData.MapMaster[this.user.get('map')][this.currentMapProgress];
      this.currentArea = areaInfo.areaIds[this.isRightSelect ? 0 : 1];
      this.isRightSelect = false;
      this.stateMachine.switchTo(this.stateForward);
    }
  },
  stateForward: function() {
    this.remainingStep--;
    this.currentAreaProgress++;
    if (this.currentAreaProgress >= TestData.SpaceMaster[this.user.get('area')].length) {
      this.currentAreaProgress = 0;
      this.currentMapProgress++;
      var areaInfo = TestData.MapMaster[this.user.get('map')][this.currentMapProgress];
      this.currentArea = areaInfo.areaIds[0];
    }
    _.each(this.bgLayers, function(bgLayer){
      // bgLayer.forward(progress);
      var sequence = cc.sequence(
        cc.moveBy(1, cc.p(0, -128)),
        cc.callFunc(function(){
          this.endBgProgressNum++;
        }, this)
      );
      bgLayer.runAction(sequence);
    }.bind(this));
    _.each(this.spaceLayers, function(spaceLayer){
      spaceLayer.runAction(cc.moveBy(1, cc.p(0, -128)));
    });

    this.stateMachine.switchTo(this.stateForwarding);
  },
  stateForwarding: function() {
    // 全てのアニメが完了
    cc.log("endBgProgress:" + this.endBgProgressNum);
    cc.log("bglayers:" + this.bgLayers.length);
    if (this.endBgProgressNum == this.bgLayers.length) {
      this.endBgProgressNum = 0;
      if (TestData.SpaceMaster[this.currentArea][this.currentAreaProgress].type == "goal") {
        this.isSelect = false;
        var dialogLayer = new DialogLayer("おめでとう！！ゴールしました", function(){
          this.isSelect = true;
        }.bind(this));
        this.addChild(dialogLayer, LAYER_HUD);
        this.stateMachine.switchTo(this.stateShowRankingDialog);
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
    var space = TestData.SpaceMaster[this.currentArea][this.currentAreaProgress];
    var paramMessage = "";
    var param = space.value;
    switch(space.type) {
      case "money":
        paramMessage += "お金が";
        this.user.set("income", this.user.get("income") + param);
        break;
      case "hobby":
        paramMessage += "健康が";
        this.user.set("health", this.user.get("health") + param);
        break;
      case "family":
        paramMessage += "住居が";
        this.user.set("housing", this.user.get("housing") + param);
        break;
      case "live":
        paramMessage += "環境が";
        this.user.set("environment", this.user.get("environment") + param);
        break;
      case "wealth":
        paramMessage += "教育が";
        this.user.set("education", this.user.get("education") + param);
        break;
    }
    paramMessage += param + "アップしました";
    space.description += "\n" + paramMessage;
    
    var dialogLayer = new DialogLayer(space.description, function(){
      this.isSelect = true;
    }.bind(this));
    this.addChild(dialogLayer, LAYER_HUD);
    this.stateMachine.switchTo(this.stateWaitEvent);
    
    //ユーザデータ保持
    this.user.set('mapProgress', this.currentMapProgress);
    this.user.set('areaProgress', this.currentAreaProgress);
    this.user.set('area', this.currentArea);
    
    this.user.save();
  },
  stateWaitEvent: function() {
    cc.log("stateWaitEvent");
    if (this.isSelect) {
      this.isSelect = false;
      eventQueue.clear();
      this.stateMachine.switchTo(this.stateWaitInput);
    }
  },
  stateShowRankingDialog: function() {
    if (!this.isSelect) {
      return;
    }
    var dialogLayer = new RankingDialogLayer();
    this.addChild(dialogLayer, LAYER_HUD);
    this.stateMachine.switchTo(this.stateEnd);
  },
  stateEnd: function() {
  },
});
