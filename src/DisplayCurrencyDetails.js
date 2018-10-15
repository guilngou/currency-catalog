import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import styled from 'styled-components';

const Header = styled.header`
  .App-header {
    background-color: #222;
    height: 150px;
    padding: 20px;
    color: white;
  }
`;

const Title = styled.title`
  .App-title {
    font-size: 1.5em;
  }
`;

class DisplayCurrencyDetails extends Component {
  render() {
    const { history } = this.props;
    const currency = this.props.location.object;
    return (
      <div className="App">
        <Header>
          <Title className="App-title">{currency.name}</Title>
          <Button
            variant="contained"
            onClick={() => {
              history.push('/');
            }}
          >
            Back
          </Button>
        </Header>
        <ul>
          {Object.entries(currency)
            .slice(1, 8)
            .map((currentValue, index) => <ListItem key={index}>{currentValue[0] + ': ' + currentValue[1]}</ListItem>)}
        </ul>
      </div>
    );
  }
}
export const DisplayCurrencyDetailsComponent = withRouter(DisplayCurrencyDetails);
