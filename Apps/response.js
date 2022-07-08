
import {init_show, make_fwd, make_isl, make_sensor,make_gsl,make_asl} from './utils.js'





// isl图层开启关闭
document.getElementById("isl").onclick = function () {
  console.log("at isls");

  isl_entities.getById("ISLs").show = !isl_entities.getById("ISLs").show;

}


document.getElementById("intraOrbit").onclick = function () {
  console.log("at intraOrbitLinks");

  isl_entities.getById("IntraOrbitLinks").show = !isl_entities.getById("IntraOrbitLinks").show;

}
document.getElementById("interOrbit").onclick = function () {
  console.log("at interOrbitLinks");

  isl_entities.getById("InterOrbitLinks").show = !isl_entities.getById("InterOrbitLinks").show;

}
// gss图层开启关闭

document.getElementById("gss").onclick = function () {
  console.log("at gss");

  gs_entities.getById("GSs").show = !gs_entities.getById("GSs").show;

}

// gsl图层开启关闭
document.getElementById("gsl").onclick = function () {
  console.log("at gsls");

  gsl_entities.getById("GSLs").show = !gsl_entities.getById("GSLs").show;

}
// asl
document.getElementById("asl").onclick = function () {
  console.log("at asls");

  asl_entities.getById("ASLs").show = !asl_entities.getById("ASLs").show;

}
// acs
document.getElementById("acs").onclick = function () {
  console.log("at acs");

  ac_entities.getById("ACs").show = !ac_entities.getById("ACs").show;

}




// orbit图层开启关闭
document.getElementById("orbit").onclick = function () {
  console.log("at orbit");

  for (var i = 0; i < sats_all.length; i++) {
    sats_all[i].path.show = ~sats_all[i].path.show;

  }


}

// label图层开启关闭
document.getElementById("label").onclick = function () {
  for (var i = 0; i < sats_all.length; i++) {
    sats_all[i].label.show = ~sats_all[i].label.show;
  }

}
// fwd 图层开启关闭
document.getElementById("fwd").onclick = function () {
  fwd_entities.getById("FWDs").show = !fwd_entities.getById("FWDs").show;

}

// SATs 图层开启关闭
document.getElementById("sat").onclick = function () {
  conste_entities.getById("SATs").show = !conste_entities.getById("SATs").show;


}
// Sensor 图层开启关闭
document.getElementById("sensor").onclick = function () {

  for (let key in sensors) {
    sensors[key].show = ! sensors[key].show;
  }



}



// init
document.getElementById("init").onclick = function () {
  
  if (inited==0){
    init_show();
    make_isl(conste_entities,isl_entities);
    make_fwd(conste_entities,fwd_entities);
    make_sensor(sats_all);
    make_gsl(conste_entities,gs_entities);
    make_asl(conste_entities,ac_entities);
    startTime = viewer.clock.currentTime;

    inited=1;
    console.log("init ok");
    //utilization test
  }


}

// utilization
document.getElementById("utilization").onclick = function(){
  let MAX_CNT =0 ;
  for (var fwd in fwds_cnt){
    if (fwds_cnt[fwd] > MAX_CNT){
      MAX_CNT = fwds_cnt[fwd];
    }
  }

  for (var fwd in fwds_cnt){

    var src_dst = fwd.split('-');

    var tmp = isl_entities.getById('ISL-'+src_dst[1]+'-'+src_dst[2]);
    var isl = tmp?tmp:isl_entities.getById('ISL-'+src_dst[2]+'-'+src_dst[1]);

    var cnt = fwds_cnt[fwd];
    if (cnt>0){
      isl.polyline.material = new Cesium.Color(255,0,0,cnt*255/MAX_CNT);

    }
  }


}
