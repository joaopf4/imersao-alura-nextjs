import React from 'react';
import Widget from '../Widget';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Loading>
        <img
          alt="Loading.."
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          src="https://media.giphy.com/media/3o6Zt2YL3H8a7vPBio/giphy.gif"
        />
      </Widget.Loading>
    </Widget>
  );
}

export default LoadingWidget;
