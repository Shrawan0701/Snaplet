import React, { useState, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../services/api';
import '../UploadSection.css';

function UploadSection({ onFileUploaded, onUploadError, isPaid, folders }) {
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFolder, setSelectedFolder] = useState('');


  const handleFileSelect = async (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      onUploadError({
        message: 'Invalid file type. Only JPG, PNG, PDF, and DOCX files are allowed.'
      });
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      onUploadError({ message: 'File size must be less than 10MB' });
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    if (isPaid && selectedFolder) {
  formData.append('folder', selectedFolder);
}


    try {
      const response = await api.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      onFileUploaded(response.data.file);
      setSelectedFolder('');

    } catch (error) {
      if (error.response?.data?.requiresPayment) {
        onUploadError({
          requiresPayment: true,
          message: error.response.data.message
        });
      } else {
        onUploadError({
          message: error.response?.data?.error || 'Upload failed'
        });
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  return (
    <div className="upload-section">
      <h4 className="mb-3">Upload Files</h4>
      {isPaid && folders && folders.length > 0 && (
  <Form.Select
    value={selectedFolder}
    onChange={(e) => setSelectedFolder(e.target.value)}
    className="mb-3"
    size="sm"
    style={{ maxWidth: '250px' }}
  >
    <option value="">Auto-detect folder</option>
    {folders.map(folder => (
      <option key={folder.folder_name} value={folder.folder_name}>
        {folder.folder_name}
      </option>
    ))}
  </Form.Select>
)}


      <div
        className={`upload-dropzone ${dragging ? 'dragging' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="fs-1 mb-3"></div>

        <h5>Drop your file here or click to browse</h5>

        <p className="text-muted mb-3">
          Supported: JPG, PNG, PDF (Max 10MB)
        </p>

        {uploading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Uploading...</span>
          </div>
        ) : (
          <Button variant="primary" className="btn-gradient">
            Choose File
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="file-input"
        accept=".jpg,.jpeg,.png,.pdf,.docx"
        onChange={(e) => handleFileSelect(e.target.files[0])}
        disabled={uploading}
      />
    </div>
  );
}

export default UploadSection;