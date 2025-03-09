import { useState } from 'react';
import axios from 'axios';

const FileDownload = () => {
  const [fileId, setFileId] = useState("");

  const handleDownload = async () => {
    if (!fileId) {
      alert("Please enter a file ID.");
      return;
    }

    try {
      const response = await axios.get(`https://localhost:7003/api/documents/download/${fileId}`, {
        responseType: 'blob', // Important
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `document-${fileId}.pdf`);
      document.body.appendChild(link);

      link.click();

      // Check if link has a parent before removing
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      } else {
        console.warn("Link has no parent node.");
      }
    } catch (error) {
      console.error(error);
      alert("Error downloading file.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter file ID"
        value={fileId}
        onChange={(e) => setFileId(e.target.value)}
      />
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default FileDownload;
