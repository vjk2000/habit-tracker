import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Paper, 
  Typography, 
  Box, 
  LinearProgress, 
  Grid,
  Card,
  CardContent,
  Chip
} from "@mui/material";
import { 
  TrendingUp, 
  CheckCircle, 
  Assignment,
  LocalFireDepartment 
} from "@mui/icons-material";
import { AppDispatch, RootState } from "../store/store";
import { fetchHabits, Habit } from "../store/habit-slice";

const HabitStats: React.FC = () => {
  const { habits, isLoading, error } = useSelector(
    (state: RootState) => state.habits
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  const getTotalHabits = () => habits.length;

  const getCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return habits.filter((habit) => habit.completedDates.includes(today))
      .length;
  };

  const getLongestStreak = () => {
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

  const getCompletionRate = () => {
    const totalHabits = getTotalHabits();
    const completedToday = getCompletedToday();
    return totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;
  };

  if (isLoading) {
    return (
      <Paper elevation={1} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
        <LinearProgress sx={{ borderRadius: 1 }} />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={1} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
        <Typography color="error" variant="body1" sx={{ textAlign: 'center' }}>
          {error}
        </Typography>
      </Paper>
    );
  }

  const stats = [
    {
      title: "Total Habits",
      value: getTotalHabits(),
      icon: <Assignment sx={{ fontSize: 28, color: 'primary.main' }} />,
      color: 'primary.main'
    },
    {
      title: "Completed Today",
      value: getCompletedToday(),
      icon: <CheckCircle sx={{ fontSize: 28, color: 'success.main' }} />,
      color: 'success.main'
    },
    {
      title: "Longest Streak",
      value: `${getLongestStreak()} days`,
      icon: <LocalFireDepartment sx={{ fontSize: 28, color: 'warning.main' }} />,
      color: 'warning.main'
    },
    {
      title: "Completion Rate",
      value: `${getCompletionRate()}%`,
      icon: <TrendingUp sx={{ fontSize: 28, color: 'info.main' }} />,
      color: 'info.main'
    }
  ];

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 3, 
        mt: 3, 
        borderRadius: 2,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 600,
            color: 'text.primary',
            mb: 1
          }}
        >
          Habit Statistics
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
            fontStyle: 'italic'
          }}
        >
          Track your progress and stay motivated
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              elevation={0}
              sx={{ 
                height: '100%',
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2,
                  borderColor: stat.color
                }
              }}
            >
              <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
                <Box sx={{ mb: 1.5 }}>
                  {stat.icon}
                </Box>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700,
                    color: stat.color,
                    mb: 1
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    fontWeight: 500
                  }}
                >
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Progress indicator for today's completion */}
      <Box sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Today's Progress
          </Typography>
          <Chip 
            label={`${getCompletedToday()}/${getTotalHabits()}`}
            size="small"
            color={getCompletionRate() === 100 ? "success" : "default"}
            sx={{ height: 20, fontSize: '0.75rem' }}
          />
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={getCompletionRate()} 
          sx={{ 
            height: 8,
            borderRadius: 4,
            backgroundColor: 'rgba(0,0,0,0.1)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 4,
              background: getCompletionRate() === 100 
                ? 'linear-gradient(90deg, #4caf50, #81c784)'
                : 'linear-gradient(90deg, #2196f3, #64b5f6)'
            }
          }}
        />
      </Box>
    </Paper>
  );
};

export default HabitStats;