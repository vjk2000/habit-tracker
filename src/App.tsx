import React from "react";
import { Provider } from "react-redux";
import { Box } from "@mui/material";
import AddHabitForm from "./components/add-habit-form";
import HabitList from "./components/habit-list";
import HabitStats from "./components/habit-stats";
import store from "./store/store";
import HabitTrackerHeader from "./components/HabitTrackerHeader";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      
        <HabitTrackerHeader />
        <Box sx={{ my: 1 }}>
          <AddHabitForm />
          <HabitList />
          <HabitStats />
        </Box>
     
    </Provider>
  );
};

export default App;
