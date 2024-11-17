import React from "react";
import { Button, ButtonProps, PaletteColor, useTheme } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
	text?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
	text = "Click Me",
	onClick = () => {},
	disabled = false,
	variant = "contained",
	size = "medium",
	color = "primary",
	...rest
}) => {
	const theme = useTheme();

	return (
		<Button
			sx={{
				backgroundColor: disabled ? theme.palette.grey[500] : (theme.palette[color as keyof typeof theme.palette] as PaletteColor)?.main,
				color: "white",
				borderRadius: 5,
				padding: "10px 20px",
				width: "40%",
				fontSize: 16,
				fontWeight: "bold",
				textTransform: "capitalize",
				"&:hover": {
					backgroundColor: disabled ? theme.palette.grey[500] : (theme.palette[color as keyof typeof theme.palette] as PaletteColor)?.dark,
				},
			}}
			onClick={onClick}
			disabled={disabled}
			variant={variant}
			size={size}
			aria-label={text}
			{...rest}
		>
			{text}
		</Button>
	);
};

export default CustomButton;
