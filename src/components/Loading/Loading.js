import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import { LoadingContainer } from './Loading.style';

const propTypes = {
  loading: PropTypes.bool,
};

const defaultProps = {
  loading: true,
};

const Loading = ({ loading }) => {
  if (!loading) {
    return null;
  }
  return (
    <LoadingContainer fullscreen>
      <ReactLoading type="balls" />
    </LoadingContainer>
  );
}

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;
