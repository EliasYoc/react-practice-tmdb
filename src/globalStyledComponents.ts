import styled from "styled-components";
import { mediaQueries } from "./utils/helper";

export const ViewFullHeight = styled.div`
  flex-grow: 1;
  padding-top: var(--header-height);
  overflow: auto;

  @media only screen and (${mediaQueries.md}) {
    padding-bottom: var(--header-height) ;
    padding-top:0 ;
  }
`