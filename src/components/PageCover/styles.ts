import styled from "styled-components";
import { mediaQueries } from "../../utils/helper";

export const Cover = styled.div`
  display: flex;
  position: relative;
  min-height: 800px;

  @media only screen and (${mediaQueries.md}) {
    min-height: 50vh;
  }
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
  padding: 1rem  ;
  margin: 0 auto;
  position: relative ;
  align-items: center ;

  @media only screen and (${mediaQueries.md}) {
    & {
      justify-content: center;
      align-items: flex-start;
    }
  }
  `


export const PosterWrapper = styled.div`
  width: min(380px, 50%);
  display: flex ;
  aspect-ratio: 2/3;
  flex-shrink: 0 ;

  @media only screen and (${mediaQueries.md}) {
    & {
      width: 75% ;
      
    }
  }
`

export const Poster = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  view-transition-name:var(--posterViewTransitionName) ;

  @media only screen and (${mediaQueries.md}) {
    transform: translateY(var(--mob-responsive-poster-top)) ;
  }
`
