import styled from "styled-components";
import { mediaQueries } from "../../utils/helper";

export const Header = styled.header`
  padding: 1rem;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.2);
  position: sticky ;
  top: 0;
  height: var(--header-height) ;
  background: #ffffff4d ;
  backdrop-filter: blur(15px);

  @media only screen and (${mediaQueries.md}) {
    top: auto;
    bottom: 0 ;
  }
`

export const IconWrapper = styled.div`
  font-size: 1.6rem ;
  display:flex ;
`

export const HeaderLeft = styled.div`
  display: flex ;
  gap: 1rem ;
  align-items: center ;
`

export const HeaderTitle = styled.h1`
  view-transition-name: app-title;
  font-size: 1.5rem ;
`