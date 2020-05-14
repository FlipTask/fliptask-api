import {createBrowserHistory} from "history";
import appConfig from "./appConfig";

const history = createBrowserHistory({
    basename: appConfig.appBaseName
});

export default history;