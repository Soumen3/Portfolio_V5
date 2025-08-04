import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { databases, storage } from '../appwriteConfig';
import conf from '../conf/conf';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Check if data already exists in localStorage
      const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
      const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
      
      // If data exists in localStorage, use it immediately and mark as fetched
      if (storedProjects.length > 0 || storedCertificates.length > 0) {
        setProjects(storedProjects);
        setCertificates(storedCertificates);
        setIsDataFetched(true);
        setIsLoading(false);
        return;
      }

      const {
        appwriteDatabaseId,
        appwriteProjectCollectionId,
        appwriteCertificateCollectionId,
        appwriteBucketId,
      } = conf;
      
      const databaseId = appwriteDatabaseId;
      const projectCollectionId = appwriteProjectCollectionId;
      const certificateCollectionId = appwriteCertificateCollectionId;

      // Fetch projects and certificates
      const [projectResponse, certificateResponse] = await Promise.all([
        databases.listDocuments(databaseId, projectCollectionId),
        databases.listDocuments(databaseId, certificateCollectionId)
      ]);

      // Helper to get view URL from Appwrite Storage
      const getImageUrl = (imageId) =>
        imageId
          ? storage.getFilePreview(appwriteBucketId, imageId).toString().replace("preview", "view")
          : "";

      // Map projects with image URLs
      const projectData = projectResponse.documents.map((doc) => ({
        id: doc.$id,
        ...doc,
        Img: doc.Img ? getImageUrl(doc.Img) : "",
        TechStack: doc.TechStack || [],
      }));

      // Map certificates with image URLs
      const certificateData = certificateResponse.documents.map((doc) => ({
        ...doc,
        Img: doc.Img ? getImageUrl(doc.Img) : "",
      }));

      setProjects(projectData);
      setCertificates(certificateData);

      // Store in localStorage
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
      
      setIsDataFetched(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Even on error, try to use localStorage data
      const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
      const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
      setProjects(storedProjects);
      setCertificates(storedCertificates);
      setIsDataFetched(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const contextValue = {
    projects,
    certificates,
    isLoading,
    isDataFetched,
    refetchData: fetchData,
    totalProjects: projects.length,
    totalCertificates: certificates.length
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};
