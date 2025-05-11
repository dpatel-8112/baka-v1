import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  Alert,
} from '@mui/material';
import { Notifications as NotificationsIcon, Lock as LockIcon } from '@mui/icons-material';

interface SettingsProps {
  onSave: (settings: SettingsData) => void;
  initialSettings?: SettingsData;
}

interface SettingsData {
  emailNotifications: boolean;
  pushNotifications: boolean;
  profileVisibility: boolean;
  showOnlineStatus: boolean;
}

const Settings: React.FC<SettingsProps> = ({ onSave, initialSettings }) => {
  const [settings, setSettings] = useState<SettingsData>(
    initialSettings || {
      emailNotifications: true,
      pushNotifications: true,
      profileVisibility: true,
      showOnlineStatus: true,
    }
  );
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleChange = (setting: keyof SettingsData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSettings((prev) => ({
      ...prev,
      [setting]: event.target.checked,
    }));
  };

  const handleSave = (): void => {
    onSave(settings);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Settings
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <NotificationsIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">Notifications</Typography>
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={settings.emailNotifications}
                onChange={handleChange('emailNotifications')}
                color="primary"
              />
            }
            label="Email Notifications"
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.pushNotifications}
                onChange={handleChange('pushNotifications')}
                color="primary"
              />
            }
            label="Push Notifications"
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LockIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">Privacy</Typography>
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={settings.profileVisibility}
                onChange={handleChange('profileVisibility')}
                color="primary"
              />
            }
            label="Profile Visibility"
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.showOnlineStatus}
                onChange={handleChange('showOnlineStatus')}
                color="primary"
              />
            }
            label="Show Online Status"
          />
        </CardContent>
      </Card>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 4,
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default Settings; 