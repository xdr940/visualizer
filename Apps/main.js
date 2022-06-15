import { hello,dali ,make_isl,init_show} from './utils.js'//????
// var got;
// var ds;
// var entities;


var load_dir = "../data/12-12-0-15-53-4isl/lite.czml"

var conste_path = "../data/12-12-0-15-53-4isl/lite_const.czml";

var isl_path = "../data/12-12-0-15-53-4isl/lite_isl.czml";

var fwd_path = "../data/12-12-0-15-53-4isl/lite_fwd.czml";








function dataLoad(viewer) {

  // 







  //constellation load
  var conste_promise = Cesium.CzmlDataSource.load(conste_path);
  viewer.dataSources.add(conste_promise).then(function (ds) {

    conste_entities = ds.entities;

    // memory init
    sats_all = conste_entities.getById("SATs")._children;
 
    console.log("conste load ok");

  });



  //isl load
  var isl_promise = Cesium.CzmlDataSource.load(isl_path);
  viewer.dataSources.add(isl_promise).then(function (ds) {

    isl_entities = ds.entities;

  
    console.log("isl load ok");

   

  });

  //fwd
  var fwd_promise = Cesium.CzmlDataSource.load(fwd_path);
  viewer.dataSources.add(fwd_promise).then(function (ds) {

    fwd_entities = ds.entities;
    fwds_all = fwd_entities.getById("FWDs")._children;

  
    console.log("fwd load ok");

   

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

  dataLoad(viewer);

  window.onload = function () {
    // make_isl(conste_entities,isl_entities,Cesium);
    // init_show();
  }

}