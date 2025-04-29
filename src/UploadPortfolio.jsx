// src/UploadPortfolio.jsx
import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase/firebase'; // No need for Firebase Storage anymore
import styles from './assets/css/upload.module.css'; // Your CSS file

const UploadPortfolio = () => {
  const [projectImage, setProjectImage] = useState(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectAbout, setProjectAbout] = useState('');
  const [projectTags, setProjectTags] = useState('');
  const [projectLiveLink, setProjectLiveLink] = useState('');
  const [projectSourceLink, setProjectSourceLink] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectImage) {
      alert('Please upload an image!');
      return;
    }

    setIsUploading(true);

    try {
      // 1. Upload the image to the Express server
      const formData = new FormData();
      formData.append('projectImage', projectImage);

      const uploadResponse = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadData.message || 'Image upload failed.');
      }

      const imageName = uploadData.filename; // e.g., 1714337291547-myproject.png

      // 2. Save project details to Firestore (saving only imageName)
      await addDoc(collection(db, 'projects'), {
        title: projectTitle,
        about: projectAbout,
        tags: projectTags.split(',').map(tag => tag.trim()),
        liveLink: projectLiveLink,
        sourceLink: projectSourceLink,
        imageName, // Save only the image name
        createdAt: serverTimestamp(),
      });

      alert('Project uploaded successfully! ✅✅');

      // 3. Reset form
      e.target.reset();
      setProjectImage(null);
      setProjectTitle('');
      setProjectAbout('');
      setProjectTags('');
      setProjectLiveLink('');
      setProjectSourceLink('');
    } catch (error) {
      console.error('Error uploading project:', error);
      alert(`❌ Error uploading project: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles['body_s']}>
      <div className={styles['upload-form']}>
        <h1>Add New Project 🚀</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProjectImage(e.target.files[0])}
            required
          />
          <input
            type="text"
            placeholder="Project Title"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="About the project..."
            value={projectAbout}
            onChange={(e) => setProjectAbout(e.target.value)}
            required
          ></textarea>
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={projectTags}
            onChange={(e) => setProjectTags(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="Live Page Link"
            value={projectLiveLink}
            onChange={(e) => setProjectLiveLink(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="Source Code Link"
            value={projectSourceLink}
            onChange={(e) => setProjectSourceLink(e.target.value)}
            required
          />
          <button
            type="submit"
            className={styles['submit-btn']}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading 🔄...' : 'Upload Project ✨'}
          </button>
        </form>
      </div>

      <div className={styles['projects']}>
        {/* Later, you can load and display your projects here */}
      </div>
    </div>
  );
};

export default UploadPortfolio;
