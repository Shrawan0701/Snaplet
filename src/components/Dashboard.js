import React, { useState, useEffect } from 'react';
import { Container, Alert, Nav } from 'react-bootstrap';
import UploadSection from './UploadSection';
import SearchBar from './SearchBar';
import FileCard from './FileCard';
import PaywallModal from './PaywallModal';
import api from '../services/api';
import '../Dashboard.css';

function Dashboard({ user, setUser }) {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaywall, setShowPaywall] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [folders, setFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState('all');


  useEffect(() => {
  fetchFiles();
  if (user.is_paid) {
    fetchFolders();
  }
}, [user.is_paid]);


  const fetchFiles = async (folder = 'all') => {
  try {
    const params = folder !== 'all' ? { folder } : {};
    const response = await api.get('/files', { params });
    setFiles(response.data.files);

if (!searchQuery) {
  setFilteredFiles(response.data.files);
}

  } catch (error) {
    console.error('Failed to fetch files:', error);
  } finally {
    setLoading(false);
  }
};
   
   const fetchFolders = async () => {
  try {
    const response = await api.get('/files/folders');
    setFolders(response.data.folders);
  } catch (error) {
    console.error('Failed to fetch folders:', error);
  }
};
   
   const handleFolderChange = (folderName) => {
  setActiveFolder(folderName);

  // clear search only when switching folders
  if (searchQuery) {
    setSearchQuery('');
  }

  fetchFiles(folderName);
};





  const handleFileUploaded = (newFile) => {
    setFiles([newFile, ...files]);
    setFilteredFiles([newFile, ...filteredFiles]);
    setUploadError('');

    // Update user data
    if (user && !user.is_paid) {
      setUser({
        ...user,
        free_uploads_used: user.free_uploads_used + 1
      });
    }
    if (user.is_paid) {
  fetchFolders();
}

  };

  const handleUploadError = (error) => {
    if (error.requiresPayment) {
      setShowPaywall(true);
    } else {
      setUploadError(error.message);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);

   if (!query || query.trim() === '') {
  fetchFiles(activeFolder); // reset properly
  return;
}


    setSearching(true);
    try {
      const response = await api.post('/search', { query });
      setFilteredFiles(response.data.results);
    } catch (error) {
      console.error('Search failed:', error);
      setUploadError('Search failed. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      await api.delete(`/files/${fileId}`);
      setFiles(files.filter(f => f.id !== fileId));
      setFilteredFiles(filteredFiles.filter(f => f.id !== fileId));
    } catch (error) {
      console.error('Failed to delete file:', error);
      setUploadError('Failed to delete file');
    }
    if (user.is_paid) {
  fetchFolders();
}

  };

  const handleMoveFile = async (fileId, newFolder) => {
  try {
    await api.put(`/files/${fileId}/folder`, { folder: newFolder });
    fetchFiles(activeFolder);
    fetchFolders();
  } catch (error) {
    console.error('Failed to move file:', error);
    setUploadError('Failed to move file');
  }
};


  const handlePaymentSuccess = () => {
    setShowPaywall(false);
    setUser({ ...user, is_paid: true });
    setUploadError('');
    fetchFolders();

  };

  const remainingUploads = user.is_paid
    ? 'Unlimited'
    : `${5 - user.free_uploads_used} / 5`;

  if (loading) {
    return (
      <Container className="dashboard-container text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }
  const DEFAULT_FOLDERS = [
  'education',
  'general',
  'health',
  'jobs',
  'payments',
  'personal',
  'receipts',
  'travel'
];


  return (
    <Container className="dashboard-container">
     

      {uploadError && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setUploadError('')}
        >
          {uploadError}
        </Alert>
      )}

      <UploadSection
        onFileUploaded={handleFileUploaded}
        onUploadError={handleUploadError}
        isPaid={user.is_paid}
      />

      <SearchBar
        onSearch={handleSearch}
        searching={searching}
      />

     {user.is_paid && (

  <Nav variant="pills" className="mb-3">
    <Nav.Item>
      <Nav.Link
        active={activeFolder === 'all'}
        onClick={() => handleFolderChange('all')}
      >
        All
      </Nav.Link>
    </Nav.Item>

    {(folders.length > 0 ? folders.map(f => f.folder_name) : DEFAULT_FOLDERS).map(folderName => (
  <Nav.Item key={folderName}>
    <Nav.Link
      active={activeFolder === folderName}
      onClick={() => handleFolderChange(folderName)}
    >
       {folderName.charAt(0).toUpperCase() + folderName.slice(1)}
    </Nav.Link>
  </Nav.Item>
))}

  </Nav>
)}


      {filteredFiles.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"></div>
          <h3>
            {searchQuery ? 'No files found' : 'No files uploaded yet'}
          </h3>
          <p className="text-muted">
            {searchQuery
              ? 'Try a different search query'
              : 'Upload your first screenshot or document to get started'}
          </p>
        </div>
      ) : (
        <div className="files-grid">
          {filteredFiles.map(file => (
            <FileCard
  key={file.id}
  file={file}
  onDelete={handleDeleteFile}
  onMove={handleMoveFile}
  folders={folders}
  isPaid={user.is_paid}
/>

          ))}
        </div>
      )}

      <PaywallModal
        show={showPaywall}
        onHide={() => setShowPaywall(false)}
        userCountry={user.country}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </Container>
  );
}

export default Dashboard;