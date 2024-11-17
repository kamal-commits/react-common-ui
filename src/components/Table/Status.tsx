import React from "react";
import { Chip, Switch } from "@mui/material";

interface StatusProps {
	value?: boolean;
	onClick?: () => void;
}

const Status: React.FC<StatusProps> = ({ value = false, onClick }) => {
	return <Chip label={value ? "Active" : "Inactive"} onClick={onClick} color={value ? "primary" : "default"} clickable />;
};

export default Status;
