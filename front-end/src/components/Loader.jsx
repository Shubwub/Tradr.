import React from 'react';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Spinner = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  text-align: center;
  -webkit-animation: sk-rotate 2s infinite linear;
  animation: sk-rotate 2s infinite linear;
`;

const Dot1 = styled.div`
  background-color: ${props => props.theme.trader};
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  border-radius: 100%;

  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
`;
const Dot2 = styled.div`
  background-color: ${props => props.theme.user};
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  border-radius: 100%;
  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
  top: auto;
  bottom: 0;
  -webkit-animation-delay: -1s;
  animation-delay: -1s;

  @-webkit-keyframes sk-rotate {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes sk-rotate {
    100% {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes sk-bounce {
    0%,
    100% {
      -webkit-transform: scale(0.3);
    }
    50% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bounce {
    0%,
    100% {
      transform: scale(0.3);
      -webkit-transform: scale(0.3);
    }
    50% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
`;

const Loader = () => {
  return (
    <SpinnerContainer>
      <Spinner>
        <Dot1></Dot1>
        <Dot2></Dot2>
      </Spinner>
    </SpinnerContainer>
  );
};

export default Loader;
