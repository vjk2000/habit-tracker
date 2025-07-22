import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Badge
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  LocalFireDepartment as FireIcon,
//   Settings as SettingsIcon,
  Notifications as NotificationsIcon
} from "@mui/icons-material";
import { RootState, AppDispatch } from "../store/store";
import { fetchHabits, Habit } from "../store/habit-slice";

const HabitTrackerHeader: React.FC = () => {
  const { habits, isLoading } = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch<AppDispatch>();
  
  const currentDate = new Date();
  const today = currentDate.toISOString().split("T")[0];
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    if (habits.length === 0 && !isLoading) {
      dispatch(fetchHabits());
    }
  }, [dispatch, habits.length, isLoading]);

  // Calculate completion stats
  const getTotalHabits = () => habits.length;
  
  const getCompletedToday = () => {
    return habits.filter((habit) => habit.completedDates.includes(today)).length;
  };

  const getCompletionPercentage = () => {
    const total = getTotalHabits();
    const completed = getCompletedToday();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const getLongestCurrentStreak = () => {
    const getStreak = (habit: Habit) => {
      let streak = 0;
      const currentDate = new Date();

      while (true) {
        const dateString = currentDate.toISOString().split("T")[0];
        if (habit.completedDates.includes(dateString)) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }

      return streak;
    };

    return Math.max(...habits.map(getStreak), 0);
  };

  const getNotificationCount = () => {
    // Count habits not completed today
    const total = getTotalHabits();
    const completed = getCompletedToday();
    return total - completed;
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            {/* Logo and Title */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                  width: 48,
                  height: 48,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: 'white',
                    background: 'linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '0.5px'
                  }}
                >
                  Habit Tracker
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: 500,
                    mt: -0.5
                  }}
                >
                  {formattedDate}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Stats and Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Quick Stats */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
              <Chip
                icon={<FireIcon sx={{ fontSize: 16, color: 'orange' }} />}
                label={`${getLongestCurrentStreak()} Day Streak`}
                variant="outlined"
                size="small"
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  '& .MuiChip-icon': {
                    color: 'orange'
                  }
                }}
              />
              <Chip
                icon={<TrendingUpIcon sx={{ fontSize: 16, color: 'lightgreen' }} />}
                label={`${getCompletionPercentage()}% Complete`}
                variant="outlined"
                size="small"
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  '& .MuiChip-icon': {
                    color: 'lightgreen'
                  }
                }}
              />
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title={`${getNotificationCount()} habits pending today`}>
                <IconButton
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white'
                    }
                  }}
                >
                  <Badge 
                    badgeContent={getNotificationCount()} 
                    color="error"
                    max={99}
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Settings">
                <IconButton
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white'
                    }
                  }}
                >
                  {/* <SettingsIcon /> */}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
     

      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          pointerEvents: 'none'
        }}
      />
    </AppBar>
  );
};

export default HabitTrackerHeader;