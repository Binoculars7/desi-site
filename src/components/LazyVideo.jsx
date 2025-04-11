import React from 'react';

const LazyVideo = ({ url }) => {
  return (
    <video className='w-40 h-72 object-cover' controls>
      <source src={url} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
}

export default LazyVideo;
