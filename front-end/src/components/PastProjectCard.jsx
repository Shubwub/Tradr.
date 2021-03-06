import React, { Component } from 'react';
import styled from 'styled-components';
import { AppConsumer } from './AppContext';
import { getProjectImages } from '../utils/projects';

class ProjectCard extends Component {
  state = {
    images: []
  };

  componentDidMount = async () => {
    const { images } = await getProjectImages(this.props.project.project_id);
    this.setState({ images: images[0] });
  };

  render() {
    const Card = styled.div`
      min-width: 300px;
      max-width: 300px;
      height: 250px;
      margin: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      background: white;
      box-shadow: 1px 0 10px 0 rgb(0, 0, 0, 0.3);
      transition: transform 0.1s;
    `;
    const DateText = styled.p`
      float: left;
    `;
    const startDate = new Date(this.props.project.start_date)
      .toLocaleString()
      .split(',')[0];
    const endDate = new Date(this.props.project.end_date)
      .toLocaleString()
      .split(',')[0];

    const DateSection = styled.div`
      display: flex;
      font-size: 10px;
      justify-content: space-around;
      width: 105%;
      background: white;
      box-shadow: 1px 0 3px 0 rgb(0, 0, 0, 0.3);
    `;
    const ProjectImage = styled.div`
      height: 70%;
      width: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
    `;
    const StatusBar = styled.div`
      width: 100%;
      background: ${props => props.theme.trader};
      height: 5%;
    `;

    const ProjectAvatar = styled.img`
      height: 100px;
    `;

    return (
      <AppConsumer>
        {user => {
          return (
            <Card>
              <p>{this.props.project.title}</p>
              <DateSection>
                <div>
                  <DateText>{startDate}</DateText>
                </div>

                <p>-</p>

                <div>
                  <DateText>{endDate}</DateText>
                </div>
              </DateSection>
              <ProjectImage>
                <ProjectAvatar
                  src={
                    this.state.images !== undefined
                      ? this.state.images.path
                      : this.props.project.avatar_ref
                  }
                />
              </ProjectImage>
              <StatusBar user={user}></StatusBar>
            </Card>
          );
        }}
      </AppConsumer>
    );
  }
}

export default ProjectCard;
