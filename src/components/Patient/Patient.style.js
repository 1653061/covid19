import styled from "styled-components";

export const PatientContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 20px;
  margin-top: 8px;
  display: flex;
`;

export const Button = styled.button`
  font-family: sans-serif;
  color: white;
  background: #333333;
  box-sizing: border-box;
  border-radius: 3%;
  font-size: 20px;
  &:hover {
    background: deepskyblue;
  }
  &.active {
    background: deepskyblue;
  }
`;
const pTag = styled.p`
  font-family: sans-serif;
  color: black;
  box-sizing: border-box;
  font-size: 20px;
`;

export const InfoContaner = styled.div`
  width: 40%;
  height: 100%;
  padding-left: 200px;
  margin-top: 20px;
`;

export const SliderContainer = styled.div`
  width: 40%;
  margin-right: 20px;
  max-height: 250px;
  padding-left: 50px;
  margin-top: 20px;
`;

export const Name = styled.p`
  ${pTag};
`;
export const Address = styled.p`
  ${pTag};
`;
export const Note = styled.p`
  ${pTag};
`;
export const PatientGroup = styled.p`
  ${pTag};
`;
export const LAT = styled.p`
  ${pTag};
`;
export const LNG = styled.p`
  ${pTag};
`;
export const VerifyDate = styled.p`
  ${pTag};
`;
