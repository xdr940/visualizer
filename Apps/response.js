
import {init_show, make_fwd, make_isl} from './utils.js'





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
// TEST
document.getElementById("init").onclick = function () {
  init_show();
  make_isl(conste_entities,isl_entities,Cesium);
  make_fwd(conste_entities,fwd_entities,Cesium);

}
