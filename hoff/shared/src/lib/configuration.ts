// TODO: this file should be named omniwheel.types.ts not configurations.ts

export interface OmniwheelConfig {
  hub: Hub;
  rim: Rim;
  axle: Axle;
  nodes: Node[];
}

export interface Axle {
  rotate: number;
}

export interface Hub {
  img: string;
  bgColor: string;
  textColor: string;
}

// TODO: make this "wheelNode", the name is confusing against Node from HTML Element root
export interface Node {
  id: string;
  name: string;
  tooltip: string;
  /** In this format: background-image: url("file:///C:/Users/../../Background2.png"); */
  img: string;
  bgColor: string;
  textColor: string;
  rotate: number;
  height: number;
  width: number;
  text: string[];
  curvature: number;
  action: Action[];
}

export interface Action {
  type: string;
  input: string;
}

export interface Rim {
  diameter: string;
  visible: boolean;
  width: number;
  color: string;
}

export class Omniwheel implements OmniwheelConfig {
  hub: Hub = {
    img: '',
    bgColor: '',
    textColor: '',
  };
  rim: Rim = {
    diameter: '',
    visible: false,
    width: 0,
    color: '',
  };
  axle: Axle = {
    rotate: 0,
  };
  nodes: Node[] = [];

  constructor(config: Partial<OmniwheelConfig> = {}) {
    Object.assign(this, config);
  }
}
