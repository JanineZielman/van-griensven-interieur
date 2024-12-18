// Initial points data with animatable values
let value1_0 = 97.63;
let value1_1 = 136.38;
let value1_2 = 45.95;

let value2_0 = 121.7;
let value2_1 = 92.21;
let value2_2 = 89.09;

let value3_0 = 72.28;
let value3_1 = 122.32;
let value3_2 = 48.6;

// Ranges for the values
const ranges = {
  polygon1: {
    value1_0: [40, 98],
    value1_1: [135, 160],
    value1_2: [30, 50]
  },
  polygon2: {
    value2_0: [100, 145],
    value2_1: [92.21, 92.21],
    value2_2: [60, 90]
  },
  polygon3: {
    value3_0: [30, 80],
    value3_1: [100, 125],
    value3_2: [40, 50]
  }
};

// Current and target values
let targets = {
  polygon1: { value1_0, value1_1, value1_2 },
  polygon2: { value2_0, value2_1, value2_2 },
  polygon3: { value3_0, value3_1, value3_2 }
};

// Duration of the transition in milliseconds
const duration = 3000; // 3 seconds
let startTime = null;

// Function to update polygons
function updatePolygons() {
  const polygon1 = document.getElementById("polygon1");
  const polygon2 = document.getElementById("polygon2");
  const polygon3 = document.getElementById("polygon3");

  const points1 = `0 29.67 0 156.25 20.54 181.83 97.96 181.83 ${value1_0} ${value1_1} ${value1_2} 114.5 0 29.67`;
  const points2 = `161.59 128.98 163.43 182.54 101.76 182.54 102.67 133.69 48.81 111.52 37.6 ${value2_2} ${value2_0} ${value2_1} 161.59 128.98`;
  const points3 = `16.42 3.75 2.02 24.62 28.88 ${value3_0} ${value3_1} ${value3_2} 133.53 4.37 16.42 3.75`;

  polygon1.setAttribute("points", points1);
  polygon2.setAttribute("points", points2);
  polygon3.setAttribute("points", points3);
}

// Function to generate a random target within a range
function getRandomTarget(range) {
  return Math.random() * (range[1] - range[0]) + range[0];
}

// Animation loop
function animatePolygons(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;

  // Calculate the interpolation factor (0 to 1)
  const factor = Math.min(elapsed / duration, 1);

  // Interpolate values for polygon1
  value1_0 += (targets.polygon1.value1_0 - value1_0) * factor;
  value1_1 += (targets.polygon1.value1_1 - value1_1) * factor;
  value1_2 += (targets.polygon1.value1_2 - value1_2) * factor;

  // Interpolate values for polygon2
  value2_0 += (targets.polygon2.value2_0 - value2_0) * factor;
  value2_1 += (targets.polygon2.value2_1 - value2_1) * factor;
  value2_2 += (targets.polygon2.value2_2 - value2_2) * factor;

  // Interpolate values for polygon3
  value3_0 += (targets.polygon3.value3_0 - value3_0) * factor;
  value3_1 += (targets.polygon3.value3_1 - value3_1) * factor;
  value3_2 += (targets.polygon3.value3_2 - value3_2) * factor;

  // Update the polygon points
  updatePolygons();

  if (factor < 1) {
    // Continue the animation
    requestAnimationFrame(animatePolygons);
  } else {
    // Reset for the next transition
    startTime = null;

    // Generate new targets
    targets.polygon1.value1_0 = getRandomTarget(ranges.polygon1.value1_0);
    targets.polygon1.value1_1 = getRandomTarget(ranges.polygon1.value1_1);
    targets.polygon1.value1_2 = getRandomTarget(ranges.polygon1.value1_2);

    targets.polygon2.value2_0 = getRandomTarget(ranges.polygon2.value2_0);
    targets.polygon2.value2_1 = getRandomTarget(ranges.polygon2.value2_1);
    targets.polygon2.value2_2 = getRandomTarget(ranges.polygon2.value2_2);

    targets.polygon3.value3_0 = getRandomTarget(ranges.polygon3.value3_0);
    targets.polygon3.value3_1 = getRandomTarget(ranges.polygon3.value3_1);
    targets.polygon3.value3_2 = getRandomTarget(ranges.polygon3.value3_2);

    // Start the next animation
    requestAnimationFrame(animatePolygons);
  }
}

// Start the animation
window.onload = () => {
  // Generate initial targets
  targets.polygon1.value1_0 = getRandomTarget(ranges.polygon1.value1_0);
  targets.polygon1.value1_1 = getRandomTarget(ranges.polygon1.value1_1);
  targets.polygon1.value1_2 = getRandomTarget(ranges.polygon1.value1_2);

  targets.polygon2.value2_0 = getRandomTarget(ranges.polygon2.value2_0);
  targets.polygon2.value2_1 = getRandomTarget(ranges.polygon2.value2_1);
  targets.polygon2.value2_2 = getRandomTarget(ranges.polygon2.value2_2);

  targets.polygon3.value3_0 = getRandomTarget(ranges.polygon3.value3_0);
  targets.polygon3.value3_1 = getRandomTarget(ranges.polygon3.value3_1);
  targets.polygon3.value3_2 = getRandomTarget(ranges.polygon3.value3_2);

  requestAnimationFrame(animatePolygons);
};

var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
navigator.userAgent &&
navigator.userAgent.indexOf('CriOS') == -1 &&
navigator.userAgent.indexOf('FxiOS') == -1;

if (isSafari == true ) {
document.getElementById('body').classList.add('safari');
}