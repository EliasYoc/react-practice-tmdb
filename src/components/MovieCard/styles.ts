import styled from "styled-components";

export const Card = styled.figure`
  width: 200px;
  height: 300px;
  scroll-snap-align: start;
  
  border-radius: 0.6rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  &::before {
    content: "";
    transition: backdrop-filter 0.3s ease, background 0.3s ease;
    display: block;
    position: absolute;
    inset: 0;
    background: linear-gradient(
      0deg,
      hsl(0deg 0% 0%) 0%,
      hsl(0deg 0% 69% / 0%) 55%,
      hsl(0deg 0% 98% / 0%) 100%
    );
    z-index: 1;
  }
  &.open-overview::before {
    background: #00000061;
    backdrop-filter: blur(8px);
  }
`;

export const CardBody = styled.figcaption`
  width: 100%;
  height: 100%;
  position: relative;
  color: #fff;
  z-index: 2;
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
`;

export const CardDescription = styled.div`
  user-select: none;
  overflow: scroll;
  position: relative;
  flex-grow: 1;
  top: 100%;

  transition: top 0.3s ease;
  &::-webkit-scrollbar {
    display: none;
  }
  &.open-overview {
    top: 0;
  }
`;

export const CircularProgressbarWrapper = styled.div`
  width: 45px;
  transition: width 0.3s ease;

  &.open-overview {
    width: 35px;
  }
`;

export const CardImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  border-radius: 0.6rem;
  z-index: 0;
`;

export const CardTitle = styled.h3`
  border-radius: 0.6rem;
  padding: 0.2rem;
  background: #63636394;
  font-size: 1rem;

  &.open-overview {
    user-select: text;
  }
`;

export const ContainerVisibleContent = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: flex-end;
  gap: 0.5rem;
  position: relative;
  top: 100%;
  transform: translateY(-100%);
  transition: top 0.3s ease, transform 0.3s ease;
  &.open-overview {
    top: 0;
    transform: translateY(0);
    padding-bottom: 0.5rem;
  }
`;

export const CardDate = styled.time`
  flex-grow: 1;
`;

export const ArrowWrapper = styled.div`
transition: transform 0.3s ease;
display: flex ;

  &.open-overview {
    transform: rotate(180deg);
  }
`