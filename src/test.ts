import CNShell from "cn-shell";
import { CNBasicStats } from "./main";

class App extends CNShell {
  constructor(name: string) {
    super(name);
  }

  async stop(): Promise<void> {}

  async healthCheck(): Promise<boolean> {
    return true;
  }

  async start(): Promise<boolean> {
    return true;
  }
}

let app = new App("App");
let stats = new CNBasicStats("STATS");

const MOVING_AVE = "movingAve";

stats.newStat(MOVING_AVE);
stats.addNewVal(MOVING_AVE, 4);
app.info("%j", stats.getStat(MOVING_AVE));
stats.addNewVal(MOVING_AVE, 8);
app.info("%j", stats.getStat(MOVING_AVE));
stats.addNewVal(MOVING_AVE, 2);
app.info("%j", stats.getStat(MOVING_AVE));
stats.addNewVal(MOVING_AVE, 16);
app.info("%j", stats.getStat(MOVING_AVE));
stats.addNewVal(MOVING_AVE, -2);
app.info("%j", stats.getStat(MOVING_AVE));
