const {ccclass, property} = cc._decorator;

@ccclass
export default class score extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        var id = firebase.auth().currentUser.uid;
        var life;
        firebase.database().ref('/'+firebase.auth().currentUser.uid).once('value',e=>{
            life = e.val().score;
        }).then(()=>{
            this.load2(life);
            //console.log(life);
            //alert(life);
        })
        //this.node.getComponent(cc.Label).string = "5";
        //this.scheduleOnce(this.load,3)
    }

    update (dt) {
        //this.getComponent(cc.Label).string = this.player.getComponent('player').life;
    }

    count(){
        
    }

    load2(e){
        this.getComponent(cc.Label).string = e;
    }
}