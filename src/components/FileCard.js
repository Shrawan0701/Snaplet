import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import '../FileCard.css';

function FileCard({ file, onDelete, onMove, folders, isPaid }) {
  const [showDelete, setShowDelete] = useState(false);

  const BACKEND_URL = 'http://localhost:5000';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isImage = file.file_type.startsWith('image/');
  const isPDF = file.file_type === 'application/pdf';
  const isDOCX =
    file.file_type ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  // ✅ FINAL resolved URL
  const resolvedUrl = isImage
    ? file.file_url
    : `${BACKEND_URL}${file.file_url}`;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this file?')) {
      onDelete(file.id);
    }
  };

  const handleMove = (e, folderName) => {
  e.stopPropagation();
  if (file.folder !== folderName) {
    onMove(file.id, folderName);
  }
};


  const handleClick = () => {
    window.open(resolvedUrl, '_blank');
  };

  const getFolderIcon = (folderName) => {
  const folder = folders?.find(f => f.folder_name === folderName);
  return folder?.icon || '';
};


  return (
    <div
      className="file-card position-relative"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      onClick={handleClick}
    >
      {showDelete && (
  <div className="file-card-actions">
    <button
      className="delete-btn"
      onClick={handleDelete}
      title="Delete file"
    >
      Delete
    </button>

    {isPaid && folders && folders.length > 0 && (
      <Dropdown onClick={(e) => e.stopPropagation()}>
        <Dropdown.Toggle
          variant="light"
          size="sm"
          className="move-btn"
        >
          Move
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {folders.map(folder => (
            <Dropdown.Item
              key={folder.folder_name}
              active={file.folder === folder.folder_name}
              onClick={(e) => handleMove(e, folder.folder_name)}
            >
              {folder.folder_name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    )}
  </div>
)}


      {isImage ? (
        <img
          src={resolvedUrl}
          alt={file.file_name}
          className="file-thumbnail"
        />
      ) : (
        <div className="file-icon-container">
          {isPDF ? '📄' : isDOCX ? '📝' : '📋'}
        </div>
      )}

      <div className="file-info">
        {isPaid && file.folder && (
  <div className="file-folder-badge">
    {getFolderIcon(file.folder)} {file.folder}
  </div>
)}

        <div className="file-name" title={file.file_name}>
          {file.file_name}
        </div>

        <div className="file-date">
          {formatDate(file.created_at)}
        </div>

        {file.keywords?.length > 0 && (
          <>
            <div className="text-muted small mt-2">
              Detected keywords:
            </div>
            <div className="file-keywords">
              {file.keywords.map((keyword, index) => (
                <span key={index} className="keyword-badge">
                  {keyword}
                </span>
              ))}
            </div>
          </>
        )}

        <a
          href={resolvedUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          View
        </a>
      </div>
    </div>
  );
}

export default FileCard;
