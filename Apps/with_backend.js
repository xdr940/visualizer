var msg_from_backend;
var msg_to_backend;

var txt_fromBackend;
var ws = new WebSocket("ws://192.168.3.2:5678");//backend ip:port


import {get_lk,get_sat_pos} from './utils.js'


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
      if (msg_from_backend.cls == "fwds") {
        console.log("recv fwds from backends");
  
  
        var fwds_add = msg_from_backend['add'];
        for (var i = 0; i < fwds_add.length; i++) {
          if (entities.getById(fwds_add[i])) {
            fwds_cnt[fwds_add[i]]+=1;
            entities.getById(fwds_add[i]).show = true;
          } else {
            continue;
          }
  
        }
        var fwds_mv = msg_from_backend["remove"];
        for (var i = 0; i < fwds_mv.length; i++) {
          if (entities.getById(fwds_mv[i])) {
            entities.getById(fwds_mv[i]).show = false;
            fwds_cnt[fwds_mv[i]]-=1;
  
          } else {
            continue;
          }
  
        }
          return;
      }
      // recv cmd/GET
      else if (msg_from_backend.cls == "cmd") {
  
        if (msg_from_backend.value == "get lk"){

          console.log("recv get links...");
          msg_to_backend['cls'] = "links";
          msg_to_backend["value"] = get_lk(fwds_all);
        }
        else if (msg_from_backend.value == "get pos"){
          console.log("recv get positions...");
            var currentTime = viewer.clock.currentTime;

          msg_to_backend["value"] = get_sat_pos(currentTime,sats_all);
          msg_to_backend['cls'] = "positions";
  
        }
        // msg_to_backend = JSON.stringify(msg_to_backend);
        // ws.send(msg_to_backend);
        else if (msg_from_backend.value == "clear fwds"){
            for (k in fwds_cnt){
                if (fwds_cnt[k]!=0){
                  entities.getById(k).show=false;
                  fwds_cnt[k] = 0;
                }
            }
            msg_to_backend['cls']="ack";
        }
      }
  
       else {
        console.log("wrong msg from backend");
  
        msg_to_backend['cls'] = "nack";
    
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