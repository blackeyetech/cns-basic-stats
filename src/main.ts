// imports here
import CNShell from "cn-shell";

// Interfaces here
interface Stat {
  name: string;
  bucketStart: number;
  interval: number;
  cnt: number;
  max: number;
  min: number;
  ave: number;
}

// Class CNBasicStats here
class CNBasicStats extends CNShell {
  // Properties here
  private _stats: Map<string, Stat>;

  // Constructor here
  constructor(name: string) {
    super(name);

    this._stats = new Map();
  }

  // Methods here
  async start(): Promise<boolean> {
    return true;
  }

  async stop(): Promise<void> {}

  async healthCheck(): Promise<boolean> {
    return true;
  }

  newStat(name: string): Stat {
    let stat = {
      name,
      bucketStart: Date.now(),
      interval: 0,
      cnt: 0,
      ave: 0,
      max: 0,
      min: 0,
    };

    this._stats.set(name, stat);

    return stat;
  }

  getStat(name: string, reset: boolean = true): Stat {
    let stat = this._stats.get(name);

    if (stat === undefined) {
      stat = this.newStat(name);
      return stat;
    }

    stat.interval = Date.now() - stat.bucketStart;

    if (reset) {
      this.reset(name);
    }

    return stat;
  }

  getAllStatNames(): string[] {
    let all: string[] = [];

    for (let [key] of this._stats.entries()) {
      all.push(key);
    }

    return all;
  }

  newVal(name: string, value: number): void {
    let stat = this.getStat(name, false);

    if (stat.cnt === 0) {
      stat.cnt++;
      stat.ave = value;
      stat.max = value;
      stat.min = value;
      return;
    }

    if (value > stat.max) {
      stat.max = value;
    }
    if (value < stat.min) {
      stat.min = value;
    }
    stat.ave = (stat.ave * stat.cnt + value) / (stat.cnt + 1);
    stat.cnt++;
  }

  reset(name: string): void {
    let stat = {
      name,
      bucketStart: Date.now(),
      interval: 0,
      cnt: 0,
      ave: 0,
      max: 0,
      min: 0,
    };
    this._stats.set(name, stat);
  }
}

export { CNBasicStats };
