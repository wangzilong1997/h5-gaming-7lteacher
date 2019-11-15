var StartLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;

        var slabel = new cc.LabelTTF("开始");

        slabel.setFontSize(size.width / 8 );
        slabel.setFontFillColor(cc.color.ORANGE);
        slabel.enableStroke(cc.color.YELLOW, 5);

        var startItem = new cc.MenuItemLabel(slabel,function () {
            cc.director.runScene(new MainScene());

        },this);

        var menu = new cc.Menu(startItem)
        menu.y = size.height / 3;
        this.addChild(menu);
        
        var title = new cc.LabelTTF("飞机游戏demo");
        title.setFontSize(size.width / 8);
        title.setFontFillColor(cc.color.BLUE);
        title.enableStroke(cc.color.YELLOW);

        title.x = size.width /2;
        title.y = size.height / 1.6;
        this.addChild(title)
        return true

    }
})

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
})