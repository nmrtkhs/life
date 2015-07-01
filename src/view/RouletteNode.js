var RouletteNode = cc.Node.extend({
  _className: "RouletteNode",
  sprite: null,
  division: 0,
  resultNum: 0,
  resultAngle: 0,
  spinEndCallback: null,

  ctor: function(division) {
    this._super();
    this.division = division;
    RouletteNode.prototype.init.call(this);
  },

  init: function() {
    var winSize = cc.director.getWinSize();

    var blockSize = cc.size(400, 400);

    this.sprite = new cc.Sprite("res/roulette_" + this.division + ".png");
    this.sprite.attr({
        x: winSize.width / 2,
        y: winSize.height / 2,
        scale: 1,
    });
    this.addChild(this.sprite, 0);
  },
  
  spin: function(spinEndCallback) {
    this.spinEndCallback = spinEndCallback;
    this.resultNum = _.random(1, this.division);
    var divisionAngle = 360 / this.division;
    this.resultAngle = 360 - _.random(divisionAngle * (this.resultNum - 1), divisionAngle * this.resultNum);
   
    cc.log(this.resultNum);
    cc.log(this.resultAngle);
    var actionFirst = cc.rotateTo(1, 360 * 3);
    var actionSecond = cc.rotateTo(1.5, 360 + this.resultAngle).easing(cc.easeOut(1.5));
    this.sprite.runAction(cc.sequence(actionFirst, actionSecond, cc.callFunc(function() {
      this.spinEndCallback(this.resultNum);
    }, this)));
  },
  
  skip: function() {
    this.sprite.stopAllActions();
    this.sprite.setRotation(this.resultAngle);
    this.spinEndCallback(this.resultNum);
  },
});
