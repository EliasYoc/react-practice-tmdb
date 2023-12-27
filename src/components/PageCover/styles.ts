import styled from "styled-components";

export const Cover = styled.div`
  display: flex;
  gap:1.5rem;
  padding: 1rem;
`

export const PosterWrapper = styled.div`
  display: flex ;
  width:340px ;
  border-radius: 1rem;
  overflow: hidden;
  aspect-ratio: 2/3;
`

export const Poster = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  view-transition-name:var(--viewTransitionName) ;
`