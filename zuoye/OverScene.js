var OverLayer = cc.Layer.extend({
    cs:0,
    bs :0,
    ctor: function () {
        this._super();

        let size = cc.winSize;

        var rLabel = new cc.LabelTTF("重   玩");
        rLabel.setFontSize(size.width / 8);
        rLabel.setFontFillColor(cc.color.GREEN);
        rLabel.enableStroke(cc.color.RED,7);
        var rItem = new cc.MenuItemLabel(rLabel,function () {
            cc.director.runScene(new MainScene());
        },this);

        var menu = new cc.Menu(rItem)
        menu.y = size.height /5;
        this.addChild(menu);

        //Game over
        var geor = new cc.LabelTTF("Game Over");
        geor.setFontSize(size.width / 8);
        geor.enableStroke(cc.color.RED,5);
        geor.x = size.width /2 ;
        geor.y = size.height *0.8;
        this.addChild(geor);

        //获取当前数据
        let ls = cc.sys.localStorage;
        var cs = ls.getItem("currentScore")/1000;
        var bs = ls.getItem("bestScore")/1000;

        //展示成绩
        var cs = new cc.LabelTTF("本次成绩："+cs+"米");
        cs.x = size.width / 2;
        cs.y = size.height * 0.55;
        cs.setFontSize(size.width/12);
        this.addChild(cs);
        this.currentScore = cs;
        //展示最好成绩
        var bs = new cc.LabelTTF("历史最佳："+bs+"米");
        bs.x = size.width / 2;
        bs.y = size.height * 0.45;
        bs.setFontSize(size.width/12);
        this.addChild(bs);
        this.bestScore = bs;

        return true;

    }
});


var OverScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new OverLayer();
        this.addChild(layer);
    }
});