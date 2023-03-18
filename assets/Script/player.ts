const {ccclass, property} = cc._decorator;
const Input = {};
const State = {
    stand:1,
    attack:2,
}
//declare const firebase: any;

@ccclass
export default class player extends cc.Component {

    @property()
    playerSpeed: number = 300;

    @property()
    jumpSpeed: number = null;

    @property()
    score: number = 0;

    @property()
    life: number = 5;



    @property(cc.Node)
    time:cc.Node = null;

    @property({type:cc.AudioClip})
    jump: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    die_effect: cc.AudioClip = null;

    fallDown: boolean = false;

    anima:string = 'idle';

    face_at:number = 1;

    died:number = null;

    win:number = null;

    second_life:number = null;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.systemEvent.on('keydown',this.onKeydown, this);
        cc.systemEvent.on('keyup',this.onKeyup, this);
    }

    onDestroy(){
        cc.systemEvent.off('keydown',this.onKeydown, this);
        cc.systemEvent.off('keyup',this.onKeyup, this);
    }

    onKeydown(e){
        Input[e.keyCode] = 1;
    }

    onKeyup(e){
        Input[e.keyCode] = 0;
    }

    setAnima(anima_change){
        if(this.anima == anima_change)return;

        this.anima = anima_change;
        this.node.getComponent(cc.Animation).play(this.anima);
    }

    start () {
        this.died = 0;
        this.score = 0;
        this.win = 0;
        this.second_life = 1;
        this.update_life(0);
    }

    playerJump(velocity: number)
    {
        if(!this.fallDown)
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, velocity);
    }

    update (dt){
        if(!this.died && !this.win){
            var direction = cc.v2(0,0);
            var lv = this.node.getComponent(cc.RigidBody).linearVelocity;
            let anima_change;
            if(Input[cc.macro.KEY.a] || Input[cc.macro.KEY.left]){
                direction.x = -1;
                this.face_at = -1;
                anima_change = 'run';
            }else if(Input[cc.macro.KEY.d] || Input[cc.macro.KEY.right]){
                direction.x = 1;
                this.face_at = 1;
                anima_change = 'run';
            }else{
                direction.x = 0;
                anima_change = 'idle';
            }

            if(Input[cc.macro.KEY.space] && lv.y == 0){
                lv.y = this.jumpSpeed;
                this.playEffect_jump();
            }

            lv.x = direction.x * this.playerSpeed;


            //a console.log(lv.x);
            this.node.getComponent(cc.RigidBody).linearVelocity = lv;
            this.node.scaleX = (this.face_at >= 0) ? 1*this.second_life : -1*this.second_life;
            this.node.scaleY = this.second_life;

            if(lv.y != 0){
                anima_change = 'jump'
            }

            if(this.anima){
                this.setAnima(anima_change);
            }
            
            if(this.time.getComponent('timer').time == 0){
                this.die();
            }

            
        }
    }

    die(){
        
        let anima_change = 'die'
        this.died = 1;
        this.setAnima(anima_change);
        console.log("the life is " + this.life);
        this.update_life(1);
        cc.audioEngine.playMusic(this.die_effect,false);
       
        
    }

    wining(){
        this.win = 1;
        let action1 = cc.moveBy(1,0,50);
        let action2 = cc.moveBy(1,0,-50);
        this.node.runAction(cc.sequence(action1,action2));
        var lv = this.node.getComponent(cc.RigidBody).linearVelocity;
        lv.x = 0;
        lv.y = 0;
        this.node.getComponent(cc.RigidBody).linearVelocity = lv;
    }

    load(e){
        let scene = cc.director.getScene();
        if(scene.name == 'stage1')cc.director.loadScene("stage1_loading");
        else if(scene.name == 'stage2')cc.director.loadScene("stage2_loading");
        
    }

    big(){
        
    }

    playEffect_jump(){
        // ===================== TODO =====================
        // 1. Play sound effect. The audio clip to play is 
        //    this.correctSound
        cc.audioEngine.playEffect(this.jump,false);
        // ================================================
    }

    load1(e){
        console.log("real do");
        this.scheduleOnce(this.load,2.5);
    }

    load2(e){
        this.scheduleOnce(this.load3,2.5);
    }

    load3(e){
        cc.director.loadScene("gameover");
    }

    update_life(temp:number){
        var id = firebase.auth().currentUser.uid;
        var life;
        if(temp == 1){
            firebase.database().ref('/'+firebase.auth().currentUser.uid).once('value',e=>{
                life = e.val().life-1;
                //life -= 1;
            }).then(()=>{
                if(life == 0){
                    firebase.database().ref(id).update({
                        life:5,
                    }).then(()=>{
                        this.load2();
                    })
                }else{
                    firebase.database().ref(id).update({
                        life:life,
                    }).then(()=>{
                        //this.scheduleOnce(cc.director.loadScene("stage1_loading"),2.5);
                        this.load1();
                    })
                }
            })
        }else{
            firebase.database().ref('/'+firebase.auth().currentUser.uid).once('value',e=>{
                life = e.val().life;
            }).then(()=>{
                this.life = life;
            })
        }
    }

    


    add_time(time:number){
        this.time.getComponent('timer').time += time;
    }
}
