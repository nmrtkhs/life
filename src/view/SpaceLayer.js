var SpaceLayer = cc.Layer.extend({
  ctor:function(posX, posY, areaId)  {
    this._super();
    var spaceColor = {
      'start': cc.color(255, 0, 0),
      'plus': cc.color(0, 255, 255),
      'minus': cc.color(0, 0, 255),
      'goal': cc.color(0,0,0)
    }

    var areaMaster = TestData.AreaMaster[areaId];
    var size = cc.winSize;
    var centerPos = cc.p(size.width / 2, size.height / 2);
    var spaceMaster = TestData.SpaceMaster[areaId];

    for (var i = 0; i < spaceMaster.length; ++i) {
      // this.sprite = new cc.Sprite(resourcePath);
      var x = size.width / 2 + posX;
      var y = 128 * i + posY + 100;

      var direction = i % 2 == 0 ? 1 : -1;
      var draw = new cc.DrawNode();
      this.addChild(draw, 0);

      if (i == spaceMaster.length - 1) {
        switch (areaMaster.junctionType) {
          case "normal":
            draw.drawSegment(cc.p(x, y), cc.p(x, y + 128), 5, cc.color(255, 0, 255, 255));
            break;

          case "toTwo":
            draw.drawSegment(cc.p(x, y), cc.p(x + 128, y + 128), 5, cc.color(255, 0, 255, 255));
            draw.drawSegment(cc.p(x, y), cc.p(x - 128, y + 128), 5, cc.color(255, 0, 255, 255));
            break;

          case "toOne":
            if (posX > 0) {
              draw.drawSegment(cc.p(x, y), cc.p(x - 128, y + 128), 5, cc.color(255, 0, 255, 255));
            } else {
              draw.drawSegment(cc.p(x, y), cc.p(x + 128, y + 128), 5, cc.color(255, 0, 255, 255));
            }
          break;
          default:
          break;
        }
      } else {
        draw.drawSegment(cc.p(x, y), cc.p(x, y + 128), 5, cc.color(255, 0, 255, 255));
      }
      // ベジェ曲線の描画ロジック
      // draw.drawQuadBezier(cc.p(x, y), cc.p(x + (direction * 64), y + 64), cc.p(x, y + 128), 3, 10, cc.color(255, 0, 255, 255));
      var color = spaceMaster[i].value >= 0 ? spaceColor['plus'] : spaceColor['minus'];
      if (spaceMaster[i].type == 'goal' ||
      spaceMaster[i].type == 'start') {
        color = spaceColor[spaceMaster[i].type];
      }
      draw.drawDot(cc.p(x, y), 40, cc.color(255, 0, 255, 255));
      draw.drawDot(cc.p(x, y), 35, color);
    }
  }
});