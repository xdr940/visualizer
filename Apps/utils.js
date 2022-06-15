
import * as Cesium from '../Cesium/Cesium.js'

export function hello() {
  console.log("hello");
  dali();
}

export function dali() {
  console.log("dali");

}

export function init_show() {

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

  for(var i=0;i< fwds_all.length;i++){
    if (fwds_all[i].parent && fwds_all[i].parent.id == "FWDs") {
      fwds_all[i].show = false;
  // 

    }
  }


}
export function make_isl(conste_entities, isl_entities, Cesium) {
  console.log('make isls');
  var isls = isl_entities.getById('InterOrbitLinks')._children;
  for (let i = 0; i < isls.length; i++) {

    var refprop0 = new Cesium.ReferenceProperty(conste_entities, isls[i].polyline.positions._value[0]._targetId, ['position']);
    var refprop1 = new Cesium.ReferenceProperty(conste_entities, isls[i].polyline.positions._value[1]._targetId, ['position']);

    var refproperty_list = [refprop0, refprop1];
    isls[i].polyline.positions = new Cesium.PositionPropertyArray(refproperty_list);


  }

  isls = isl_entities.getById('IntraOrbitLinks')._children;
  for (let i = 0; i < isls.length; i++) {

    var refprop0 = new Cesium.ReferenceProperty(conste_entities, isls[i].polyline.positions._value[0]._targetId, ['position']);
    var refprop1 = new Cesium.ReferenceProperty(conste_entities, isls[i].polyline.positions._value[1]._targetId, ['position']);

    var refproperty_list = [refprop0, refprop1];
    isls[i].polyline.positions = new Cesium.PositionPropertyArray(refproperty_list);


  }

  console.log('make isls ok');


}

export function make_fwd(conste_entities, fwd_entities, Cesium) {


  for (let i = 0; i < fwds_all.length; i++) {
    var refprop0 = new Cesium.ReferenceProperty(conste_entities, fwds_all[i].polyline.positions._value[0]._targetId, ['position']);
    var refprop1 = new Cesium.ReferenceProperty(conste_entities, fwds_all[i].polyline.positions._value[1]._targetId, ['position']);

    var refproperty_list = [refprop0, refprop1];
    fwds_all[i].polyline.positions = new Cesium.PositionPropertyArray(refproperty_list);

  }

}



export function build_link(src_entities, dst_entities, id_list) {
  var temp = {
    id: 'purpleArrow',
    name: "Purple straight arrow at height",
    polyline: {
      positions: false,
      width: 10,
      arcType: Cesium.ArcType.NONE,
      material: new Cesium.PolylineArrowMaterialProperty(
        Cesium.Color.CYAN
      ),
    },
  }
  var refproperty_list = [];
  for (let i = 0; i < id_list.length; i++) {
    // 一般2个
    refproperty_list[i] = new Cesium.ReferenceProperty(src_entities, id_list[i], ['position']);

  }
  temp.polyline.positions = new Cesium.PositionPropertyArray(refproperty_list);
  dst_entities.add(temp);


}

export function buttons_def(document, entities) {

  document.getElementById("isl").onclick = function () {
    console.log("at isls");

    entities.getById("ISLs").show = !entities.getById("ISLs").show;

  }
}


export function get_lk(fwds_all) {
  // reset fwds
  //也许会出现link失效的情况,因此弄成函数比较合适
  var fwds_name = [];
  for (var i = 0; i < fwds_all.length; i++) {
    fwds_name[i] = fwds_all[i].id;
  }
  return fwds_name;
}

export function get_sat_pos(current_time, sats_all) {
  var positions = {};
  for (var i = 0; i < sats_all.length; i++) {
    positions[sats_all[i].id] = [sats_all[i].position.getValue(current_time).x, sats_all[i].position.getValue(current_time).y, sats_all[i].position.getValue(current_time).z];

  }
  return positions;


}


