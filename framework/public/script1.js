console.log("script 1 activated");

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

renderer = new THREE.WebGLRenderer({ alpha: true }, { antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);

const geometry = new THREE.BoxGeometry(3, 3, 3);
const textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = "Anonymous";

const material = new THREE.MeshBasicMaterial({
  map: textureLoader.load("/artcv.jpg")
});

let cube = new THREE.Mesh(geometry, material, 100, 100, 100);
scene.add(cube);
camera.position.z = 10;
document.body.appendChild(renderer.domElement);
function animate() {
  requestAnimationFrame(this.animate);
  cube.rotation.x += 0.001;
  cube.rotation.y += 0.001;
  renderer.render(scene, camera);
}

animate();
