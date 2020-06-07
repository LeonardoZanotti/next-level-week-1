import React, { useCallback, useState } from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload, FiArrowDown } from 'react-icons/fi';

import './styles.css';

interface Props {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');
        
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
            onDrop,
            accept: 'image/*'
        })

    if (selectedFileUrl === '') {
        setSelectedFileUrl('https://images.unsplash.com/photo-1543083477-4f785aeafaa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
    }

    return (
        <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} accept='image/*' />
        
        {
            selectedFileUrl
            ?
                <img src={selectedFileUrl} alt="Point thumbnail" />
            :
                isDragActive 
                ?
                    <p>
                        <FiArrowDown />
                        Drop the files here ...
                    </p>
                :
                    <p>
                        <FiUpload />
                        Drag and drop some files here, or click to select files
                    </p>
                  
        }
        </div>
  )
}

export default Dropzone;