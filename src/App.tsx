import "./App.css";
import { Outlet, ScrollRestoration } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { mediaQueries } from "./utils/helper";
import { ViewFullHeight } from "./globalStyledComponents";
import { RecoilRoot } from "recoil";

function App(): JSX.Element {
  const matchMdScreen = useMediaQuery(mediaQueries.md);
  return (
    <RecoilRoot>
      {!matchMdScreen && <AppHeader />}
      <ViewFullHeight id="scroll-app-view">
        <Outlet />
      </ViewFullHeight>
      {matchMdScreen && <AppHeader />}
      <ScrollRestoration />
    </RecoilRoot>
  );
}

export default App;
