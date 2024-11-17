import React from "react";
import { Box, Typography } from "@mui/material";

const NoDataFound: React.FC = () => {
	return (
		<Box textAlign="center" py={5}>
			<Typography variant="h6">No data found</Typography>
		</Box>
	);
};

export default NoDataFound;
