// const topographicalSurfacePlot = document.querySelector('#topographical-plot');
const topographicalSurfacePlotWithContours = document.querySelector('#topographical-plot-with-contours');
const multipleTopographicalPlots = document.querySelector('#multiple-topographical-plots');

console.log(Math.cos(convertDegreestoRadians(30)));

// Test run with algorithm
// let orbitalOffset = 0;
// let orbitalPosition = 0;
let xAxisAngularRotation = 0;
let zAxisAngularRotation = 0;

// Dedicated function to convert angle measurements from degrees to radians
function convertDegreestoRadians(angleInDegrees) {
  return Math.PI * angleInDegrees / 180;
}

// Compounded solar yield calculation
function compoundSolarYield(orbitalOffset, orbitalPosition) {
  const orbitalOffsetValue = Math.cos(convertDegreestoRadians(orbitalOffset - zAxisAngularRotation));
  const orbitalPositionValue = Math.cos(90 - convertDegreestoRadians(orbitalPosition - xAxisAngularRotation));
  return orbitalOffsetValue * orbitalPositionValue;
}

function populateSolarYieldArray() {
  const finalCosineYield = [];
  for(let i = -90; i < 91; i++) {
    const finalCosineYieldRow = [];
    for(let j = 0; j < 181; j++) {
      finalCosineYieldRow.push(compoundSolarYield(i, j));
    }
    finalCosineYield.push(finalCosineYieldRow);
  }
  return finalCosineYield;
}

// Test run of populateSolarYieldArray
// populateSolarYieldArray();

// Populate two hard deck references for production
const zPositiveHardDeck = [];
// const zNegativeHardDeck = [];
function generatePositiveHardDeck() {
  for(let i = 0; i < 181; i++) {
    const hardDeckRow = [];
    for(let j = 0; j < 181; j++) {
      hardDeckRow.push(Math.cos(convertDegreestoRadians(30)));
    }
    zPositiveHardDeck.push(hardDeckRow);
  }
  return zPositiveHardDeck;
}

// test data
const betaData = [];
for(i=0;i<24;i++) {
  const betaDataRow = [];
  for(j=0;j<24;j++) {
    betaDataRow.push(Math.random() * 250)
  }
  betaData.push(betaDataRow);
}

// Verify correct structure of betaData using the above nested for loops
// console.log(betaData);

// topographical surface plot with projected contours from the tutorial
// Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv', function(err, rows) {
  // function unpack(rows, key) {
  //   return rows.map(function(row) {
  //     return row[key];
  //   });
  // }

Plotly.d3.csv('', function(err, rows) {

// CSV unpacking function to generate a nested array structure for z-data reference
//   let z_data = [];
//   for(i=0;i<24;i++) {
//     z_data.push(unpack(rows,i));
//   }

  // Verify structure of z_data to substitute betaData
  // console.log(z_data)

  let productionYieldData = [{
    // Replace z_data with betaData and test the resulting plot
    // z: z_data,
    z: populateSolarYieldArray(),
    showscale: true,
    opacity: 1.0,
    type: 'surface',
    contours: {
      z: {
        show: true,
        usecolormap: true,
        highlightcolor: "#42f462",
        project: {
          z: true
        }
      }
    }
  }];

  let layout = {
    title: 'Percent Solar Yield With Projected Contours',
    xaxis: {
      title: 'Orbital Position',
      titlefont: {
        family: 'Arial, sans-seriff',
        size: 18,
        color: 'black'
      },
    },
    yaxis: {
      title: 'Orbital Offset',
      titlefont: {
        family: 'Arial, sans-seriff',
        size: 18,
        color: 'black'
      }
    },
    zaxis: {
      title: 'Percent Solar Yield',
      titlefont: {
        family: 'Arial, sans-seriff',
        size: 18,
        color: 'black'
      }
    },
    scene: {
      camera: {
        eye: {
          x: 1.87,
          y: 0.88,
          z: -0.64
        }
      }
    },
    autosize: false,
    width: 1000,
    height: 750,
    margin: {
      l: 65,
      r: 50,
      b: 65,
      t: 90,
    }
  };

  // Original plot to produce a single surface
  Plotly.newPlot(topographicalSurfacePlotWithContours, productionYieldData, layout)

  // Modified multiple surface plot
  // Plotly.newPlot(topographicalSurfacePlotWithContours, [productionYieldData, positiveHardDeck])
})

