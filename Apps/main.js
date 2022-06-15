import { hello } from './utils.js'//????
// var got;
// var ds;
// var entities;


var load_dir = "../data/12-12-0-15-53-4isl/lite.czml"

var const_path = "../data/12-12-0-15-53-4isl/lite_const.czml";

var isl_path = "../data/12-12-0-15-53-4isl/lite_isl.czml";

var fwd_path = "../data/12-12-0-15-53-4isl/lite_fwd.czml";







function init_show() {

  // FPS
  viewer.scene.debugShowFramesPerSecond = true;

  //sat path false
  for (var i = 0; i < sats_all.length; i++) {
    sats_all[i].path.show = false;
  }
  //sat labels false
  for (var i = 0; i < sats_all.length; i++) {
    sats_all[i].label.show = false;
  }
  // fwds false
  for (var i = 0; i < entities.values.length; i++) {
    if (entities.values[i].parent && entities.values[i].parent.id == "FWDs") {
      entities.values[i].show = false;

    }
  }

}

function source_load(viewer) {

  // 
  console.log("load dir:" + load_dir);




  var data_source = Cesium.CzmlDataSource.load(load_dir);

  viewer.dataSources.add(data_source).then(function (ds) {

    entities = ds.entities;

    // memory init
    sats_all = entities.getById("SATs")._children;
    fwds_all = entities.getById("FWDs")._children;
    for (var i; i < fwds_all.length; i++) {
      fwds_cnt[fwds_all[i]] = 0;
    }
    console.log("entities load ok");
    // show init
    init_show();

  });







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

  source_load(viewer);

}