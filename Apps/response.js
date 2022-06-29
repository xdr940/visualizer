
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


// gsl图层开启关闭
document.getElementById("gsl").onclick = function () {
  console.log("at gsls");

  gsl_entities.getById("GSLs").show = !gsl_entities.getById("GSLs").show;

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

    inited=1;
  }


}
