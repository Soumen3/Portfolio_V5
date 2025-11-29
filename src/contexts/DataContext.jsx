import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { databases, storage } from '../appwriteConfig';
import conf from '../conf/conf';

const DataContext = createContext();

// Cache expiration time in milliseconds (5 minutes)
const CACHE_EXPIRATION_TIME = 5 * 60 * 1000;

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

  const fetchData = useCallback(async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      
      // Check if cached data exists and is still valid
      const cachedProjects = localStorage.getItem("projects");
      const cachedCertificates = localStorage.getItem("certificates");
      const cacheTimestamp = localStorage.getItem("dataCacheTimestamp");
      
      const isCacheValid = cacheTimestamp && 
        (Date.now() - parseInt(cacheTimestamp)) < CACHE_EXPIRATION_TIME;
      
      // Use cached data immediately for faster initial load (but still fetch fresh data)
      if (!forceRefresh && cachedProjects && cachedCertificates && isCacheValid) {
        const storedProjects = JSON.parse(cachedProjects);
        const storedCertificates = JSON.parse(cachedCertificates);
        setProjects(storedProjects);
        setCertificates(storedCertificates);
        setIsDataFetched(true);
        setIsLoading(false);
        return;
      }
      
      // If cache exists but expired, show cached data first while fetching new data
      if (cachedProjects && cachedCertificates && !isCacheValid) {
        const storedProjects = JSON.parse(cachedProjects);
        const storedCertificates = JSON.parse(cachedCertificates);
        setProjects(storedProjects);
        setCertificates(storedCertificates);
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

      // Fetch projects and certificates from database
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

      // Store in localStorage with timestamp
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
      localStorage.setItem("dataCacheTimestamp", Date.now().toString());
      
      setIsDataFetched(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      // On error, try to use localStorage data as fallback
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

  // Function to clear cache and force refresh
  const clearCacheAndRefresh = useCallback(async () => {
    localStorage.removeItem("projects");
    localStorage.removeItem("certificates");
    localStorage.removeItem("dataCacheTimestamp");
    await fetchData(true);
  }, [fetchData]);

  const contextValue = {
    projects,
    certificates,
    isLoading,
    isDataFetched,
    refetchData: () => fetchData(true), // Always force refresh when manually called
    clearCacheAndRefresh,
    totalProjects: projects.length,
    totalCertificates: certificates.length
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};
