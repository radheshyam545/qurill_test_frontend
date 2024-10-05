import React from 'react';

function ProfileUploadsCards({ url, index, handleDelete }) {

  const clickHandle = () => {
    window.open(url, '_blanl');
  }

  return (
    <>

      <div title='Preview' className="relative bg-[] grid border border-[1px] border-[#d8d8d8] w-107px h-[107px] cursor-pointer hover:scale-[1.05] duration-[0.3s] flex justify-center items-center">
        <img src={url} alt="" className='w-[80px] h-[100px] object-contain' onClick={() => clickHandle()} />
        <img title='delete' src="/assets/images/connection-cross.svg" onClick={() => handleDelete('projects', index)} alt="" className='w-[18px] absolute top-[0px] right-[0px]' />
      </div>


    </>
  );
}

export default ProfileUploadsCards;
