
var got;
var ds;
var entities;

var viewer;
var responseT;
var jsonRet;
var positions={};

var routeId=0;
// var load_dir="../data/36-21/FreeSpace3621.czml"
var load_dir="../data/12-12-6-15-53-4isl/lite.czml"
var ws = new WebSocket("ws://192.168.3.2:5678");
var sats_all;
var fwds_all;
var txt_fromBackend;
var current;







// isl图层开启关闭
document.getElementById("isl").onclick = function(){
  console.log("at isls");

  entities.getById("ISLs").show = ! entities.getById("ISLs").show;

}
document.getElementById("intraOrbit").onclick = function(){
  console.log("at intraOrbitLinks");

  entities.getById("IntraOrbitLinks").show = ! entities.getById("IntraOrbitLinks").show;

}
document.getElementById("interOrbit").onclick = function(){
  console.log("at interOrbitLinks");

  entities.getById("InterOrbitLinks").show = ! entities.getById("InterOrbitLinks").show;

}


// orbit图层开启关闭
document.getElementById("orbit").onclick = function(){
  console.log("at orbit");
    for (var i = 0; i < entities.values.length; i++) {
      if (entities.values[i].id.length == 5) {
        entities.values[i].path.show = ~(entities.values[i].path.show);
  
      }
    }

}

// label图层开启关闭
document.getElementById("label").onclick= function(){
  for (var i = 0; i < entities.values.length; i++) {
    if (entities.values[i].id.length == 5) {
      if (entities.values[i].label.show == true) {
        entities.values[i].label.show = false;
      } else {
        entities.values[i].label.show = true;

      }

    }
  }

}
// fwd 图层开启关闭
document.getElementById("fwd").onclick= function(){
  entities.getById("FWDs").show = ! entities.getById("FWDs").show;

}

// SATs 图层开启关闭
document.getElementById("sat").onclick= function(){
  entities.getById("SATs").show = ! entities.getById("SATs").show;

}
// TEST
document.getElementById("test").onclick = function(){
  ws.send("i need fwds");
}
document.getElementById("hello").onclick = function(){
  ws.send("hello");


}



// 后端交互

//1.打开的时候
ws.onopen = function()
{
// Web Socket 已连接上，使用 send() 方法发送数据
   ws.send("admin:123456");
   alert("sending msg(admin:123456) for authentication...");
};

var msg_from_backend ;
var msg_to_backend;
// 2.接收到服务器消息后的回调函数
ws.onmessage = function (evt) 
{ 
    txt_fromBackend = evt.data;
   if (txt_fromBackend.indexOf("sorry") == -1) {
    msg_from_backend = JSON.parse(txt_fromBackend);
    if( msg_from_backend.cls == "fwds" ){
      console.log("recv fwds from backends");

      fwds=msg_from_backend['fwds'];

      var fwds_add = fwds["add"];
      for (var i=0;i<fwds_add.length;i++){
        if( entities.getById(fwds_add[i])){
        entities.getById(fwds_add[i]).show = true;
        }else{
          continue;
        }
  
      }
      var fwds_mv = fwds["remove"];
      for (var i=0;i<fwds_mv.length;i++){
       if( entities.getById(fwds_mv[i])){
       entities.getById(fwds_mv[i]).show = false;
       }else{
         continue;
       }

    }

    }
    else if (msg_from_backend.cls =="GET static status"){
      msg_to_backend = {};
      console.log("recv GET static status...");
      msg_to_backend['cls'] = "static status";
      msg_to_backend["fwds_all"] = static_status();
      msg_to_backend = JSON.stringify(msg_to_backend);
      ws.send(msg_to_backend);

    }

    else if (msg_from_backend.cls == "GET current status"){
      msg_to_backend = {};
      console.log("recv GET current status...");
      msg_to_backend['cls'] = "current status";
      msg_to_backend["positions"] = current_status(viewer);
      
      msg_to_backend = JSON.stringify(msg_to_backend);
      ws.send(msg_to_backend);
    
    }
    else{
      console.log("wrong msg from backend");
    }

    // if msg =  "i need status for caculating sat1 to sat2"

   }
   
};

// 3.连接关闭后的回调函数
ws.onclose = function()
{ 
   // 关闭 websocket
   alert("The connection to backend stops..."); 
};



function main(viewer) {

  // 
  console.log("load dir:"+load_dir);

// FPS
  viewer.scene.debugShowFramesPerSecond = true;
  


  var data_source = Cesium.CzmlDataSource.load(load_dir);

  viewer.dataSources.add(data_source).then(function (ds) {

    entities = ds.entities;
    // 先关闭所有FWD
    for (var i = 0; i < entities.values.length; i++) {
      if (entities.values[i].parent && entities.values[i].parent.id =="FWDs") {
        entities.values[i].show = false ;
  
      }
    }
    // memory init
    sats_all = entities.getById("SATs")._children;
    fwds_all  = entities.getById("FWDs")._children;

    current_status(viewer);
    static_status(viewer);
    console.log("entities load ok");


  });


  // // Sensor
  // viewer.entities.add({
  //   name: "Dome",
  //   id:"har",
  //   position: Cesium.Cartesian3.fromDegrees(125.0, 44.0,10),
  //   ellipsoid: {
  //     radii: new Cesium.Cartesian3(1200000.0, 1200000.0, 1200000.0),
  //     maximumCone: 1.046,
  //     material: Cesium.Color.BLUE.withAlpha(0.3),
  //     outline: true,
  //   },
  // });

  // viewer.entities.add({
  //   name: "Dome2",
  //   id:"penn",
  //   position: Cesium.Cartesian3.fromDegrees(-77, 41.0,10),
  //   ellipsoid: {
  //     radii: new Cesium.Cartesian3(1200000.0, 1200000.0, 1200000.0),
  //     maximumCone: 1.046,
  //     material: Cesium.Color.RED.withAlpha(0.3),
  //     outline: true,
  //   },
  // });


  


  return viewer;

}



function static_status(){
// reset fwds
var fwds_name =[];
for (var i =0;i<fwds_all.length;i++){
  fwds_name[i] = fwds_all[i].id;
}
  return fwds_name;
}

function current_status(viewer){
  current = viewer.clock.currentTime;
  
  for(var i =0;i<sats_all.length;i++){
    positions[sats_all[i].id] =[ sats_all[i].position.getValue(current).x,sats_all[i].position.getValue(current).y,sats_all[i].position.getValue(current).z];

  }
  return positions;


}

if (typeof Cesium !== "undefined") {
  window.startupCalled = true;
  Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5NjZkZmYzOS0xNDIxLTRjM2ItOTBhMy0yMDBhOWJhNTMwZDAiLCJpZCI6NzAyMTUsImlhdCI6MTYzNDEwMDcwOX0.YxTKowl2Jgiv2H7nLRLC1U0iRrfIlur2FfIBaHXfIRs";



  viewer = new Cesium.Viewer("cesiumContainer", {
    imageryProvider: new Cesium.TileMapServiceImageryProvider({
      url: Cesium.buildModuleUrl("../Cesium/Assets/Textures/NaturalEarthII"),
    }),
    baseLayerPicker: false,
    geocoder: false,
  });
  
  got = main(viewer);

}