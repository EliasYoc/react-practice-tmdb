import { useLocation, useNavigate } from "react-router-dom"
import { Header, HeaderLeft, HeaderTitle, IconWrapper } from "./styles"
import { LuArrowLeft } from "react-icons/lu";

const AppHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Header>
      <HeaderLeft>

        {location.pathname !== "/" && <IconWrapper onClick={() => navigate(-1)}>
          <LuArrowLeft />
        </IconWrapper>
        }
        <HeaderTitle onClick={() => navigate("/", { unstable_viewTransition: true })}>
          Movies and Series
        </HeaderTitle>

      </HeaderLeft>

    </Header>
  )
}

export default AppHeader