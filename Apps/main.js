import { hello,dali ,make_isl,sensoradd,get_gsls} from './utils.js'//????
// var got;
// var ds;
// var entities;



var base = "../data/20-20-0-15-53-4isl/";

var conste_path = base+"lite_const.czml";

var isl_path = base+"lite_isl.czml";

var fwd_path = base + "lite_fwd.czml";

var gs_path =  base+ "lite_gss.czml";

var gsl_path =  base + "lite_gsl.czml";


var ac_path = base+ "lite_acs.czml";

var asl_path =  base + "lite_asl.czml";





function dataLoad(viewer) {




  // acs load
  var ac_promise = Cesium.CzmlDataSource.load(ac_path);
  viewer.dataSources.add(ac_promise).then(function (ds) {

    ac_entities = ds.entities;

    // memory init
 
    console.log("aerocraft load ok");

  });




  // cities load
  var gs_promise = Cesium.CzmlDataSource.load(gs_path);
  viewer.dataSources.add(gs_promise).then(function (ds) {

    gs_entities = ds.entities;

    // memory init
 
    console.log("gs load ok");

  });






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
    isls_all =isl_entities.getById("IntraOrbitLinks")._children.concat(isl_entities.getById("InterOrbitLinks")._children);
  
    console.log("isl load ok");

   

  });

  //fwd
  var fwd_promise = Cesium.CzmlDataSource.load(fwd_path);
  viewer.dataSources.add(fwd_promise).then(function (ds) {

    fwd_entities = ds.entities;
    fwds_all = fwd_entities.getById("FWDs")._children;

  
    console.log("fwd load ok");

   

  });
//gsl
  var gsl_promise = Cesium.CzmlDataSource.load(gsl_path);
  viewer.dataSources.add(gsl_promise).then(function (ds) {

    gsl_entities = ds.entities;
    gsl_all = gsl_entities.getById("GSLs")._children;

  
    console.log("gsl load ok");

   

  });


  //gsl
  var asl_promise = Cesium.CzmlDataSource.load(asl_path);
  viewer.dataSources.add(asl_promise).then(function (ds) {

    asl_entities = ds.entities;

  
    console.log("asl load ok");

   

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