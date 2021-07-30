import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Camera and Render
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

// Torus
const tgeometry = new THREE.TorusGeometry(10, 0.11, 3, 100);

const tmaterial = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});

const torus = new THREE.Mesh(tgeometry, tmaterial);

const t2geometry = new THREE.TorusGeometry(7, 0.11, 3, 100);

const t2material = new THREE.MeshStandardMaterial({
  color: 0xff7777,
});

const torus2 = new THREE.Mesh(t2geometry, t2material);
scene.add(torus, torus2);

// point light
const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.set(5, 5, 5);

// aboutPointLight 
const aboutPointLight = new THREE.PointLight(0xffff44, 1, 10);

aboutPointLight.position.set(1, 1, 9);
// ambient light
const ambientLight = new THREE.AmbientLight(0xaaaaaa);

scene.add(pointLight, ambientLight, aboutPointLight);

// point light helper
const sphereSize = 1;
const lightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
const lightHelper2 = new THREE.PointLightHelper(aboutPointLight, sphereSize);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper, lightHelper2);

// const controls = new OrbitControls(camera, renderer.domElement);
// Loader
const loader = new GLTFLoader();

function loadModel(url) {
  return new Promise((resolve) => {
    loader.load(url, resolve);
  });
}

let cart1,
  cart2,
  cart3,
  cart4,
  cart5,
  cart6,
  cart7,
  cart8,
  monitor,
  office,
  gamepad,
  keyboard;

let p1 = loadModel("models/cart1.glb").then((result) => {
  cart1 = result.scene.children[0];
});
let p2 = loadModel("models/cart2.glb").then((result) => {
  cart2 = result.scene.children[0];
});
let p3 = loadModel("models/cart3.glb").then((result) => {
  cart3 = result.scene.children[0];
});
let p4 = loadModel("models/cart4.glb").then((result) => {
  cart4 = result.scene.children[0];
});
let p5 = loadModel("models/cart5.glb").then((result) => {
  cart5 = result.scene.children[0];
});
let p6 = loadModel("models/cart6.glb").then((result) => {
  cart6 = result.scene.children[0];
});
let p7 = loadModel("models/cart7.glb").then((result) => {
  cart7 = result.scene.children[0];
});
let p8 = loadModel("models/cart8.glb").then((result) => {
  cart8 = result.scene.children[0];
});
let pmonitor = loadModel("models/monitor.glb").then((result) => {
  monitor = result.scene;
});
let poffice = loadModel("models/office.glb").then((result) => {
  office = result.scene;
});
let pgamepad = loadModel("models/gamepad.glb").then((result) => {
  gamepad = result.scene.children[0];
});
let pkeyboard = loadModel("models/keyboard.glb").then((result) => {
  keyboard = result.scene.children[0];
});

// Background
const spaceTexture = new THREE.TextureLoader().load("grid.jpg");
scene.background = spaceTexture;

// Avatar
const meTexture = new THREE.TextureLoader().load("me.png");
const me = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 0.2, 0.2),
  new THREE.MeshBasicMaterial({ map: meTexture })
);
me.position.set(-0.2, 0.2, -1);
me.rotation.set(0.1, 0.1, 0);

scene.add(me);

// Moon
const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const moonNormal = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: moonNormal })
);
moon.position.z = 30;
moon.position.x = -10;

scene.add(moon);

// Stars
function addStar() {
  let size = Math.random();
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: true,
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z, r] = Array(4)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(150));

  star.position.set(x, y, z);
  star.rotation.set(r, r, r);
  // scene.add(star);
}

Array(300).fill().forEach(addStar);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  me.rotation.x -= 0.01;
  me.rotation.y -= 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  if (monitor) {
    monitor.rotation.y = (t / 893) * 2;
  }
}
document.body.onscroll = moveCamera;
moveCamera();

//Update loop
function renderLoop() {
  requestAnimationFrame(renderLoop);
  animate();
  renderer.render(scene, camera);
  // console.log(document.body.getBoundingClientRect().top);
}
function animate() {
  // this rotation can probably be some kind of function
  torus.rotation.x += 0.0014;
  torus.rotation.y += 0.001;
  torus.rotation.z += 0.0011;
  torus2.rotation.x -= 0.001;
  torus2.rotation.y -= 0.0013;
  torus2.rotation.z -= 0.0017;
}
// This is to start the page only after the models are loaded
Promise.all([
  p1,
  p2,
  p3,
  p4,
  p5,
  p6,
  p7,
  p8,
  pmonitor,
  poffice,
  pgamepad,
  pkeyboard,
]).then(() => {
  const t = document.body.getBoundingClientRect().top;
  //Office objects
  office.position.set(-0.5, -1, -1);
  office.rotation.set(0.15, -1, 0);

  //do something to the model
  cart1.position.set(0, 1, 0);
  cart2.position.set(0, 1, 0);
  cart3.position.set(0, 1, 0);
  cart4.position.set(0, 1, 0);
  cart5.position.set(0, 1, 0);
  cart6.position.set(0, 1, 0);
  cart7.position.set(0, 1, 0);
  cart8.position.set(0, 1, 0);
  //About me objects
  monitor.position.set(0.3, -0.4, 9);
  monitor.rotation.y = (t / 893) * 2;
  keyboard.position.set(0.7, 0.3, 9);
  keyboard.rotation.set(1.3, -0.2, 0);

  gamepad.position.set(0, 1, 0);
  gamepad.rotation.set(1, 0, 0);

  //add model to the scene
  scene.add(
    cart1,
    cart2,
    cart3,
    cart4,
    cart5,
    cart6,
    cart7,
    cart8,
    monitor,
    office,
    keyboard,
    gamepad
  );

  //continue the process
  renderLoop();
});
