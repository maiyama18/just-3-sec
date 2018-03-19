import React from 'react';
import { connect } from 'react-redux';
import { Table, Image } from 'semantic-ui-react';


import { getImgUrl } from '../helpers/utils';

const Ranking = ({ array, isFetching }) => (
    <div>
      <Table color='orange' unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Rank</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell>Power</Table.HeaderCell>
            <Table.HeaderCell>Avg. Err.</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {array.map((userObj, i) => {
              const { name, power, avgErr } = userObj;
              const imgUrl = getImgUrl(power);

              return (
              <Table.Row key={i + name}>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell><Image src={imgUrl} size='mini'></Image></Table.Cell>
                <Table.Cell>{power}</Table.Cell>
                <Table.Cell>{avgErr}</Table.Cell>
              </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
);

const mapStateToProps = state => {
  const { array, isFetching } = state.ranking;

  return {
    array,
    isFetching,
  }
};

export default connect(mapStateToProps)(Ranking);