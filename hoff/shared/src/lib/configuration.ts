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

export interface Node {
  id: string;
  name: string;
  tooltip: string;
  img: string;
  bgColor: string;
  textColor: string;
  rotate: number;
  radius: number;
  curvature: number;
  action: Action[];
}

export interface Action {
  type: string;
  input: string;
}

export interface Rim {
  radius: string;
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
    radius: '',
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
