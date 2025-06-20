import React, { useEffect, useState, useCallback } from "react";
import { databases, storage } from "../appwriteConfig";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";
import conf from "../conf/conf";
import useMediaQuery from "@mui/material/useMediaQuery";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// Categorized tech stacks
const techStackCategories = [
  {
    label: "Frontend",
    stacks: [
      { icon: "html.svg", language: "HTML" },
      { icon: "css.svg", language: "CSS" },
      { icon: "tailwind.svg", language: "Tailwind CSS" },
      { icon: "reactjs.svg", language: "ReactJS" },
      { icon: "vite.svg", language: "Vite" },
    ],
  },
  {
    label: "Backend",
    stacks: [
      { icon: "django.svg", language: "Django" },
      { icon: "mongodb.svg", language: "Mongodb" },
      { icon: "mysql.svg", language: "Mysql" },
      { icon: "postgresql.svg", language: "PostgreSql" },
      { icon: "redis.svg", language: "Redis" },
    ],
  },
  {
    label: "Programming Languages",
    stacks: [
      { icon: "python.svg", language: "Python" },
      { icon: "c_plus_plus.svg", language: "C++" },
      { icon: "sql.svg", language: "SQL" },
      { icon: "javascript.svg", language: "JavaScript" },
      { icon: "c.svg", language: "C Programming" },
    ],
  },
  {
    label: "Cloud Computing",
    stacks: [
      { icon: "aws.svg", language: "AWS" },
      { icon: "vercel.svg", language: "Vercel" },
      { icon: "appwrite.svg", language: "Appwrite" },
    ]
  },
  {
    label: "DevOps & Tools",
    stacks: [
      { icon: "docker.svg", language: "Docker" },
      { icon: "git.svg", language: "Git" },
      { icon: "github.svg", language: "Github" },
      { icon: "postman.svg", language: "Postman" },
      { icon: "numpy.svg", language: "Numpy" },
      { icon: "pandas.svg", language: "Pandas" },
    ],
  },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
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
      const projectResponse = await databases.listDocuments(
        databaseId,
        projectCollectionId
      );
      const certificateResponse = await databases.listDocuments(
        databaseId,
        certificateCollectionId
      );

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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              // Existing styles remain unchanged
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
          disabled={isMobile} // <-- Disable swipe on mobile, only allow tab click
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div
                className="flex flex-row gap-5 overflow-x-auto whitespace-nowrap pb-4 custom-scrollbar"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {projects.map((project, index) => (
                  <div
                    key={project.id || index}
                    className="inline-block"
                    style={{
                      minWidth: isMobile ? '85vw' : 380,
                      maxWidth: isMobile ? '85vw' : 380
                    }}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                      imgStyle={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "16px" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div
                className="flex flex-row gap-5 overflow-x-auto whitespace-nowrap pb-4 custom-scrollbar"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {certificates.map((certificate, index) => (
                  <div
                    key={index}
                    className="inline-block"
                    style={{ minWidth: 340, maxWidth: 340 }}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate
                      ImgSertif={certificate.Img}
                      Title={certificate.Title}
                      imgStyle={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "16px" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex flex-col justify-center items-center overflow-hidden pb-[5%]">
              <div
                className="overflow-x-auto custom-scrollbar w-full"
                style={{ WebkitOverflowScrolling: "touch", overflowY: "hidden" }}
              >
                <div className="flex flex-row gap-10 min-w-max">
                  {techStackCategories.map((category, idx) => (
                    <div key={category.label} className="flex flex-col items-center min-w-[180px]">
                      <h4 className="text-lg font-semibold text-slate-200 mb-3">{category.label}</h4>
                      <div
                        className="grid grid-rows-2 grid-flow-col gap-5 md:gap-8"
                        style={{ minHeight: 180 }}
                      >
                        {category.stacks.map((stack, index) => (
                          <div
                            key={stack.language}
                            data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                            data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                          >
                            <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>

      {/* Add custom scrollbar styles (if not already present) */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5);
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 6px;
        }
        .custom-scrollbar {
          overflow-y: hidden !important;
        }
      `}</style>
    </div>
  );
}