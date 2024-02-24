import styled from "styled-components";

export const CastTabContainer = styled.div`
  padding: 1rem;
`;

export const Departments = styled.div`
  display: flex;
  gap: .5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
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
  margin-top: 1rem;
`;
