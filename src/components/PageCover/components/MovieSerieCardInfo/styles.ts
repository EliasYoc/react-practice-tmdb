import styled from "styled-components";
import { mediaQueries } from "../../../../utils/helper";

export const Info = styled.article`
  flex-grow: 1;
  align-self: stretch;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media only screen and (${mediaQueries.md}) {
    background: rgb(237 237 237);
    padding: 1rem ;
    margin: var(--mob-responsive-poster-top) 1rem 1rem;
    color: inherit;
  }
`;

export const CoverButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
export const CircularProgressbarWrapper = styled.div`
  width: 70px;
`;

export const MovieTitle = styled.h1`
  font-size: 1.8rem;
  text-wrap: balance;
`;

export const Overview = styled.p``;
