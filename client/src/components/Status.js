import React from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';

import { getImgUrl } from '../helpers/utils';

const Status = ({ imgUrl, power }) => (
    <Card centered>
      <Image src={imgUrl} alt={imgUrl}/>
      <Card.Content>
        <Card.Header>power: {power}</Card.Header>
      </Card.Content>
    </Card>
);

const mapStateToProps = state => {
  const { power } = state.timer;

  const imgUrl = getImgUrl(power);

  return {
    power,
    imgUrl,
  };
};

export default connect(mapStateToProps)(Status);