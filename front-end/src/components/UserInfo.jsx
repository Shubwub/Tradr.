import React, { Component } from 'react';
import styled from 'styled-components';
import { AppConsumer } from './AppContext';
import { getAge } from '../utils';
import AvatarUpload from './AvatarUpload';

const Container = styled.div`
  color: white;
  background: ${props =>
    props.user.trade ? props.theme.trader : props.theme.user};
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AvatarWrapper = styled.aside`
  width: 6em;
  border: 4px solid white;
  margin: 5px;
  border-radius: 50px;
  height: 6em;
`;

const AvatarImg = styled.img`
  width: 100%;
  border-radius: 50%;
`;

const Info = styled.div`
  background: white;
  color: black;
  width: 90%;
  text-align: left;
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: inset 1px 0 3px 0 rgb(0, 0, 0, 0.3);
`;

const TraderInfo = styled(Info)``;

class UserInfo extends Component {
  state = {
    newAvatarRef: ''
  };
  componentDidMount() {
    //make request to api for userinfo
  }

  updateAvatar = newAvatarRef => {
    this.setState({ newAvatarRef });
  };
  render() {
    return (
      <AppConsumer>
        {user => {
          return (
            <>
              <Container user={user}>
                <AvatarWrapper>
                  <AvatarImg
                    src={
                      !this.state.newAvatarRef
                        ? user.avatar_ref
                        : this.state.newAvatarRef
                    }
                    alt=""
                  />
                </AvatarWrapper>
                <AvatarUpload
                  updateAvatar={this.updateAvatar}
                  trader={user.trade}
                  username={user.username}
                />
                <p>{user.username}</p>

                {!user.trade && (
                  <Info>
                    <p>
                      {user.first_name} {user.last_name}
                    </p>
                    <p>{getAge(new Date(user.dob))}</p>
                  </Info>
                )}
                {user.trade && (
                  <TraderInfo>
                    <p>
                      {user.first_name} {user.last_name}
                    </p>
                    <hr />
                    <p>{getAge(new Date(user.dob))}</p>
                    <hr />
                    <p>{user.trade}</p>
                    <hr />
                    <p>{user.personal_site}</p>
                    <hr />
                    <p>{user.rate}/d</p>
                  </TraderInfo>
                )}
              </Container>
            </>
          );
        }}
      </AppConsumer>
    );
  }
}

export default UserInfo;
