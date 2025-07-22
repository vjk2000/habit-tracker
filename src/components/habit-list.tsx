import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Paper,
  Grid,
  Chip,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Divider,
  Stack,
  useTheme,
  alpha,
  Container
} from "@mui/material";
import {
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon,
  Whatshot as FireIcon,
  CalendarToday as CalendarIcon,
  Schedule as ScheduleIcon,
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
  Celebration as CelebrationIcon
} from "@mui/icons-material";
import { Habit, removeHabit, toggleHabit } from "../store/habit-slice";
import { RootState, AppDispatch } from "../store/store";

const HabitList: React.FC = () => {
  const habits = useSelector((state: RootState) => state.habits.habits);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; habitId: string | null }>({
    open: false,
    habitId: null
  });

  const today = new Date().toISOString().split("T")[0];

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

  const getCompletionPercentage = (habit: Habit) => {
    const streak = getStreak(habit);
    const maxStreak = 30; // Target of 30 days
    return Math.min((streak / maxStreak) * 100, 100);
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'success';
    if (streak >= 14) return 'warning';
    if (streak >= 7) return 'info';
    return 'default';
  };

  const getStreakGradient = (streak: number) => {
    if (streak >= 30) return 'linear-gradient(135deg, #4caf50, #81c784, #c8e6c9)';
    if (streak >= 14) return 'linear-gradient(135deg, #ff9800, #ffb74d, #ffe0b2)';
    if (streak >= 7) return 'linear-gradient(135deg, #2196f3, #64b5f6, #bbdefb)';
    return 'linear-gradient(135deg, #9e9e9e, #bdbdbd, #e0e0e0)';
  };

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency.toLowerCase()) {
      case 'daily':
        return <CalendarIcon sx={{ fontSize: 16 }} />;
      case 'weekly':
        return <ScheduleIcon sx={{ fontSize: 16 }} />;
      default:
        return <TimelineIcon sx={{ fontSize: 16 }} />;
    }
  };

  const getStreakIcon = (streak: number) => {
    if (streak >= 30) return <CelebrationIcon sx={{ color: '#4caf50', fontSize: 24 }} />;
    if (streak >= 14) return <StarIcon sx={{ color: '#ff9800', fontSize: 24 }} />;
    if (streak >= 7) return <TrendingUpIcon sx={{ color: '#2196f3', fontSize: 24 }} />;
    return <FireIcon sx={{ color: '#9e9e9e', fontSize: 24 }} />;
  };

  const handleDeleteClick = (habitId: string) => {
    setDeleteDialog({ open: true, habitId });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.habitId) {
      dispatch(removeHabit(deleteDialog.habitId));
    }
    setDeleteDialog({ open: false, habitId: null });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, habitId: null });
  };

  const completedToday = habits.filter(habit => habit.completedDates.includes(today)).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  if (habits.length === 0) {
    return (
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: 6,
            mt: 4,
            textAlign: 'center',
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
            border: '2px dashed',
            borderColor: alpha(theme.palette.primary.main, 0.2),
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -50,
              right: -50,
              width: 100,
              height: 100,
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
              borderRadius: '50%'
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <StarIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2, opacity: 0.7 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
              Start Your Journey
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto', lineHeight: 1.6 }}>
              Create your first habit to begin building amazing routines that will transform your daily life!
            </Typography>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    
      <Box sx={{ mt: 4, mb: 6 }}>
        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.1)
          }}
        >
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                Your Habit Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Track your progress and build consistency one day at a time
              </Typography>
              <Stack direction="row" spacing={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    {completedToday}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed Today
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                    {totalHabits}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Habits
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: { xs: 'left', md: 'center' } }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Today's Progress
                </Typography>
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 1 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: `conic-gradient(from 0deg, ${theme.palette.primary.main} 0% ${completionRate}%, ${alpha(theme.palette.primary.main, 0.1)} ${completionRate}% 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        backgroundColor: 'background.paper',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        {completionRate}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Completion Rate
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Habits List */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {habits.map((habit, index) => {
            const streak = getStreak(habit);
            const isCompletedToday = habit.completedDates.includes(today);
            const completionPercentage = getCompletionPercentage(habit);

            return (
              <Fade in={true} timeout={300 + index * 100} key={habit.id}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: isCompletedToday ? 'success.light' : alpha(theme.palette.divider, 0.3),
                    background: isCompletedToday 
                      ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.08) 0%, rgba(129, 199, 132, 0.08) 100%)'
                      : 'background.paper',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
                      borderColor: isCompletedToday ? 'success.main' : 'primary.main'
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: getStreakGradient(streak),
                      opacity: 0.8
                    }
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    {/* Main Content Row */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                      {/* Habit Info */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0, flex: 1 }}>
                        <Avatar
                          sx={{
                            bgcolor: isCompletedToday ? 'success.main' : alpha(theme.palette.primary.main, 0.1),
                            width: 48,
                            height: 48,
                            color: isCompletedToday ? 'white' : 'primary.main',
                            boxShadow: isCompletedToday ? `0 3px 8px ${alpha(theme.palette.success.main, 0.3)}` : 'none',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {isCompletedToday ? <CheckCircleIcon sx={{ fontSize: 24 }} /> : <UncheckedIcon sx={{ fontSize: 24 }} />}
                        </Avatar>
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600,
                              color: isCompletedToday ? 'success.main' : 'text.primary',
                              textDecoration: isCompletedToday ? 'line-through' : 'none',
                              opacity: isCompletedToday ? 0.8 : 1,
                              mb: 0.5,
                              lineHeight: 1.3
                            }}
                          >
                            {habit.name}
                          </Typography>
                          <Chip
                            icon={getFrequencyIcon(habit.frequency)}
                            label={habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}
                            size="small"
                            variant="outlined"
                            sx={{ 
                              fontWeight: 500,
                              fontSize: '0.75rem',
                              height: 24,
                              '& .MuiChip-icon': { 
                                fontSize: 14,
                                ml: 0.5 
                              }
                            }}
                          />
                        </Box>
                      </Box>

                      {/* Streak Info */}
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1.5,
                        px: 2,
                        py: 1,
                        borderRadius: 1.5,
                        background: alpha(getStreakColor(streak) === 'success' ? theme.palette.success.main : 
                                       getStreakColor(streak) === 'warning' ? theme.palette.warning.main :
                                       getStreakColor(streak) === 'info' ? theme.palette.info.main : 
                                       theme.palette.grey[500], 0.1),
                        border: '1px solid',
                        borderColor: alpha(getStreakColor(streak) === 'success' ? theme.palette.success.main : 
                                         getStreakColor(streak) === 'warning' ? theme.palette.warning.main :
                                         getStreakColor(streak) === 'info' ? theme.palette.info.main : 
                                         theme.palette.grey[500], 0.2),
                        minWidth: 120
                      }}>
                        {getStreakIcon(streak)}
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1 }}>
                            {streak}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>
                            day streak
                          </Typography>
                        </Box>
                        <Chip
                          size="small"
                          label={streak >= 30 ? 'Master!' : streak >= 14 ? 'Strong' : streak >= 7 ? 'Building' : 'Starting'}
                          color={getStreakColor(streak)}
                          sx={{ 
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            height: 20,
                            ml: 0.5
                          }}
                        />
                      </Box>

                      {/* Action Buttons */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Button
                          variant={isCompletedToday ? "contained" : "outlined"}
                          color={isCompletedToday ? "success" : "primary"}
                          size="medium"
                          onClick={() => dispatch(toggleHabit({ id: habit.id, date: today }))}
                          startIcon={isCompletedToday ? <CheckCircleIcon sx={{ fontSize: 18 }} /> : <UncheckedIcon sx={{ fontSize: 18 }} />}
                          sx={{ 
                            minWidth: 120,
                            fontWeight: 600,
                            borderRadius: 1.5,
                            textTransform: 'none',
                            fontSize: '0.875rem',
                            px: 2,
                            py: 1,
                            boxShadow: isCompletedToday ? `0 2px 8px ${alpha(theme.palette.success.main, 0.3)}` : 'none',
                            '&:hover': {
                              transform: 'translateY(-1px)',
                              boxShadow: isCompletedToday 
                                ? `0 4px 12px ${alpha(theme.palette.success.main, 0.4)}`
                                : `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
                            }
                          }}
                        >
                          {isCompletedToday ? "Done" : "Complete"}
                        </Button>
                        <Tooltip title="Delete habit" placement="top">
                          <IconButton
                            color="error"
                            size="medium"
                            onClick={() => handleDeleteClick(habit.id)}
                            sx={{ 
                              borderRadius: 1.5,
                              transition: 'all 0.3s ease',
                              '&:hover': { 
                                backgroundColor: alpha(theme.palette.error.main, 0.1),
                                transform: 'scale(1.05)'
                              }
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: 20 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2, opacity: 0.6 }} />

                    {/* Enhanced Progress Bar */}
                    {/* <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                          Progress to 30-day goal
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {Math.round(completionPercentage)}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={completionPercentage}
                        sx={{
                          height: 12,
                          borderRadius: 6,
                          backgroundColor: alpha(theme.palette.grey[400], 0.2),
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 6,
                            background: getStreakGradient(streak),
                            position: 'relative',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                              animation: completionPercentage > 0 ? 'shimmer 2s infinite' : 'none'
                            }
                          },
                          '@keyframes shimmer': {
                            '0%': { transform: 'translateX(-100%)' },
                            '100%': { transform: 'translateX(100%)' }
                          }
                        }}
                      />
                    </Box> */}
                  </CardContent>
                </Card>
              </Fade>
            );
          })}
        </Box>

        {/* Enhanced Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialog.open}
          onClose={handleDeleteCancel}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              p: 1
            }
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'error.light', color: 'error.main' }}>
                <DeleteIcon />
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Delete Habit
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              Are you sure you want to delete this habit? This action will permanently remove all progress data and cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 2 }}>
            <Button 
              onClick={handleDeleteCancel}
              variant="outlined"
              size="large"
              sx={{ minWidth: 100, textTransform: 'none', borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteConfirm} 
              color="error" 
              variant="contained"
              size="large"
              sx={{ 
                minWidth: 100, 
                textTransform: 'none', 
                borderRadius: 2,
                fontWeight: 600
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    
  );
};

export default HabitList;