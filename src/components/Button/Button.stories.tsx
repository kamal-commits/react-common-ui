import { StoryFn, Meta } from "@storybook/react";
import CustomButton from "./Button"; // Ensure this path is correct
import { IoAddCircleOutline } from "react-icons/io5";
import { action } from "@storybook/addon-actions";

export default {
	title: "Components/CustomButton",
	component: CustomButton,
	argTypes: {
		text: {
			control: "text",
			description: "The text to display inside the button.",
			defaultValue: "Click Me",
		},
		onClick: {
			control: false,
			description: "Function to call when button is clicked.",
		},
		disabled: {
			control: "boolean",
			description: "Whether the button is disabled.",
			defaultValue: false,
		},
		variant: {
			control: "select",
			options: ["text", "outlined", "contained"],
			description: "The variant to use.",
			defaultValue: "contained",
		},
		size: {
			control: "select",
			options: ["small", "medium", "large"],
			description: "The size of the button.",
			defaultValue: "medium",
		},
		color: {
			control: "select",
			options: ["inherit", "primary", "secondary", "success", "error", "info", "warning"],
			description: "The color of the button.",
			defaultValue: "primary",
		},
		startIcon: {
			control: false,
			description: "Element placed before the children.",
		},
		endIcon: {
			control: false,
			description: "Element placed after the children.",
		},
		sx: {
			control: "object",
			description: "The system prop that allows defining system overrides as well as additional CSS styles.",
		},
	},
	parameters: {
		actions: { handles: ["onClick"] },
		docs: {
			description: {
				component: "A customizable button component based on Material-UI Button with additional styles and features.",
			},
		},
	},
} as Meta<typeof CustomButton>;

// Removed CustomButtonProps interface

const Template: StoryFn<typeof CustomButton> = (args) => <CustomButton {...args} />;

export const Default = Template.bind({});
Default.args = {
	text: "Click Me",
	onClick: action("Button clicked"),
};

export const Primary = Template.bind({});
Primary.args = {
	text: "Primary Button",
	color: "primary",
	onClick: action("Primary Button clicked"),
};

export const Secondary = Template.bind({});
Secondary.args = {
	text: "Secondary Button",
	color: "secondary",
	onClick: action("Secondary Button clicked"),
};

export const Disabled = Template.bind({});
Disabled.args = {
	text: "Disabled Button",
	disabled: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
	text: "Add Item",
	startIcon: <IoAddCircleOutline />,
	onClick: action("Button with icon clicked"),
};

export const Sizes = () => (
	<div style={{ display: "flex", gap: "10px" }}>
		<CustomButton text="Small" size="small" onClick={action("Small Button clicked")} />
		<CustomButton text="Medium" size="medium" onClick={action("Medium Button clicked")} />
		<CustomButton text="Large" size="large" onClick={action("Large Button clicked")} />
	</div>
);

export const Variants = () => (
	<div style={{ display: "flex", gap: "10px" }}>
		<CustomButton text="Text" variant="text" onClick={action("Text Button clicked")} />
		<CustomButton text="Outlined" variant="outlined" onClick={action("Outlined Button clicked")} />
		<CustomButton text="Contained" variant="contained" onClick={action("Contained Button clicked")} />
	</div>
);

export const CustomStyles = Template.bind({});
CustomStyles.args = {
	text: "Custom Styled Button",
	sx: {
		backgroundColor: "purple",
		"&:hover": {
			backgroundColor: "darkmagenta",
		},
		borderRadius: "20px",
		color: "white",
	},
	onClick: action("Custom Styled Button clicked"),
};