// multiple 3D surface plots
z1 = populateSolarYieldArray();

z2 = [];
for (let i = 0; i < z1.length; i++) {
  z2_row = [];
  for (let j = 0; j < z1[i].length; j++) {
    z2_row.push(Math.cos(convertDegreestoRadians(30)));
  }
  z2.push(z2_row);
}

z3 = [];
for (let i = 0; i < z1.length; i++) {
  z3_row = [];
  for (let j = 0; j < z1[i].length; j++) {
    z3_row.push(-Math.cos(convertDegreestoRadians(30)));
  }
  z3.push(z3_row);
}

let data_z1 = {
  z: z1, 
  type: 'surface'
};

let data_z2 = {
  z: z2,
  showscale: false,
  opacity: 0.9,
  type: 'surface'
};

let data_z3 = {
  z: z3,
  showscale: false,
  opacity: 0.9,
  type: 'surface'
};

Plotly.newPlot(multipleTopographicalPlots, [data_z1, data_z2, data_z3]);



// topographical surface plot
// Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv', function(err,rows) {
//   function unpack(rows, key) {
//     return rows.map(function(row) { return row[key]; });
//   }

//   let z_data = [];
//   for(i=0;i<24;i++) {
//     z_data.push(unpack(rows, i));
//   }

//   let data = [{
//     z: z_data,
//     type: 'surface'
//   }];

//   let layout = {
//     title: 'Mt Bruno Elevation',
//     autosize: false,
//     margin: {
//       l: 65,
//       r: 50,
//       b: 65,
//       t: 90,
//     }
//   };
//   Plotly.newPlot(topographicalSurfacePlot, data, layout);
// })

// multiple 3D surface plots
// z1 = [
//   [8.83, 8.89, 8.81, 8.87, 8.90, 8.87],
//   [8.89, 8.94, 8.85, 8.94, 8.96, 8.92],
//   [8.84, 8.90, 8.82, 8.92, 8.93, 8.91],
//   [8.79, 8.85, 8.79, 8.90, 8.94, 8.92],
//   [8.79, 8.88, 8.81, 8.90, 8.95, 8.92],
//   [8.80, 8.82, 8.78, 8.91, 8.94, 8.92],
//   [8.75, 8.78, 8.77, 8.91, 8.95, 8.92],
//   [8.80, 8.80, 8.77, 8.91, 8.95, 8.94],
//   [8.74, 8.81, 8.76, 8.93, 8.98, 8.99],
//   [8.89, 8.99, 8.92, 9.10, 9.13, 9.11],
//   [8.97, 8.97, 8.91, 9.09, 9.11, 9.12],
//   [9.04, 9.08, 9.05, 9.25, 9.28, 9.27],
//   [9.00, 9.04, 9.00, 9.27, 8.81, 9.15],
//   [8.99, 8.99, 9.18, 9.23, 9.20, 9.19],
//   [8.93, 8.97, 8.97, 9.18, 9.20, 9.18]
// ];

// z2 = [];
// for (let i = 0; i < z1.length; i++) {
//   z2_row = [];
//   for (let j = 0; j < z1[i].length; j++) {
//     z2_row.push(z1[i][j] + 1 + Math.random());
//   }
//   z2.push(z2_row);
// }

// z3 = [];
// for (let i = 0; i < z1.length; i++) {
//   z3_row = [];
//   for (let j = 0; j < z1[i].length; j++) {
//     z3_row.push(z1[i][j] - 1 - Math.random());
//   }
//   z3.push(z3_row);
// }

// let data_z1 = {
//   z: z1, 
//   type: 'surface'
// };

// let data_z2 = {
//   z: z2,
//   showscale: false,
//   opacity: 0.9,
//   type: 'surface'
// };

// let data_z3 = {
//   z: z3,
//   showscale: false,
//   opacity: 0.9,
//   type: 'surface'
// };

// Plotly.newPlot(multipleTopographicalPlots, [data_z1, data_z2, data_z3]);
