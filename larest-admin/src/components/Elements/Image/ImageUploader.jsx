import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { Button } from '@mui/joy';
import { VisuallyHiddenInput } from '../Input/VisuallyHiddenInput';

function ImageUploader({ src, name, props, className }) {
  const [image, setImage] = useState(null);

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="flex items-center mx-5 gap-3">
        <div className="">
          <p className='text-sm font-bold'>Menu picture</p>
          <p className='text-sm font-bold'>Max size: 5MB</p>
        </div>
        <div className="relative border border-zinc-300 w-[175px] h-[175px]">
          {image == null && src == null ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <FaCamera className="text-gray-500 text-4xl" />
            </div>
          ) : (
            <img
              src={image == null ? src : image}
              className="object-cover w-full h-full"
              alt="Event"
            />
          )}
        </div>

      </div>

      <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="outlined"
        color="neutral"
        startDecorator={<MdOutlineCloudUpload />}
        sx={{ mt: 1 }}
        fullWidth
      >
        Upload a picture
        <VisuallyHiddenInput
          {...props}
          accept="image/*"
          onChange={(event) => {
            setImage(URL.createObjectURL(event.target.files[0]));
          }}
          name={name ? name : 'image'}
          type="file"
        />
      </Button>
    </div>
  );
}

export default ImageUploader;
