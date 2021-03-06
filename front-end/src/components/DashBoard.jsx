import React, { Component } from 'react';
import UserInfo from '../components/UserInfo';
import ProjectList from '../components/ProjectList';
import styled from 'styled-components';
import { getProjectsByUsername, getProjectsByTrader } from '../utils/projects';
import { AppConsumer } from './AppContext';

const Container = styled.div`
  /* overflow-y: scroll; */
  display: flex;
  height: 94vh;
  /* overflow-y: scroll; */
  @media (max-width: 768px) {
    flex-direction: column;
    overflow-y: scroll;
    height: 100%;
  }
`;

const ProjectListsContainer = styled.div`
  width: 70%;
  overflow-y: scroll;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default class DashBoard extends Component {
  state = {
    inPlanning: [],
    inProgress: [],
    complete: []
  };
  componentDidMount = async () => {
    const projects =
      this.props.type === 'user'
        ? await getProjectsByUsername(this.props.username)
        : await getProjectsByTrader(this.props.username);
    this.setState({
      inPlanning: projects.filter(project => project.status === 'in planning'),
      inProgress: projects.filter(project => project.status === 'in progress'),
      complete: projects.filter(project => project.status === 'complete')
    });
  };

  updateInPlanning = project => {
    this.setState(currentState => {
      return { inPlanning: [...currentState.inPlanning, project] };
    });
  };

  handleStatusChange = async () => {
    const projects = await getProjectsByUsername(this.props.username);
    this.setState({
      inPlanning: projects.filter(project => project.status === 'in planning'),
      inProgress: projects.filter(project => project.status === 'in progress'),
      complete: projects.filter(project => project.status === 'complete')
    });
  };

  render() {
    return (
      <AppConsumer>
        {user => {
          return (
            <Container>
              <UserInfo
                user={user}
                updateUserInfo={this.props.updateUserInfo}
              />
              <ProjectListsContainer>
                <ProjectList
                  heading="Planning"
                  handleStatusChange={this.handleStatusChange}
                  projects={this.state.inPlanning}
                  updateInPlanning={this.updateInPlanning}
                />
                <ProjectList
                  heading="In progress"
                  handleStatusChange={this.handleStatusChange}
                  projects={this.state.inProgress}
                />
                <ProjectList
                  heading="Complete"
                  handleStatusChange={this.handleStatusChange}
                  projects={this.state.complete}
                />
              </ProjectListsContainer>
            </Container>
          );
        }}
      </AppConsumer>
    );
  }
}
