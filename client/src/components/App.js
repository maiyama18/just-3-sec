import React from 'react';
import { Grid } from 'semantic-ui-react';

import Status from './Status';
import Timer from './Timer';
import Header from './Header';
import Ranking from './Ranking';
import ModalForm from './ModalForm';

const App = () => (
    <div>
      <Header/>
      <Grid centered container>
        <Grid.Row>
          <Grid.Column computer={3} tablet={4} mobile={6} textAlign='center'>
            <Status/>
          </Grid.Column>
          <Grid.Column computer={5} tablet={8} mobile={10} textAlign='center'>
            <Timer/>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column computer={8} tablet={12} mobile={16}>
            <Ranking/>
          </Grid.Column>
        </Grid.Row>

      </Grid>
      <ModalForm/>
    </div>
)

export default App;
