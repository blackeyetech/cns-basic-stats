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

const MOVING_AVE_1 = "movingAve_1";
const MOVING_AVE_2 = "movingAve_2";
const MOVING_AVE_3 = "movingAve_3";

stats.newStat(MOVING_AVE_1);
stats.addNewVal(MOVING_AVE_1, 4);
app.info("%j", stats.getStat(MOVING_AVE_1));
stats.addNewVal(MOVING_AVE_1, 8);
app.info("%j", stats.getStat(MOVING_AVE_1));
stats.addNewVal(MOVING_AVE_1, 2);
app.info("%j", stats.getStat(MOVING_AVE_1));
stats.addNewVal(MOVING_AVE_1, 16);
app.info("%j", stats.getStat(MOVING_AVE_1));
stats.addNewVal(MOVING_AVE_1, -2);
app.info("%j", stats.getStat(MOVING_AVE_1));

stats.addNewVal(MOVING_AVE_2, 4);
app.info("%j", stats.getStat(MOVING_AVE_2));
stats.addNewVal(MOVING_AVE_2, 8);
app.info("%j", stats.getStat(MOVING_AVE_2));
stats.addNewVal(MOVING_AVE_2, 2);
app.info("%j", stats.getStat(MOVING_AVE_2));
stats.addNewVal(MOVING_AVE_2, 16);
app.info("%j", stats.getStat(MOVING_AVE_2));
stats.addNewVal(MOVING_AVE_2, -2);
app.info("%j", stats.getStat(MOVING_AVE_2));

app.info("%j", stats.getStat(MOVING_AVE_3));
