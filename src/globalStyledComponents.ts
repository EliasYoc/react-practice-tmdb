import styled from "styled-components";
import { mediaQueries } from "./utils/helper";
interface ICustomGrid {
  gridTemplateColumns?: string;
  padding?: string;
}

export const ViewFullHeight = styled.div`
  flex-grow: 1;
  padding-top: var(--header-height);
  overflow: auto;
  display: flex;
  flex-direction: column;

  @media only screen and (${mediaQueries.md}) {
    padding-bottom: var(--header-height);
    padding-top: 0;
  }
`;

export const CustomGrid = styled.div<ICustomGrid>`
  display: grid;
  grid-template-columns: ${({ gridTemplateColumns }) =>
    gridTemplateColumns || "repeat(auto-fit, minmax(150px, 1fr))"};
  gap: 0.5rem;
  padding: ${({ padding }) => padding || ".5rem"};
`;
