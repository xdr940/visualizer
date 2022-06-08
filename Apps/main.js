
var got;
var ds;
var entities;


var responseT;
var jsonRet;

var xmlhttp;
var routeId=0;
var route_flow="../data/route_flow.json";
// var load_dir="../data/36-21/FreeSpace3621.czml"
var load_dir="../data/36-21-12-15-53-4isl/lite.czml"


if (window.XMLHttpRequest)
{
  //  IE7+, Firefox, Chrome, Opera, Safari 
  xmlhttp=new XMLHttpRequest();
}
else
{
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}



document.getElementById("route").onclick= function(){

  // xmlhttp.open("GET","https://raw.githubusercontent.com/xdr940/constellation/main/readme.md",true);
console.log(entities);

xmlhttp.onreadystatechange=function()
{


  if(xmlhttp.readyState==4 && xmlhttp.status==200)
  {

    

    responseT=xmlhttp.responseText;
    jsonRet = JSON.parse(responseT);




    var route = jsonRet[routeId];
    console.log("route id ");;
    console.log(routeId);


    var path = route["add"];
    for (var i=0;i<path.length;i++){


      if( entities.getById(path[i])){
      entities.getById(path[i]).show = true;
      }else{
        continue;
      }

    }
    var path = route["remove"];
    

    for (var j=0;j<path.length;j++){

      if (entities.getById(path[j])){
        entities.getById(path[j]).show = false;

      }
    }
    routeId+=1;

      
  }

}

  xmlhttp.open("GET",route_flow,true);

  xmlhttp.send();


}
// 测试
document.getElementById("test").onclick = function(){
  console.log("ok");
  for (var i = 0; i < entities.values.length; i++) {
    if (entities.values[i].id=="ROUTES") {
      entities.values[i].show = !entities.values[i].show ;

    }
  }
}




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

// fwd 图层开启关闭
document.getElementById("sat").onclick= function(){
  entities.getById("SATs").show = ! entities.getById("SATs").show;

}




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

    console.log("entities nodes ok");

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

if (typeof Cesium !== "undefined") {
  window.startupCalled = true;
  Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5NjZkZmYzOS0xNDIxLTRjM2ItOTBhMy0yMDBhOWJhNTMwZDAiLCJpZCI6NzAyMTUsImlhdCI6MTYzNDEwMDcwOX0.YxTKowl2Jgiv2H7nLRLC1U0iRrfIlur2FfIBaHXfIRs";



  const viewer = new Cesium.Viewer("cesiumContainer", {
    imageryProvider: new Cesium.TileMapServiceImageryProvider({
      url: Cesium.buildModuleUrl("../Cesium/Assets/Textures/NaturalEarthII"),
    }),
    baseLayerPicker: false,
    geocoder: false,
  });
  
  got = main(viewer);
}