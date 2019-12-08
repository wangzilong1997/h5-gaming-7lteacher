var MainLayer = cc.Layer.extend({
    arr : [],
    pl : null,
    sLabel: null,
    sc : 0,
    ey : null,
    sd : 4,
    ctor: function () {
        this._super();

        var size = cc.winSize;

        //除非你玩到世界尽头好吧
        //玩完一百张图我服你无聊
        for (var i=0;i<1000;i++){
            var bg = new cc.Sprite(res.bg);
            bg.x = size.width /2;
            bg.y = size.height /2 + i*(bg.getBoundingBox().height);
            this.addChild(bg);
            this.arr[i] = bg;
        }
        
        //我的飞机部分
        var p = new cc.Sprite(res.p1);
        p.x = size.width /2;
        p.y = size.height /7;
        this.addChild(p);
        this.pl = p;
        
        //控制按钮部分
        var l = new cc.MenuItemFont("左移",function () {
            if (p.x > 100){
                p.x -= 30;
            }
        },this);

        var r = new cc.MenuItemFont("右移",function () {
            if (p.x < size.width - 100){
                p.x += 30;
            }
        },this);
        l.setFontSize(100);
        l.setColor(cc.color.YELLOW);
        r.setFontSize(100);
        r.setColor(cc.color.GREEN);

        var menu = new cc.Menu(l,r);
        menu.y = size.height / 11;
        menu.alignItemsHorizontallyWithPadding(200);
        this.addChild(menu);

        //添加随机敌人
        var ey = new cc.Sprite(res.p2);
        ey.setRotation(180);
        ey.x = size / 2;
        ey.y = size.height;;
        this.addChild(ey);
        this.ey = ey;

        //分数标签
        let slabel = new cc.LabelTTF("0米","",size.width/10);
        slabel.x = size.width /2;
        slabel.y = size.height * 0.9;
        slabel.setColor(cc.color.BLUE);
        this.addChild(slabel,1);
        this.sLabel = slabel;

        //帧动画重绘
        this.schedule(this.bgCallBack,0.001);
        this.schedule(this.enemyCallback,0.001);

        return true;
    },
    //地图重绘
    bgCallBack:function () {
        for (var i in this.arr){

           /* if(this.arr[i].y < -721.28){
                console.log(this.arr[i].y)
                //背景
                this.arr[i].y += 2 * 721.28;
            }*/
            this.arr[i].y -= 2;
            this.sc += 1;
            this.sLabel.setString(this.sc/1000+"m")

        }
    },
    enemyCallback:function () {
        if (this.ey.y < 0){
            this.ey.y = cc.winSize.height;
            this.ey.x = cc.winSize.width * cc.random0To1();
            this.sd += 0.1;
        } else {
            this.ey.y -= this.sd;

            //碰撞检测部分
            if(cc.rectContainsPoint(this.pl.getBoundingBox(),
                this.ey.getPosition())){

                let  ls = cc.sys.localStorage;
                //保存当前分数
                ls.setItem("currentScore",this.sc);
                if(this.sc > ls.getItem("bestScore")){
                    ls.setItem("bestScore",this.sc);
                }
                cc.director.runScene(new OverScene())
            }
        }
    }

});

MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        let layer = new MainLayer();
        this.addChild(layer);
    }
})