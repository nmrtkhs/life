var BgLayer = cc.Layer.extend({
  sprite:null,
  currentAreaProgress:0,
  nextProgress: 0,
  ctor:function (posY, areaIds) {
    this._super();

    var size = cc.winSize;
    this.sprite = new cc.Sprite(res.BgGreen_png);
    this.sprite.attr({
        x: size.width / 2,
        y: size.height / 2 + posY + 100
    });
    this.sprite.setScale(size.height / this.sprite.getContentSize().height);
    this.addChild(this.sprite);

    _.each(areaIds, function(areaId, areaKey) {
      _areaId = areaId;
      var posX = 0;
      if (areaIds.length >= 2) {
        posX = areaKey == 0 ? -128 : 128;
      }
      var spaceLayer = new SpaceLayer(posX, posY, areaId);
      this.addChild(spaceLayer);
    }.bind(this));

    return true;
  },
});