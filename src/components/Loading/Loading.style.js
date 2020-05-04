import styled, { css } from 'styled-components';

export const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  height: 100vh;
  ${(props) => props.fullscreen && css`${FullScreen}`}
`;

export const FullScreen = css`
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
`;
