
var TitleLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;

        var startLabel = new cc.LabelTTF("Tap Start", "Arial", 38);
        startLabel.x = size.width / 2;
        startLabel.y = size.height / 2 - 200;

        // 後でblinkじゃなく通常のactionで実装する
        startLabel.runAction(cc.blink(30, 30));
        this.addChild(startLabel, 5);

        // add "startWorld" splash screen"
        this.sprite = new cc.Sprite(res.Title_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1,
            // rotation: 180
        });
        this.addChild(this.sprite, 0);

        return true;
    }
});

// xhr使わないならいらないかも
function streamXHREventsToLabel (xhr) {
    // Simple events
    ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {
        xhr["on" + eventname] = function () {
            // label.string += "\nEvent : " + eventname
        }
    });

    // Special event
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
            var httpStatus = xhr.statusText;
            var response = xhr.responseText.substring(0, 100) + "...";
            cc.log(xhr.responseText);
        }
    }
}

var TitleScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new TitleLayer();
        this.addChild(layer);

        var listener = cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          onTouchBegan: function(touch, event) {
              return true;
          },
          onTouchEnded: function(touch, event) {
            // 何度もおせないように一度押したらアクションを無効化する
            cc.eventManager.removeListener(listener);
            var modal = new InputNameLayer(function(name) {
              this.removeChild(layer);
              TestData.UserData.name = name;
              modal.removeFromParent();
              var delay = cc.delayTime(0.5);
              var startGame = cc.callFunc(function() {
                var scene = new GameScene();
                var transition = new cc.TransitionSlideInL(0.5, scene, true);
                cc.director.runScene(transition);
              }, this);
              this.runAction(cc.sequence(delay, startGame));
            }.bind(this));
            this.addChild(modal);
          }.bind(this),
        }, this);
        // cc.loader.loadJs("lib/parse-1.4.2.min.js", function(err){
        //     if(err) return console.log("load failed");
        //     //success
        //     Parse.localStorage = cc.sys.localStorage
        //     Parse.initialize("mSG7zu4TcARzR3oyRADDXA2ShP6l7Kw5XigzNjUt", "Fqu944VkhOEZaUsM80Me97rcpKvNuD4kfUCTHsRB");
        //
        //     var TestObject = Parse.Object.extend("TestObject");
        //     var testObject = new TestObject();
        //     testObject.save({foo: "bar"}).then(function(object) {
        //         cc.log("yay! it worked");
        //     });
        //
        //     Parse.Cloud.run('hello', {spc: "001"}, {
        //       success: function(result) {
        //         cc.log(result);
        //       },
        //       error: function(error) {
        //       }
        //   });
        // });
    }
});
