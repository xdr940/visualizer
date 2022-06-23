
// import * as Cesium from '../Cesium/Cesium.js'

import "../Cesium/Cesium.js"
import "./CesiumSensors.js";

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


export function sensoradd(viewer,satellite){

  var sensor = new CesiumSensors.CustomSensorVolume();

  var directions = [];
  for (var i = 0; i <36; ++i) {
      var clock = Cesium.Math.toRadians(10.0 * i);// 弧度
      var cone = Cesium.Math.toRadians(50.0); //starlink sats have 40d elevation, thus, (180-2*40)/2 = 50
      directions.push(new Cesium.Spherical(clock, cone));// new Cesium.Spherical(clock, cone, magnitude); 一组曲线三维坐标
  }

  // sensor.modelMatrix = getModelMatrix();
  sensor.radius = 1000000.0;
  sensor.directions = directions;
  sensor.lateralSurfaceMaterial = Cesium.Material.fromType('Color');// 侧面材料
  sensor.lateralSurfaceMaterial.uniforms.color = new Cesium.Color(0.0, 1.0, 1.0, 0.5);
  viewer.scene.preRender.addEventListener((scene, time) => { // preRender: 获取在场景更新之后以及场景渲染之前立即引发的事件。事件的订阅者将Scene实例作为第一个参数，将当前时间作为第二个参数。
      let modelMatrix = satellite.computeModelMatrix(time); // 在指定时间计算实体转换的模型矩阵, -> Matrix4
      Cesium.Matrix4.multiply(
          modelMatrix,
          Cesium.Matrix4.fromRotationTranslation(
              Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(-180))), 
              modelMatrix
      )// multiply 计算两个矩阵的乘积;  fromRotationTranslation 从表示旋转的Matrix3和表示平移的Catresian3中计算Matrix4实例
      sensor.modelMatrix = modelMatrix
  });
  viewer.scene.primitives.add(sensor);
  sensors[satellite.id] = sensor;
}

export function make_sensor(sats_all){
  for (var i=0;i<sats_all.length;i++){
    sensoradd(viewer,sats_all[i]);
  }
}

export function make_isl(conste_entities, isl_entities) {
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
export function make_gsl(conste_entities,gs_entities){
  console.log('make gsls');
  var gsls = gsl_entities.getById("GSLs")._children;
  for (var i=0;i<gsls.length;i++){
    var refprop0 = new Cesium.ReferenceProperty(conste_entities, gsls[i].polyline.positions._value[0]._targetId, ['position']);
    var refprop1 = new Cesium.ReferenceProperty(gs_entities, gsls[i].polyline.positions._value[1]._targetId, ['position']);


    var refproperty_list = [refprop0, refprop1];
    gsls[i].polyline.positions = new Cesium.PositionPropertyArray(refproperty_list);


  }

}

export function make_fwd(conste_entities, fwd_entities) {

  fwds_cnt={};
  for (let i = 0; i < fwds_all.length; i++) {
    var refprop0 = new Cesium.ReferenceProperty(conste_entities, fwds_all[i].polyline.positions._value[0]._targetId, ['position']);
    var refprop1 = new Cesium.ReferenceProperty(conste_entities, fwds_all[i].polyline.positions._value[1]._targetId, ['position']);

    var refproperty_list = [refprop0, refprop1];
    fwds_all[i].polyline.positions = new Cesium.PositionPropertyArray(refproperty_list);
    fwds_cnt[fwds_all[i].id] = 0;
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

export function get_sats(sats_all){
  var sats_name=[];
  for (var i = 0; i < sats_all.length; i++) {
    sats_name[i] = sats_all[i].id;
  }
  return sats_name;
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
// get gsls
function isGslConnected(gsl,time){
  var intervals = gsl.polyline._show._intervals._intervals;
  for (let i =0;i<intervals.length;i++){
    if (intervals[i].data ==true && Cesium.TimeInterval.contains(intervals[i],time)){
      return true;
    }
  }
  return false;
}

export function get_gsls(time){
  var gsl_ret =[];
  var gsls = gsl_entities.getById("GSLs")._children;
  var cnt =0
  for (let i=0;i < gsls.length;i++){

    if (isGslConnected(gsls[i],time)){
      gsl_ret[cnt] = gsls[i].id;
      cnt+=1;
    }
  }
  console.log(gsl_ret);
  return gsl_ret;
}

