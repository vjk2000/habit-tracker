import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  Fade,
  InputAdornment,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import {
  Add as AddIcon,
  Clear as ClearIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  CalendarToday as CalendarIcon,
  TipsAndUpdates as TipsIcon
} from "@mui/icons-material";
import { addHabit } from "../store/habit-slice";
import { AppDispatch } from "../store/store";

const AddHabitForm: React.FC = () => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const [showSuccess, setShowSuccess] = useState(false);
  const [nameError, setNameError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  // Predefined habit suggestions
  const habitSuggestions = [
    { name: "Drink 8 glasses of water", icon: "💧", category: "Health" },
    { name: "Read for 30 minutes", icon: "📚", category: "Learning" },
    { name: "Exercise for 30 minutes", icon: "🏃", category: "Fitness" },
    { name: "Meditate for 10 minutes", icon: "🧘", category: "Mindfulness" },
    { name: "Write in journal", icon: "✍️", category: "Reflection" },
    { name: "Take a walk", icon: "🚶", category: "Health" },
    { name: "Practice gratitude", icon: "🙏", category: "Mindfulness" },
    { name: "Learn something new", icon: "🎓", category: "Learning" }
  ];

  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError("Habit name is required");
      return false;
    }
    if (value.trim().length < 3) {
      setNameError("Habit name must be at least 3 characters");
      return false;
    }
    if (value.trim().length > 50) {
      setNameError("Habit name must be less than 50 characters");
      return false;
    }
    setNameError("");
    return true;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (nameError) {
      validateName(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateName(name)) {
      return;
    }

    dispatch(addHabit({ name: name.trim(), frequency }));
    setName("");
    setNameError("");
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSuggestionClick = (suggestionName: string) => {
    setName(suggestionName);
    setNameError("");
  };

  const clearForm = () => {
    setName("");
    setFrequency("daily");
    setNameError("");
  };

  

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 4, 
        mt: 3, 
        borderRadius: 3,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)'
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              mb: 1,
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Create New Habit
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              opacity: 0.9,
              color: 'white',
              maxWidth: 500,
              mx: 'auto'
            }}
          >
            Start building a better version of yourself, one habit at a time
          </Typography>
        </Box>

        {/* Success Overlay */}
        <Fade in={showSuccess}>
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              backdropFilter: 'blur(4px)'
            }}
          >
            <Card
              elevation={8}
              sx={{
                maxWidth: 400,
                mx: 2,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                color: 'white',
                transform: showSuccess ? 'scale(1)' : 'scale(0.8)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  <CheckCircleIcon 
                    sx={{ 
                      fontSize: 48, 
                      color: 'white',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                    }} 
                  />
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 1,
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                  }}
                >
                  Success! 🎉
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    opacity: 0.95,
                    lineHeight: 1.6
                  }}
                >
                  Your habit has been created successfully!<br />
                  Keep building those good habits!
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Fade>

        {/* Main Content Grid */}
        <Grid container spacing={4} alignItems="flex-start">
          {/* Left Side - Form */}
          <Grid item xs={12} md={6}>
            <Card 
              elevation={0} 
              sx={{ 
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 3,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 2,
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <AddIcon /> Habit Details
                </Typography>
                
                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <TextField
                      label="Habit Name"
                      value={name}
                      onChange={handleNameChange}
                      onBlur={() => validateName(name)}
                      placeholder="e.g., Drink 8 glasses of water"
                      fullWidth
                      error={!!nameError}
                      helperText={nameError || `${name.length}/50 characters`}
                      InputProps={{
                        endAdornment: name && (
                          <InputAdornment position="end">
                            <Tooltip title="Clear">
                              <IconButton
                                onClick={() => {
                                  setName("");
                                  setNameError("");
                                }}
                                size="small"
                              >
                                <ClearIcon />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        )
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />

                    <FormControl fullWidth>
                      <InputLabel>Frequency</InputLabel>
                      <Select
                        value={frequency}
                        label="Frequency"
                        onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="daily">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarIcon sx={{ fontSize: 18 }} />
                            Daily
                          </Box>
                        </MenuItem>
                        <MenuItem value="weekly">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ScheduleIcon sx={{ fontSize: 18 }} />
                            Weekly
                          </Box>
                        </MenuItem>
                      </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={!name.trim() || !!nameError}
                        startIcon={<AddIcon />}
                        sx={{
                          borderRadius: 2,
                          fontWeight: 600,
                          flex: 1,
                          py: 1.5,
                          background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Create Habit
                      </Button>
                      
                      <Button
                        variant="outlined"
                        onClick={clearForm}
                        disabled={!name && frequency === "daily"}
                        sx={{
                          borderRadius: 2,
                          fontWeight: 600,
                          px: 3
                        }}
                      >
                        Clear
                      </Button>
                    </Box>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Side - Suggestions */}
          <Grid item xs={12} md={6}>
            <Card 
              elevation={0} 
              sx={{ 
                background: 'transparent',
                borderRadius: 0,
                border: 'none',
                boxShadow: 'none'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2, 
                    fontWeight: 600, 
                    color: 'White',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  ⚡ Quick Suggestions
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {habitSuggestions.map((suggestion, index) => (
                    <Chip
                      key={index}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <span style={{ fontSize: '14px' }}>{suggestion.icon}</span>
                          <span style={{ fontSize: '13px' }}>{suggestion.name}</span>
                        </Box>
                      }
                      onClick={() => handleSuggestionClick(suggestion.name)}
                      variant="outlined"
                      size="small"
                      sx={{
                        borderRadius: 2,
                        backgroundColor: 'rgba(102, 126, 234, 0.05)',
                        borderColor: 'rgba(102, 126, 234, 0.2)',
                        color: 'pink',
                        '&:hover': {
                          backgroundColor: 'rgba(102, 126, 234, 0.15)',
                          borderColor: 'rgba(102, 126, 234, 0.4)',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 2px 8px rgba(102, 126, 234, 0.2)'
                        },
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

        </Grid>

        {/* Tips Section - Full Width Below */}
        <Box sx={{ mt: 4 }}>
          <Card 
            elevation={0} 
            sx={{ 
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: 3,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 2, 
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <TipsIcon /> Tips for Success
              </Typography>
              <Grid container spacing={2}>
                {[
                  "Start small and be specific",
                  "Be consistent every day", 
                  "Track your progress",
                  "Celebrate small wins"
                ].map((tip, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        color: 'text.secondary',
                        fontSize: '0.9rem',
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: 'rgba(102, 126, 234, 0.03)',
                        border: '1px solid rgba(102, 126, 234, 0.1)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(102, 126, 234, 0.08)',
                          transform: 'translateY(-1px)'
                        }
                      }}
                    >
                      <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
                      {tip}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Paper>
  );
};

export default AddHabitForm;