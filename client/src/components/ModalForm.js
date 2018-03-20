import React from 'react';
import { Modal, Form, Button, Image } from 'semantic-ui-react';
import axios from 'axios';

import { getImgUrl } from '../helpers/utils';
import { FINAL_ROUND } from '../helpers/constants';
import { connect } from 'react-redux';
import {
  changeModalInput, closeModal, fetchRanking, fetchRankingFailed, fetchRankingSuccess, submitResult, submitResultFailed,
  submitResultSuccess
} from '../actions';

const ModalForm = ({
                     power, avgError, imgUrl, modalInput, isSubmitting, showModal,
                     handleInput, handleSubmit, handleCancel,
                   }) => (
    <div>
      <Modal size='small' open={showModal} onClose={() => handleCancel()}>
        <Modal.Header>Send Record!</Modal.Header>

        <Modal.Content image>
          <Image wrapped src={imgUrl}></Image>
          <div>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input placeholder='input name' value={modalInput} onChange={e => handleInput(e)}/>
              </Form.Field>
              <Form.Field>
                <label>Power</label>
                <p>{power}</p>
              </Form.Field>
              <Form.Field>
                <label>Average Error</label>
                <p>{avgError.toFixed(3)} ms</p>
              </Form.Field>
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={() => handleSubmit(modalInput, power, avgError)}>Submit</Button>
          <Button negative onClick={() => handleCancel()}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    </div>
);

const mapStateToProps = state => {
  const { power, sumAbsError } = state.timer;
  const { modalInput, isSubmitting, showModal } = state.game;

  const avgError = sumAbsError / FINAL_ROUND;
  const imgUrl = getImgUrl(power);

  return {
    power,
    avgError,
    imgUrl,
    modalInput,
    isSubmitting,
    showModal,
  }
}
const mapDispatchToProps = dispatch => {
  const handleSubmit = async (name, power, avgError) => {
    dispatch(submitResult());
    try {
      await axios.post('/api/result', {
        name,
        power,
        avgError,
      });
      dispatch(submitResultSuccess());
    } catch (error) {
      console.log(error);
      dispatch(submitResultFailed());
    }

    dispatch(fetchRanking());
    try {
      const response = await axios.get('/api/ranking');
      dispatch(fetchRankingSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(fetchRankingFailed());
    }
  };
  const handleCancel = () => {
    dispatch(closeModal());
  };
  const handleInput = e => {
    dispatch(changeModalInput(e.target.value));
  }

  return {
    handleInput,
    handleSubmit,
    handleCancel,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);