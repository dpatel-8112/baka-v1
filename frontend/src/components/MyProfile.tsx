import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  TextField,
  Button,
  Typography,
  Chip,
  Stack,
  Avatar,
  IconButton,
  InputAdornment,
  Paper,
  Divider,
  styled,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import InfoIcon from "@mui/icons-material/Info";
import InterestsIcon from "@mui/icons-material/Interests";
import SchoolIcon from "@mui/icons-material/School";
import LanguageIcon from "@mui/icons-material/Language";
import LinkIcon from "@mui/icons-material/Link";
import ProfileCard from "./home/ProfileCard";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Profile } from "../types/index";
import ProfileBasicInfoSection from "./my-profile/ProfileBasicInfoSection";
import ProfileProfessionalInfoSection from "./my-profile/ProfileProfessionalInfoSection";
import ProfileAboutSection from "./my-profile/ProfileAboutSection";
import ProfilePhotosSection from "./my-profile/ProfilePhotosSection";
import ProfileInterestsSection from "./my-profile/ProfileInterestsSection";
import ProfileSkillsSection from "./my-profile/ProfileSkillsSection";
import { fetchMyProfile, updateMyProfile } from "../services/api";
import ProfileLanguagesSection from "./my-profile/ProfileLanguagesSection";
import ProfileSocialLinksSection from "./my-profile/ProfileSocialLinksSection";
import { useAuth } from "../contexts/AuthContext";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const emptyProfile: Profile = {
  id: "1",
  name: "Sarah Johnson",
  age: 28,
  role: "Software Engineer",
  department: "Engineering",
  company: "Tech Corp",
  image: "https://picsum.photos/id/7/600/600",
  photos: [
    {
      id: 1,
      url: "https://picsum.photos/id/1/800/800",
      description: "",
      profilePicture: false,
    },
    {
      id: 2,
      url: "https://picsum.photos/id/2/800/800",
      description: "",
      profilePicture: false,
    },
    {
      id: 3,
      url: "https://picsum.photos/id/3/800/800",
      description: "",
      profilePicture: false,
    },
    {
      id: 4,
      url: "https://picsum.photos/id/4/800/800",
      description: "",
      profilePicture: false,
    },
    {
      id: 5,
      url: "https://picsum.photos/id/5/800/800",
      description: "",
      profilePicture: false,
    },
    {
      id: 6,
      url: "https://picsum.photos/id/6/800/800",
      description: "",
      profilePicture: false,
    },
  ],
  bio: "Passionate about building scalable applications and solving complex problems. Love hiking and photography in my free time.",
  aboutMe:
    "I am a full-stack developer with a passion for creating user-friendly applications. When I'm not coding, you can find me exploring hiking trails or capturing beautiful landscapes with my camera.",
  location: "San Francisco, CA",
  education: "MS Computer Science, Stanford",
  yearsOfExperience: 5,
  compatibilityScore: 95,
  interests: [
    "Machine Learning",
    "Cloud Computing",
    "UI/UX Design",
    "Photography",
    "Hiking",
    "Travel",
  ],
  skills: [
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "TypeScript",
    "GraphQL",
    "MongoDB",
  ],
  email: "sarah.johnson@techcorp.com",
  phone: "+1 (555) 123-4567",
  gender: "Female",
  birthday: "1995-06-15",
  languages: ["English", "Spanish", "French"],
  socialLinks: [
    { type: "linkedin", url: "https://linkedin.com/in/sarahjohnson" },
    { type: "github", url: "https://github.com/sarahjohnson" },
    { type: "twitter", url: "https://twitter.com/sarahjohnson" },
    { type: "website", url: "https://sarahjohnson.dev" },
  ],
  projects: [
    {
      name: "AI-Powered Task Manager",
      description:
        "A smart task management application that uses AI to prioritize and organize tasks.",
      link: "https://github.com/sarahjohnson/ai-task-manager",
    },
    {
      name: "Cloud Infrastructure Dashboard",
      description:
        "Real-time monitoring and management dashboard for cloud resources.",
      link: "https://github.com/sarahjohnson/cloud-dashboard",
    },
  ],
  isVerified: true,
};

const sectionPaper = {
  p: { xs: 2, md: 3 },
  borderRadius: 3,
  boxShadow: 1,
  bgcolor: "white",
  mb: 3,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
}));

