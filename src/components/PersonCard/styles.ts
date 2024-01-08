import styled from "styled-components";

export const Person = styled.figure`
  display: flex;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: #efefef;
  overflow: hidden;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.17);
  min-height: 70px;
`;

export const PersonInfo = styled.figcaption`
overflow:hidden ;
`

export const PersonImgWrapper = styled.div`
  width: 70px;
  display: flex ;
  flex-shrink: 0;
  align-self: center;
  justify-content: center;
  font-size: 2rem ;
  color: #525252;
`;
export const PersonImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

export const PersonName = styled.h3`
font-size: 1rem;
text-overflow: ellipsis;
overflow: hidden ;
white-space: nowrap ;
`;

export const PersonCharacterName = styled.p`
  font-size: 0.8rem;
  color: #525252;
  text-overflow: ellipsis;
  overflow: hidden ;
  white-space: nowrap ;
`