// imports here
import CNShell from "cn-shell";

// Interfaces here
interface Stat {
  cnt: number;
  max: number;
  min: number;
  ave: number;
}

// Class CnsStats here
class CnsStats extends CNShell.CNExtension {
  // Properties here
  private _stats: Map<string, Stat>;

  // Constructor here
  constructor(name: string, shell: CNShell) {
    super(name, shell);

    this._stats = new Map();
  }

  // Methods here
  start(): void {
    this.info("Started!");
  }

  async stop(): Promise<any> {
    this.info("Stopped!");
  }

  newStat(name: string) {
    this._stats.set(name, { cnt: 0, ave: 0, max: 0, min: 0 });
  }

  addNewVal(name: string, value: number): void {
    let stat = this._stats.get(name);

    if (stat === undefined) {
      this.error(`Stat (${name}) was not found!`);
      return;
    }

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

  getStat(name: string): Stat | null {
    let stat = this._stats.get(name);

    if (stat === undefined) {
      this.error(`Stat (${name}) was not found!`);
      return null;
    }

    return stat;
  }
}

export { CnsStats };
