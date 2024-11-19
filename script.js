// Select the path
const circlePath = document.getElementById("circlePath");

// Control parameters
const radius = 100; // Base radius of the shape
const numPoints = 8; // Number of anchor points (polygon vertices)
let curviness = 0; // Start at sharp polygon
let direction = 0.005; // Speed and direction of curviness change

// Function to calculate anchor points in a circular layout
function calculatePoints() {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    points.push({ x, y });
  }
  return points;
}

// Function to update the path with curviness adjustment
function updateBlobPath() {
  const points = calculatePoints();
  let d = `M ${points[0].x},${points[0].y}`;

  // Loop through each point to create path
  for (let i = 0; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length];

    if (curviness > 0) {
      // Calculate control points for smooth curves
      const controlPoint1 = {
        x: current.x + (next.x - current.x) * curviness,
        y: current.y + (next.y - current.y) * curviness,
      };
      const controlPoint2 = {
        x: next.x - (next.x - current.x) * curviness,
        y: next.y - (next.y - current.y) * curviness,
      };

      // Use cubic Bézier curve (C command) to create smooth transition
      d += ` C ${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${next.x},${next.y}`;
    } else {
      // Use straight lines (L command) for polygonal shape
      d += ` L ${next.x},${next.y}`;
    }
  }
  d += " Z"; // Close the path

  circlePath.setAttribute("d", d);
}

// Animation loop
function animate() {
  // Adjust curviness to animate between smooth and polygonal
  curviness += direction;
  if (curviness <= 0) {
    curviness = 0;
    direction *= -1; // Reverse direction at lower bound
  } else if (curviness >= 1) {
    curviness = 1;
    direction *= -1; // Reverse direction at upper bound
  }

  // Logging for debugging
  console.log(`Curviness: ${curviness.toFixed(3)}`); // Log curviness to inspect the changes

  updateBlobPath();
  requestAnimationFrame(animate); // Continue the animation
}

// Start the animation
animate();
