  // Sensor
  viewer.entities.add({
    name: "Dome",
    id:"har",
    position: Cesium.Cartesian3.fromDegrees(125.0, 44.0,10),
    ellipsoid: {
      radii: new Cesium.Cartesian3(1200000.0, 1200000.0, 1200000.0),
      maximumCone: 1.046,
      material: Cesium.Color.BLUE.withAlpha(0.3),
      outline: true,
    },
  });

  viewer.entities.add({
    name: "Dome2",
    id:"penn",
    position: Cesium.Cartesian3.fromDegrees(-77, 41.0,10),
    ellipsoid: {
      radii: new Cesium.Cartesian3(1200000.0, 1200000.0, 1200000.0),
      maximumCone: 1.046,
      material: Cesium.Color.RED.withAlpha(0.3),
      outline: true,
    },
  });


  var purpleArrow = viewer.entities.add({
    id: 'purpleArrow',
    name: "Purple straight arrow at height",
    polyline: {
      positions: Cesium.Cartesian3.fromDegrees(-77, 41.0,10),
      width: 10,
      arcType: Cesium.ArcType.NONE,
      material: new Cesium.PolylineArrowMaterialProperty(
        Cesium.Color.CYAN
      ),
    },
  });


  czml = [
    {
      id: "document",
      name: "box",
      version: "1.0",
    },
    {
      id: "shape1",
      name: "Blue box",
      position: {
        cartographicDegrees: [-114.0, 40.0, 300000.0],
      },
      box: {
        dimensions: {
          cartesian: [400000.0, 300000.0, 500000.0],
        },
        material: {
          solidColor: {
            color: {
              rgba: [0, 0, 255, 255],
            },
          },
        },
      },
    },
    {
      id: "shape2",
      name: "Red box with black outline",
      position: {
        cartographicDegrees: [-107.0, 40.0, 300000.0],
      },
      box: {
        dimensions: {
          cartesian: [400000.0, 300000.0, 500000.0],
        },
        material: {
          solidColor: {
            color: {
              rgba: [255, 0, 0, 128],
            },
          },
        },
        outline: true,
        outlineColor: {
          rgba: [0, 0, 0, 255],
        },
      },
    },
    {
      id: "shape3",
      name: "Yellow box outline",
      position: {
        cartographicDegrees: [-100.0, 40.0, 300000.0],
      },
      box: {
        dimensions: {
          cartesian: [400000.0, 300000.0, 500000.0],
        },
        fill: false,
        outline: true,
        outlineColor: {
          rgba: [255, 255, 0, 255],
        },
      },
    },
    {
        id: "purpleLine",
        name: "Purple arrow at height",
        polyline: {
          positions: {
            references: [
                "01101#position",
                "00605#position"
            ]
          },
          material: {
            polylineArrow: {
              color: {
                rgba: [148, 0, 211, 255],
              },
            },
          },
          arcType: "NONE",
          width: 10,
        },
      }
  ];


  const dataSourcePromise = Cesium.CzmlDataSource.load(czml);
  viewer.dataSources.add(dataSourcePromise).then(function (ds2){

    entities2 = ds2.entities;
  });
