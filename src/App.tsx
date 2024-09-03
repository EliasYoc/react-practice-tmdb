import "./App.css";
import { Outlet, ScrollRestoration } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { mediaQueries } from "./utils/helper";
import { ViewFullHeight } from "./globalStyledComponents";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App(): JSX.Element {
  const matchMdScreen = useMediaQuery(mediaQueries.md);
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {!matchMdScreen && <AppHeader />}
        <ViewFullHeight id="scroll-app-view">
          <Outlet />
        </ViewFullHeight>
        {matchMdScreen && <AppHeader />}
        <ScrollRestoration />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
