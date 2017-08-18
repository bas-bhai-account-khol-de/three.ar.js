/*
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let tempPos = new THREE.Vector3();
let tempPlaneDir = new THREE.Vector3();

class ARReticle extends THREE.Mesh {
  constructor(vrDisplay, innerRadius = 0.025, outerRadius = 0.030, color = 0xff0077, easing = 0.25) {
    const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 36, 64);
    const material = new THREE.MeshBasicMaterial({ color });
    super(geometry, material);

    this.easing = easing;
    this.vrDisplay = vrDisplay;
    this._planeDir = new THREE.Vector3();
  }

  update(x = 0.5, y = 0.5) {
    if (!this.vrDisplay || !this.vrDisplay.hitTest) {
      return;
    }

    const hit = this.vrDisplay.hitTest(x, y);
    if (hit) {
      const { point, plane } = hit;
      tempPos.fromArray(point);
      this.position.lerp(tempPos, this.easing);

      tempPlaneDir.fromArray(plane);
      this._planeDir.lerp(tempPlaneDir, this.easing);

      tempPos.addVectors(this._planeDir, this.position);
      this.lookAt(tempPos);
    }
  }
}

THREE.ARReticle = ARReticle;
export default ARReticle;