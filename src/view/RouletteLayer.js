var RouletteLayer = cc.LayerColor.extend({
  _className: "RouletteLayer",
  rouletteNode: null,
  stateMachine: null,
  resultNum: 0,
  isSkip: false,
  onCallback: null,

  ctor: function(onCallback) {
    this._super(cc.color(0, 0, 0, 255 * .75));
    this.onCallback = onCallback;
    RouletteLayer.prototype.init.call(this);
  },
  
  update: function(dt) {
    this.stateMachine.exec();
  },

  init: function() {
    var winSize = cc.director.getWinSize();

    var blockSize = cc.size(400, 400);

    this.rouletteNode = new RouletteNode(6);
    this.addChild(this.rouletteNode, 0);
    
    var listener = cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      onTouchBegan: function(touch, event) {
          return true;
      },
      onTouchEnded: function(touch, event) {
        eventQueue.enqueue("touch");
      }.bind(this),
    }, this);
    
    eventQueue.clear();
    this.stateMachine = new StateMachine(this);
    this.stateMachine.spawn(this.stateWaitStart);
    this.scheduleUpdate();
  },
  
  stateWaitStart: function() {
    while (event = eventQueue.dequeue()) {
      if (event == "touch") {
        cc.log("touch");
        this.stateMachine.switchTo(this.stateStartRoulette);
      }
    }
  },
  
  stateStartRoulette: function() {
    eventQueue.clear();
    this.rouletteNode.spin(function(resultNum) {
      cc.log(this.resultNum);
      this.resultNum = resultNum;
    }.bind(this));
    this.stateMachine.switchTo(this.stateWaitRoulette);
  },
  
  stateWaitRoulette: function() {
    if (!this.isSkip) {
      while (event = eventQueue.dequeue()) {
        if (event == "touch") {
          this.isSkip = true;
          this.rouletteNode.skip();
        }
      }
    }
    if (this.resultNum > 0) {
      eventQueue.clear();
      this.stateMachine.switchTo(this.stateWaitResultTouch);
    }
  },
  
  stateWaitResultTouch: function() {
    while (event = eventQueue.dequeue()) {
      if (event == "touch") {
        this.onCallback(this.resultNum);
        this.removeFromParent();
      }
    }
  },
});
