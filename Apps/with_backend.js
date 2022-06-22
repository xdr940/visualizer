var msg_from_backend;
var msg_to_backend;

var txt_fromBackend;
var ws = new WebSocket("ws://127.0.0.1:5678");//backend ip:port


import { get_lk, get_sat_pos,get_gsls,get_sats } from './utils.js'


// 后端交互
document.getElementById("hello").onclick = function () {
  ws.send("hello");


}

//1.打开的时候
ws.onopen = function () {
  // Web Socket 已连接上，使用 send() 方法发送数据
  alert("Connection established.");
};


// 2.接收到服务器消息后的回调函数
ws.onmessage = function (evt) {
  txt_fromBackend = evt.data;
  if (txt_fromBackend.indexOf("sorry") == -1) {


    msg_from_backend = JSON.parse(txt_fromBackend);
    msg_to_backend = {};


    // recv data/fwds
    if (msg_from_backend.do == "post") {
      if (msg_from_backend.arg == "fwds"){
        console.log("recv fwds from backends");


        var fwds_add = msg_from_backend['add'];
        for (var i = 0; i < fwds_add.length; i++) {
          if (fwd_entities.getById(fwds_add[i])) {
            fwds_cnt[fwds_add[i]] += 1;
            fwd_entities.getById(fwds_add[i]).show = true;
          } else {
            continue;
          }
  
        }
        var fwds_mv = msg_from_backend["remove"];
        for (var i = 0; i < fwds_mv.length; i++) {
          if (fwd_entities.getById(fwds_mv[i])) {
            fwd_entities.getById(fwds_mv[i]).show = false;
            fwds_cnt[fwds_mv[i]] -= 1;
  
          } else {
            continue;
          }
  
        }
        msg_to_backend['do'] = "ack";
      }
    

    }
    // recv cmd/GET
    else if (msg_from_backend.do == "get") {

      if (msg_from_backend.arg == "links") {

        console.log("recv get links...");
        msg_to_backend['do'] = "transmit";
        msg_to_backend['arg'] = "links";
        msg_to_backend["data"] = get_lk(fwds_all);
      }
      else if (msg_from_backend.arg == "positions") {
        console.log("recv get positions...");
        var currentTime = viewer.clock.currentTime;

        msg_to_backend["data"] = get_sat_pos(currentTime, sats_all);
        msg_to_backend['do'] = "transmit";
        msg_to_backend['arg'] = "positions";


      }
      else if (msg_from_backend.arg == "sats"){
        console.log("recv get sats...");

        msg_to_backend["data"] = get_sats(sats_all);
        msg_to_backend['do'] = "transmit";
        msg_to_backend['arg'] = "sats";
        console.log('sats ok');
      }
      else if (msg_from_backend.arg == "gsls"){
        console.log("recv get gsls...");
        var currentTime = viewer.clock.currentTime;

        msg_to_backend["data"] = get_gsls(currentTime);
        msg_to_backend['do'] = "transmit";
        msg_to_backend['arg'] = "gsls";
        console.log('gsls ok');
      }
      // msg_to_backend = JSON.stringify(msg_to_backend);
      // ws.send(msg_to_backend);

    }
    else if (msg_from_backend.do == "clear") {
      if (msg_from_backend.arg == "fwds") {
        for (k in fwds_cnt) {
          if (fwds_cnt[k] != 0) {
            fwd_entities.getById(k).show = false;
            fwds_cnt[k] = 0;
          }
        }
        msg_to_backend['do'] = "ack";
      }

    }
    else if (msg_from_backend.do == "set"){
      if (msg_from_backend.arg == "start"){
        viewer.clock.shouldAnimate=true;
      }
      else if  (msg_from_backend.arg == "stop"){
        viewer.clock.shouldAnimate=false;
      }
      else if (msg_from_backend.arg == "time"){
        // 
        // var start = Cesium.JulianDate.fromIso8601("2000-01-01T00:00:00Z");
        // var time = start.secondsOfDay +=20;
        // viewer.clock.currentTime = time;
      }
      msg_to_backend['do'] = "ack";
    }
    else {
      console.log("wrong msg from backend");
      console.log(msg_from_backend);
      msg_to_backend['do'] = "nack";

    }

    msg_to_backend = JSON.stringify(msg_to_backend);
    ws.send(msg_to_backend)

    // if msg =  "i need status for caculating sat1 to sat2"

  }

};

// 3.连接关闭后的回调函数
ws.onclose = function () {
  // 关闭 websocket
  alert("Connection closed.");
};