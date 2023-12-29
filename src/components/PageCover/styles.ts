import styled from "styled-components";

export const Cover = styled.div`
  display: flex;
  position: relative;
  height: 60vh ;
`
export const CoverImg = styled.img`
  position: absolute ;
  object-fit: cover;
  width: 100%;
  height: 100%;

  `

export const ImgBackdrop = styled.div`
  position: absolute ;
  inset: 0;
  backdrop-filter: blur(1.2rem);
  background: linear-gradient(0deg, hsl(0deg 0% 0%) 0%, hsl(0deg 0% 69% / 0%) 55%, hsl(0deg 0% 98% / 0%) 100%);
  `

export const CoverDetails = styled.section`
  width: min(1200px, 100%) ;
  display: flex ;
  gap: 1rem ;
  padding: 3rem 1rem  ;
  margin: 0 auto;
  position: relative ;
  align-items: center ;
  `
export const CoverInfo = styled.article`
 flex-grow: 1 ;
 align-self: stretch ;
 background: rgba(0, 0, 0, 0.5);
 color:#fff ;
 padding:   2rem;
 border-radius: 1rem ;
 display: flex ;
 flex-direction: column ;
 gap: 0.5rem ;
`

export const CoverButtonsContainer = styled.div`
  display: flex ;
  gap: 1rem ;
`
export const CircularProgressbarWrapper = styled.div`
  width: 70px ;
  `

export const PosterWrapper = styled.div`

  width: min(300px, 50%);
  display: flex ;
  border-radius: 1rem;
  overflow: hidden;
  aspect-ratio: 2/3;
  flex-shrink: 0 ;
`

export const Poster = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  view-transition-name:var(--viewTransitionName) ;
`
export const MovieTitle = styled.h1`
  font-size: 1.8rem ;
  text-wrap: balance;
`

export const Overview = styled.p``