const MyProfile: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({ ...emptyProfile });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [interestInput, setInterestInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [socialLinkInput, setSocialLinkInput] = useState({ type: "", url: "" });
  const [projectInput, setProjectInput] = useState({
    name: "",
    description: "",
    link: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetchMyProfile()
      .then((res) => {
        setProfile(res.data as Profile);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError("Failed to load profile");
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await updateMyProfile(profile);
      setSuccess('Profile updated!');
      setOpenSnackbar(true);
    } catch (e) {
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // Handle image upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newPhotos = files.map((file, idx) => ({
        id: Date.now() + idx,
        url: URL.createObjectURL(file),
        description: "",
        profilePicture: false,
      }));
      setProfile((prev) => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos],
      }));
      if (newPhotos.length > 0 && !profile.image) {
        setProfile((prev) => ({ ...prev, image: newPhotos[0].url }));
      }
    }
  };

  // Remove photo
  const handleRemovePhoto = (index: number) => {
    setProfile((prev) => {
      const newPhotos = prev.photos.filter((_, i) => i !== index);
      return {
        ...prev,
        photos: newPhotos,
        image: newPhotos[0]?.url || "",
      };
    });
  };

  // Add interest
  const handleAddInterest = () => {
    if (interestInput.trim()) {
      setProfile((prev) => ({
        ...prev,
        interests: [...(prev.interests || []), interestInput.trim()],
      }));
      setInterestInput("");
    }
  };

  // Add skill
  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setProfile((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  // Add language
  const handleAddLanguage = () => {
    if (languageInput.trim()) {
      setProfile((prev) => ({
        ...prev,
        languages: [...(prev.languages || []), languageInput.trim()],
      }));
      setLanguageInput("");
    }
  };

  // Add social link
  const handleAddSocialLink = () => {
    if (socialLinkInput.type && socialLinkInput.url) {
      setProfile((prev) => ({
        ...prev,
        socialLinks: [...(prev.socialLinks || []), { ...socialLinkInput }],
      }));
      setSocialLinkInput({ type: "", url: "" });
    }
  };

  // Add project
  const handleAddProject = () => {
    if (projectInput.name && projectInput.description) {
      setProfile((prev) => ({
        ...prev,
        projects: [...(prev.projects || []), { ...projectInput }],
      }));
      setProjectInput({ name: "", description: "", link: "" });
    }
  };

  // Add a function to calculate age from birthday
  const calculateAge = (birthday: string) => {
    if (!birthday) return 0;
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ p: { xs: 1, md: 4 }, minHeight: "100vh", bgcolor: "#f6f8fb" }}>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {success}
        </MuiAlert>
      </Snackbar>

      <Grid
        container
        spacing={4}
        alignItems="flex-start"
        sx={{
          maxHeight: { md: "calc(100vh - 64px)" },
          overflowY: { md: "auto" },
        }}
      >
        {/* Left: Form Sections */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Item>
            {/* Basic Info */}
            <ProfileBasicInfoSection
              profile={profile}
              setProfile={setProfile}
              calculateAge={calculateAge}
            />
            {/* Professional Info */}
            <ProfileProfessionalInfoSection
              profile={profile}
              setProfile={setProfile}
            />
            {/* About */}
            <ProfileAboutSection profile={profile} setProfile={setProfile} />
            {/* Photos */}
            <ProfilePhotosSection
              profile={profile}
              setProfile={setProfile}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            {/* Interests */}
            <ProfileInterestsSection
              profile={profile}
              setProfile={setProfile}
            />
            {/* Skills */}
            <ProfileSkillsSection profile={profile} setProfile={setProfile} />
            {/* Languages */}
            <ProfileLanguagesSection
              profile={profile}
              setProfile={setProfile}
            />
            {/* Social Links */}
            <ProfileSocialLinksSection
              profile={profile}
              setProfile={setProfile}
            />
          </Item>
        </Grid>
        {/* Right: Live Preview */}
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            position: { md: "sticky" },
            top: { md: 0 },
            alignSelf: { md: "flex-start" },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              textAlign: "center",
              letterSpacing: 1,
            }}
          >
            Live Preview
          </Typography>
          <Paper
            elevation={4}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 3,
              bgcolor: "transparent",
              minHeight: 400,
              boxShadow: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ProfileCard profile={profile} selectedImage={selectedImage} />
          </Paper>
          {/* Save Button - align full width and container */}
          <Grid container justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={saving}
              sx={{ mb: 2, width: "90%", padding: 1.5, fontSize: 16 }}
            >
              {saving ? "Saving..." : "Save Profile"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyProfile;
