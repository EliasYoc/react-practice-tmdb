import styled from "styled-components";
import { mediaQueries } from "../../utils/helper";

export const Header = styled.header`
  padding: 1rem;
  display: flex;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  width: 100%;
  top: 0;
  background: var(--box-transparent-bg-color);
  backdrop-filter: blur(25px);
  color: var(--text-color);
  view-transition-name: app-header;
  justify-content: space-between;
  z-index: 3;
  @media only screen and (${mediaQueries.md}) {
    top: auto;
    bottom: 0;
  }
`;

export const IconWrapper = styled.div`
  font-size: 1.6rem;
  display: flex;
`;

export const HeaderLeft = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
export const HeaderRight = styled.div`
  display: flex;
  gap: 1rem;
`;

export const HeaderTitle = styled.h1`
  view-transition-name: app-title;
  font-size: 1.5rem;
`;
