import { Box } from "@mui/material";
import DashboardHero from "../components/DashboardHero";

/**
 * Dashboard is the parent component that displays welcome message and options.
 *
 * @returns {JSX.Element} - A parent component for the DashboardHero's welcome message and options.
 */

const Dashboard = () => {

  return (
    <>
      <Box>
        <DashboardHero />
      </Box>
    </>
  )
};

export default Dashboard;