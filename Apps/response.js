

// isl图层开启关闭
document.getElementById("isl").onclick = function () {
    console.log("at isls");
  
    entities.getById("ISLs").show = !entities.getById("ISLs").show;
  
  }
  
  
  document.getElementById("intraOrbit").onclick = function () {
    console.log("at intraOrbitLinks");
  
    entities.getById("IntraOrbitLinks").show = !entities.getById("IntraOrbitLinks").show;
  
  }
  document.getElementById("interOrbit").onclick = function () {
    console.log("at interOrbitLinks");
  
    entities.getById("InterOrbitLinks").show = !entities.getById("InterOrbitLinks").show;
  
  }
  
  
  
  // orbit图层开启关闭
  document.getElementById("orbit").onclick = function () {
    console.log("at orbit");
  
    for (var i=0;i<sats_all.length;i++){
      sats_all[i].path.show =~sats_all[i].path.show;
  
    }
  
  
  }
  
  // label图层开启关闭
  document.getElementById("label").onclick = function () {
    for (var i = 0; i < sats_all.length; i++) {
       sats_all[i].label.show =~sats_all[i].label.show;
    }
  
  }
  // fwd 图层开启关闭
  document.getElementById("fwd").onclick = function () {
    entities.getById("FWDs").show = !entities.getById("FWDs").show;
  
  }
  
  // SATs 图层开启关闭
  document.getElementById("sat").onclick = function () {
    entities.getById("SATs").show = !entities.getById("SATs").show;
  
  }
  // TEST
  document.getElementById("test").onclick = function () {
    ws.send("i need fwds");
  }
