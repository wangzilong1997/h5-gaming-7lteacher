var StartLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;

        //简单模式
        var easyLabel = new cc.LabelTTF("简单模式");
        easyLabel.setFontSize(size.width/12);
        easyLabel.setFontFillColor(cc.color.RED);
        easyLabel.enableStroke(cc.color.BLUE,4);

        var easyItem = new cc.MenuItemLabel(easyLabel,()=>{
            PlayerCount = 1;
            cc.director.runScene(new MainScene());
        });

        //正常模式
        var normalLabel = new cc.LabelTTF("正常模式");
        normalLabel.setFontSize(size.width/12);
        normalLabel.setFontFillColor(cc.color.RED);
        normalLabel.enableStroke(cc.color.BLUE,4);

        var normalItem = new cc.MenuItemLabel(normalLabel,()=>{
            PlayerCount = 2;
            cc.director.runScene(new MainScene());
        });

        easyItem.x = size.width*0.3;
        normalItem.x = size.width*0.7;
        easyItem.y = normalItem.y = size.height*0.2;

        var menu = new cc.Menu(easyItem,normalItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu);

        var logo = new cc.LabelTTF("跑酷游戏DEMO");
        logo.setFontSize(size.width /8);
        logo.enableStroke(cc.color.BLUE,5);
        logo.x = size.width / 2;
        logo.y = size.height * 0.8;
        this.addChild(logo);

        return true;
    }
});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});