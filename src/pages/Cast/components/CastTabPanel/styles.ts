import styled from "styled-components";

export const CastTabContainer = styled.div`
  display: flex ;
  flex-direction: column;
  height: 100% ;
`;

export const Departments = styled.div`
  display: flex;
  gap: .5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  padding: 1rem 1rem 0;
`;

export const DeparmentName = styled.span`
  font-size: 0.8rem;
  padding: 0.5rem;
  border-radius: 0.7rem;
  background: #efefef;

  &:hover {
    cursor: pointer;
  }
  &:active {
    background:#dcdcdc;
  }

  &.active {
    background: #439cf3;
    color: #fff ;
  }
`;

export const CastGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(188px, 1fr));
  padding: 0 1rem;
`;
