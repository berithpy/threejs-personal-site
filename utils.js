import * as THREE from "three";

export function getRandomRotation() {
    return { x: THREE.MathUtils.randFloatSpread(150), y: THREE.MathUtils.randFloatSpread(150), z: THREE.MathUtils.randFloatSpread(150) }
}