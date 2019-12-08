var MainLayer = cc.Layer.extend({
   runner :[],
   block:[],
   scoreLabel:null,
   score:0,
   ctor:function () {
       this._super();

       this.addChild(new cc.LayerColor(cc.color.WHITE));
       this.addSprites();
       this.addBlocks();
       this.addMenuBtn();
       this.addScore();
       this.schedule(this.collidDetect,0.01)
       return true;
   },
    addSprites:function () {
        var animation = new cc.Animation();
        for(var i=1;i<7;i++){
            var frameName = "res/Animation3/pao_"+ i + ".png";
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(1/15);
        animation.getRestoreOriginalFrame(true);
        var animateAction = cc.animate(animation);

        var runActions = [];
        runActions[0] = animateAction.repeatForever();
        runActions[1] = runActions[0].clone();

        //创建动画
        for(var i=0;i<PlayerCount;i++){
            this.runner[i] = new cc.Sprite("res/Animation3/pao_"+1+".png");
            this.runner[i].x = cc.winSize.width*0.2;
            this.runner[i].y = cc.winSize.height*(0.3*i+0.3);
            this.runner[i].runAction(runActions[i]);
            this.addChild(this.runner[i]);
        }
    },
    addBlocks:function () {
        for(var i=0;i<PlayerCount;i++){
            this.block[i] = new cc.Sprite("res/HelloWorld.png");
            this.block[i].x = cc.winSize.width*0.8;
            this.block[i].y = cc.winSize.height*(0.3*i+0.3);
            this.block[i].scale = 0.2;
            this.addChild(this.block[i]);
        }

    },
    addMenuBtn:function () {
        var that = this;
        //控制按钮
        //解决一直点人物就一直飞起来问题
        var leftItem = new cc.MenuItemFont("P1_Jump", function () {
            var jump1 = cc.jumpBy(1.0,0,0,150,1);
            //加标签控制只能跳一次
            jump1.setTag(1);
            if(this.runner[0].getActionByTag(1)){
                return;
            }
            that.runner[0].runAction(jump1);
        }, this);
        var rightItem = new cc.MenuItemFont("P2_Jump", function () {
            var jump2 = cc.jumpBy(1.0,0,0,150,1);
            jump2.setTag(2);
            if(this.runner[1].getActionByTag(2)){
                return;
            }
            that.runner[1].runAction(jump2);
        }, this);
        leftItem.setFontSize(60);
        leftItem.setColor(cc.color.YELLOW);
        rightItem.setFontSize(60);
        rightItem.setColor(cc.color.YELLOW);


        var menu = PlayerCount==1?new cc.Menu(leftItem):new cc.Menu(leftItem, rightItem);
        menu.y = cc.winSize.height / 10;
        menu.alignItemsHorizontallyWithPadding(50);
        this.addChild(menu);
    },
    addScore:function () {
        //分数显示标签
        var scoreLabel = new cc.LabelTTF("0米","",cc.winSize.width/10);
        scoreLabel.x = cc.winSize.width/2;
        scoreLabel.y = cc.winSize.height -100;
        scoreLabel.setColor(cc.color.BLUE);
        this.addChild(scoreLabel,1);
        this.scoreLabel = scoreLabel;
    },
    collidDetect:function () {
       //碰撞检测方法部分
        this.score += 1;
        this.scoreLabel.setString(this.score+"米");
        for(var i=0;i<PlayerCount;i++){
           //cocos图标移动部分
            this.block[i].x = this.block[i].x<0 ? cc.winSize.width*(1+Math.random()):
                        this.block[i].x -= (5+this.score * 0.01);
            if (cc.rectContainsPoint(this.block[i].getBoundingBox(),this.runner[i].getPosition())) {
                console.log("碰撞检测");
                var localStorage = cc.sys.localStorage;
                localStorage.setItem("currentScore",this.score)
                if (this.score > localStorage.getItem("bestScore")){
                    localStorage.setItem("bestScore",this.score);
                }
                cc.director.runScene(new FinishScene());
            }
        }
    }
});

var MainScene = cc.Scene.extend({
   onEnter:function () {
       this._super();
       var layer = new MainLayer();
       this.addChild(layer);
   }
});






