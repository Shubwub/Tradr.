import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import TraderPin from './TraderPin';
import TraderList from './TraderList';
import styled from 'styled-components';
import { getDistances } from '../utils';
import { getTraders } from '../utils/traders';
import { getProject } from '../utils/projects';
import FilterBar from './FilterBar';
import Loader from './Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';

export default class TraderMap extends Component {
  state = {
    traders: [],
    project: {},
    showFilters: false,
    isLoading: true
  };
  updateTraders = async filters => {
    const traders = await getTraders(this.state.project.project_id, filters);
    this.setState({ traders });
  };
  toggleForm = () => {
    this.setState(curr => {
      return {
        showFilters: !curr.showFilters
      };
    });
  };
  getTraders = async project => {
    let traders = await getTraders(project.project_id);
    traders = getDistances(project, traders);
    return traders;
  };
  componentDidMount = async () => {
    const project = await getProject(this.props.project_id);
    const traders = await this.getTraders(project);
    this.setState({
      traders,
      isLoading: false,
      project
    });
  };
  render() {
    const MapScreen = styled.div`
      margin-top: 80px;
    `;
    const MapWrapper = styled.div`
      height: 100%;
      width: 60%;
      @media (max-width: 900px) {
        height: 40%;
        width: 100%;
      }
    `;
    const TraderWrapper = styled.div`
      height: 90vh;
      margin: 0;
      width: 35%;
      @media (max-width: 900px) {
        width: 100%;
        height: 40%;
      }
    `;
    const MapAndList = styled.div`
      height: 90vh;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      overflow-y: scroll;
      @media (max-width: 900px) {
        flex-direction: column;
      }
    `;
    const Button = styled.button`
      background: white;
      width: 50px;
      height: 50px;
      border: none;
      background: ${props => props.theme.trader};
      cursor: pointer;
      &:hover {
        background: ${props => props.theme.trader_dark};
      }
    `;
    return (
      <MapScreen>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <>
            {this.state.showFilters && (
              <FilterBar updateTraders={this.updateTraders} />
            )}
            <MapAndList>
              <Button onClick={this.toggleForm}>
                {!this.state.showFilters ? (
                  <FontAwesomeIcon icon={faFilter} />
                ) : (
                  <FontAwesomeIcon icon={faTimes} />
                )}
              </Button>
              <MapWrapper>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: 'AIzaSyCLjaFTw1ZCyLDZrMtk7uX6PkISOr0u-Vk'
                  }}
                  defaultCenter={{
                    lat: this.state.project.lat,
                    lng: this.state.project.lng
                  }}
                  defaultZoom={15}
                >
                  <TraderPin
                    project={true}
                    lat={this.state.project.lat}
                    lng={this.state.project.lng}
                  />
                  {this.state.traders.map(trader => (
                    <TraderPin
                      project={false}
                      lat={trader.lat}
                      lng={trader.lng}
                      username={trader.username}
                      score={trader.score}
                      rate={trader.rate}
                      key={trader.username}
                      trade={trader.trade}
                      avatar_ref={trader.avatar_ref}
                    />
                  ))}
                </GoogleMapReact>
              </MapWrapper>
              <TraderWrapper>
                <TraderList traders={this.state.traders} />
              </TraderWrapper>
            </MapAndList>
          </>
        )}
      </MapScreen>
    );
  }
}
