import { useLocation, useNavigate } from "react-router-dom";
import {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  IconWrapper,
} from "./styles";
import { LuArrowLeft } from "react-icons/lu";
import { IconButton } from "@mui/material";
import { CiDark, CiLight } from "react-icons/ci";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { darkModeState } from "../../atoms/appConfigAtom";
import { makeViewTransition } from "../../utils/helper";

const AppHeader = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.remove(isDarkMode ? "light" : "dark");
    document.documentElement.classList.add(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <Header
      className="app-header"
      style={{
        viewTransitionName: "app-header",
      }}
    >
      <HeaderLeft>
        {location.pathname !== "/" && (
          <IconWrapper onClick={() => navigate(-1)}>
            <LuArrowLeft />
          </IconWrapper>
        )}
        <HeaderTitle
          onClick={() => navigate("/", { unstable_viewTransition: true })}
        >
          Movies and Series
        </HeaderTitle>
      </HeaderLeft>
      <HeaderRight>
        <IconButton
          style={{ color: "var(--text-color)" }}
          onClick={(e) => {
            document.documentElement.classList.add(
              "rootCircleDarkModeViewTransition"
            );
            const $movieSerieDetailsPoster = document.querySelector(
              ".detailsOfShowPoster"
            ) as HTMLImageElement | null;
            const $appHeader = document.querySelector(
              ".app-header"
            ) as HTMLDivElement;
            const $avgProgressbar = document.querySelector(
              ".avg-progressbar"
            ) as HTMLDivElement;
            const $infoDate = document.querySelector(
              ".movie-series-info-release-date"
            ) as HTMLSpanElement;

            // creo que no se puede remover props de styled components TODO fix
            $appHeader.style.removeProperty("view-transition-name");
            $avgProgressbar?.style.removeProperty("view-transition-name");
            $infoDate?.style.removeProperty("view-transition-name");
            $movieSerieDetailsPoster?.style.setProperty(
              "--posterViewTransitionName",
              ""
            );

            const lastClick = e;
            const transition = makeViewTransition(() => {
              setIsDarkMode(!isDarkMode);
            });

            if (transition) {
              // Get the click position, or fallback to the middle of the screen
              const x = lastClick?.clientX ?? innerWidth / 2;
              const y = lastClick?.clientY ?? innerHeight / 2;
              // Get the distance to the furthest corner
              const endRadius = Math.hypot(
                Math.max(x, innerWidth - x),
                Math.max(y, innerHeight - y)
              );

              // Wait for the pseudo-elements to be created:
              transition.ready.then(() => {
                // Animate the root's new view
                document.documentElement.animate(
                  {
                    clipPath: [
                      `circle(0 at ${x}px ${y}px)`,
                      `circle(${endRadius}px at ${x}px ${y}px)`,
                    ],
                  },
                  {
                    duration: 300,
                    easing: "ease-in",
                    // Specify which pseudo-element to animate
                    pseudoElement: "::view-transition-new(root)",
                  }
                );
              });
              transition.finished.then(() => {
                document.documentElement.classList.remove(
                  "rootCircleDarkModeViewTransition"
                );

                $movieSerieDetailsPoster?.style.setProperty(
                  "--posterViewTransitionName",
                  "poster"
                );
                $appHeader.style.setProperty(
                  "view-transition-name",
                  "app-header"
                );
                $infoDate?.style.setProperty(
                  "view-transition-name",
                  "movie-series-release-date"
                );
                $avgProgressbar?.style.setProperty(
                  "view-transition-name",
                  "show-avg-progress"
                );
              });
            }
          }}
          size="medium"
        >
          {isDarkMode ? <CiLight /> : <CiDark />}
        </IconButton>
      </HeaderRight>
    </Header>
  );
};

export default AppHeader;
