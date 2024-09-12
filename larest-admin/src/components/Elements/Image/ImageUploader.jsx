import { Button, FormLabel } from '@mui/joy';
import { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { VisuallyHiddenInput } from '../Input/VisuallyHiddenInput';
import PropTypes from 'prop-types';

function ImageUploader({ src, name, props, className }) {
  const [image, setImage] = useState(null);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <FormLabel>Image</FormLabel>
      <div className="relative flex items-center justify-center gap-3 border border-gray-300  rounded-lg">
        <div className="relative  w-[175px] h-[175px]">
          {image == null && src == null ? (
            <div className="flex items-center justify-center w-full h-full">
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
        <p className='text-[11px] font-semibold absolute bottom-0 right-0 mb-2 mr-2 text-danger'>Max size: 5MB</p>  
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

ImageUploader.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  props: PropTypes.object,
  className: PropTypes.string,
};

export default ImageUploader;
