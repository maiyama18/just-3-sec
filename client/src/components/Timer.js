import React from 'react';
import { connect } from "react-redux";
import { Segment, Button, Icon, Header } from 'semantic-ui-react';

import { startTimer, stopTimer, terminateGame } from "../actions";
import { FINAL_ROUND } from "../helpers/constants";
import { getGradeProps } from "../helpers/utils";

const Timer = ({ round, timerStr, gradeStr, gradeColor, buttonIcon, isButtonDisabled, handleClick }) => (
    <Segment.Group>
      <Segment inverted>
        <Header as='h3' style={{color: gradeColor}}>{gradeStr}</Header>
        <Header as='h1'>{timerStr}</Header>
      </Segment>
      <Segment.Group horizontal>
        <Segment>
          <Button circular icon color='orange' onClick={() => handleClick()} disabled={isButtonDisabled}>
            <Icon name={buttonIcon}/>
          </Button>
        </Segment>
        <Segment style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Header as='h3'>{round} / {FINAL_ROUND}</Header>
        </Segment>
      </Segment.Group>
    </Segment.Group>
);

const mapStateToProps = state => {
  const { round, power, isStarted, startedAt, stoppedAt } = state.timer;
  const { isTerminated } = state.game;

  const isButtonDisabled = isTerminated;
  const timerStr = formatTimerStr(round, startedAt, stoppedAt, isStarted);
  const buttonIcon = isStarted ? 'stop' : 'play';

  return {
    round,
    power,
    startedAt,
    isStarted,
    timerStr,
    buttonIcon,
    isButtonDisabled,
  }
};
const mapDispatchToProps = dispatch => {
  const handleClickWithArgs = (round, power, startedAt, isStarted) => {
    const now = new Date().getTime();

    if (!isStarted) {
      dispatch(startTimer(now));
    } else {
      dispatch(stopTimer(now));

      if (round === FINAL_ROUND) {
        dispatch(terminateGame());
      }
    }
  };

  return {
    handleClickWithArgs,
  }
};
const mergeProps = ({ round, power, startedAt, isStarted, timerStr, buttonIcon, isButtonDisabled }, { handleClickWithArgs }) => {
  const handleClick = () => handleClickWithArgs(round, power, startedAt, isStarted);
  const { gradeStr, gradeColor } = getGradePropsFromStartStop(startedAt, round, isStarted);

  return {
    round,
    timerStr,
    gradeStr,
    gradeColor,
    buttonIcon,
    isButtonDisabled,
    handleClick,
  }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Timer);

const formatTimerStr = (round, startedAt, stoppedAt, isStarted) => {
  if (!isStarted && round === 1) return '00:000';

  const timeSecStr = isStarted ? '??.???' : ((stoppedAt - startedAt) / 1000).toFixed(3);
  const secStr = ('0' + timeSecStr.split('.')[0]).slice(-2);
  const milliSecStr = timeSecStr.split('.')[1];
  const timerStr = `${secStr}:${milliSecStr}`;

  return timerStr;
};
const getGradePropsFromStartStop = (startedAt, round, isStarted) => {
  const now = new Date().getTime();

  const DUMMY_GRADE_PROPS = { gradeStr: '...', gradeColor: '#1A1B1C' };
  if (isStarted) return DUMMY_GRADE_PROPS;
  else if (!isStarted && round === 1) return DUMMY_GRADE_PROPS;

  const error = Math.abs((now - startedAt) - 3000);

  return getGradeProps(error);
}