import React, { Component } from 'react';
import {
  Filters,
  FilterItem,
  FilterInput,
  FilterSelect,
  FilterButton,
  FilterLabel
} from '../styles/Filters';

export default class FilterBar extends Component {
  state = {
    trade: '',
    distance: null,
    score: null,
    upper_rate: null
  };
  submitForm = async e => {
    e.preventDefault();
    await this.props.updateTraders(this.state);
  };
  handleChange = e => {
    e.target.id !== 'trade'
      ? this.setState({ [e.target.id]: Number(e.target.value) })
      : this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    const { trade, distance, score, upper_rate } = this.state;
    return (
      <Filters onSubmit={this.submitForm}>
        <FilterItem>
          <FilterLabel htmlFor="trade">
            <FilterInput
              value={trade}
              id="trade"
              type="text"
              placeholder="Trade"
              onChange={this.handleChange}
            />
          </FilterLabel>
        </FilterItem>
        <FilterItem>
          <FilterLabel htmlFor="distance">
            <FilterInput
              value={distance}
              id="distance"
              type="number"
              placeholder="Distance"
              onChange={this.handleChange}
              step={0.1}
            />
          </FilterLabel>
          (km)
        </FilterItem>
        <FilterItem>
          Score:
          <FilterSelect value={score} id="score" onChange={this.handleChange}>
            <option value="1+" selected>
              1+
            </option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5</option>
          </FilterSelect>
        </FilterItem>
        <FilterItem>
          <FilterLabel htmlFor="upper_rate">
            <FilterInput
              value={upper_rate}
              id="upper_rate"
              type="number"
              placeholder="Max rate"
              onChange={this.handleChange}
            />
            /d
          </FilterLabel>
        </FilterItem>

        <FilterButton>Filter Results</FilterButton>
      </Filters>
    );
  }
}
