import React from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';

export default function TraderCard(props) {
  const ratingBgColorChooser = () => {
    if (props.trader.score === 0) return '#c5c5c5';
    else if (props.trader.score > 0 && props.trader.score < 2) return 'red';
    else if (props.trader.score > 2 && props.trader.score < 3) return '#FFBF00';
    else if (props.trader.score > 3 && props.trader.score <= 5)
      return '#1EB300';
  };
  const Trader = styled.li`
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: flex-start;
    margin: 5px;
    background: white;
    min-width: 300px;
    height: 150px;
    box-shadow: 1px 0 3px 0 rgb(0, 0, 0, 0.3);
    transition: transform 0.1s;
    &:hover {
      transform: scale(1.05);
      z-index: 9999;
      background: #f5f5f5;
    }
  `;
  const Username = styled.p`
    font-weight: bold;
  `;
  const AvatarWrapper = styled.aside`
    width: 6em;
    border: 4px solid #fe7e0f;
    margin: 5px;
    border-radius: 50%;
    height: 6em;
  `;

  const AvatarImg = styled.img`
    width: 100%;
    border-radius: 50%;
  `;

  const Contents = styled.section`
    width: 65%;
    margin: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `;

  const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  `;
  const Rating = styled.div`
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 1.5em;
    height: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
    border-radius: 50%;
    color: white;
    padding: 0.5em;
    font-size: 0.8em;
    box-shadow: 1px 0 3px 0 rgb(0, 0, 0, 0.3);
    text-shadow: 0 0 10px #000000;
    background-color: ${props => ratingBgColorChooser};
  `;
  const TraderProp = styled.p`
    margin: 4px;
  `;
  const navigateToTrader = username => {
    navigate(`/traders/${username}`);
  };
  return (
    <Trader onClick={() => navigateToTrader(props.trader.username)}>
      <Contents>
        <Username>{props.trader.username}</Username>
        <TraderProp>{props.trader.trade}</TraderProp>
        <TraderProp>Distance: {props.trader.distance}km</TraderProp>
        <TraderProp>£{props.trader.rate}/d</TraderProp>
      </Contents>
      <RightContainer>
        <AvatarWrapper>
          <AvatarImg src={props.trader.avatar_ref} alt="" />
        </AvatarWrapper>
        <Rating>
          {props.trader.score === 0
            ? 'N/A'
            : props.trader.score.toString().slice(0, 3)}
        </Rating>
      </RightContainer>
    </Trader>
  );
}
