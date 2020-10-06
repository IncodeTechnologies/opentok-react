import React, { Children, cloneElement, Fragment } from 'react';
import PropTypes from 'prop-types';
import OTSubscriberContext from './OTSubscriberContext';

export default function OTStreams(props, context) {
  const session = props.session || context.session || null;
  const streams = props.streams || context.streams || null;

  if (!session) {
    return null;
  }

  const child = Children.only(props.children);

  console.log(props.loading, 'uwu');
  const childrenWithContextWrapper =
    Array.isArray(streams) && streams.length > 0
      ? streams.map((stream) => (
          <OTSubscriberContext stream={stream} key={stream.id}>
            {cloneElement(child)}
          </OTSubscriberContext>
        ))
      : props.loading;

  return <Fragment>{childrenWithContextWrapper}</Fragment>;
}

OTStreams.propTypes = {
  children: PropTypes.element.isRequired,
  session: PropTypes.shape({
    publish: PropTypes.func,
    subscribe: PropTypes.func,
  }),
  streams: PropTypes.arrayOf(PropTypes.object),
};

OTStreams.defaultProps = {
  session: null,
  streams: null,
  loading: null,
};

OTStreams.contextTypes = {
  session: PropTypes.shape({
    publish: PropTypes.func,
    subscribe: PropTypes.func,
  }),
  streams: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.element,
};
