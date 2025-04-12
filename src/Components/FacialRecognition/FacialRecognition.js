<div className='center ma'>
  <div className='relative mt2'>
    <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto' />
    {box && Object.keys(box).length > 0 && (
      <div
        className='bounding-box'
        style={{
          top: box.topRow,
          right: box.rightCol,
          bottom: box.bottomRow,
          left: box.leftCol
        }}
      ></div>
    )}
  </div>
</div>
