
import * as Cesium from '../Cesium/Cesium.js'

export function hello() {
    console.log("hello");
}



export function build_link(src_entities,dst_entities,id_list){
        var temp={
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
      var refproperty_list=[];
      for(let i=0;i<id_list.length;i++){
        refproperty_list[i] = new Cesium.ReferenceProperty(src_entities, id_list[i], ['position']);

      }
      temp.polyline.positions = new Cesium.PositionPropertyArray(refproperty_list);
      dst_entities.add(temp);
    

}

export function buttons_def(document,entities){

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

export function get_sat_pos(current_time,sats_all) {
    var positions={};
    for (var i = 0; i < sats_all.length; i++) {
      positions[sats_all[i].id] = [sats_all[i].position.getValue(current_time).x, sats_all[i].position.getValue(current_time).y, sats_all[i].position.getValue(current_time).z];
  
    }
    return positions;
  
  
  }