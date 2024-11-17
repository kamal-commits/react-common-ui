// src/components/CustomTableLayout.stories.tsx
// import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import CustomTableLayout from "./Table";
import { action } from "@storybook/addon-actions";
import { Box, Typography } from "@mui/material";

export default {
	title: "Components/CustomTableLayout",
	component: CustomTableLayout,
	argTypes: {
		loading: {
			control: "boolean",
			description: "Loading state of the table.",
			defaultValue: false,
		},
		heading: {
			control: { type: "object" }, // Changed from 'array' to 'object'
			description: "Array of column headings.",
		},
		tableData: {
			control: { type: "object" }, // Control set to 'object' to handle complex data
			description: "Data to display in the table.",
		},
		paginate: {
			control: { type: "object" }, // Control set to 'object'
			description: "Pagination settings.",
		},
		pageHeading: {
			control: "text",
			description: "Heading displayed above the table.",
			defaultValue: "Items",
		},
		selectableRows: {
			control: "boolean",
			description: "Enable row selection.",
			defaultValue: false,
		},
		expandableRows: {
			control: "boolean",
			description: "Enable row expansion.",
			defaultValue: false,
		},
		sortableColumns: {
			control: "boolean",
			description: "Enable column sorting.",
			defaultValue: false,
		},
		onRowSelect: {
			control: false,
			description: "Callback when rows are selected.",
		},
		onSort: {
			control: false,
			description: "Callback when a column is sorted.",
		},
	},
} as Meta<typeof CustomTableLayout>;

const Template: StoryFn<typeof CustomTableLayout> = (args) => <CustomTableLayout {...args} />;

const sampleTableData = [
	{
		cells: [
			{ value: "Item 1" },
			{ value: "Category A" },
			{ value: "Available" },
			{
				type: "BUTTON",
				text: "Edit",
				onClick: action("Edit clicked on Item 1"),
			},
		],
		details: (
			<Box p={2}>
				<Typography variant="body1">Details about Item 1...</Typography>
			</Box>
		),
	},
	{
		cells: [
			{ value: "Item 2" },
			{ value: "Category B" },
			{ value: "Out of Stock" },
			{
				type: "BUTTON",
				text: "Edit",
				onClick: action("Edit clicked on Item 2"),
			},
		],
		details: (
			<Box p={2}>
				<Typography variant="body1">Details about Item 2...</Typography>
			</Box>
		),
	},
	// Add more rows as needed
];

export const Default = Template.bind({});
Default.args = {
	heading: ["Name", "Category", "Status", "Actions"],
	tableData: sampleTableData,
	pageHeading: "Items",
	paginate: { totalPage: 5, page: 1 },
	handlePageChange: action("Page changed"),
};

export const LoadingState = Template.bind({});
LoadingState.args = {
	...Default.args,
	loading: true,
};

export const WithSelectableRows = Template.bind({});
WithSelectableRows.args = {
	...Default.args,
	selectableRows: true,
	onRowSelect: action("Rows selected"),
};

export const WithExpandableRows = Template.bind({});
WithExpandableRows.args = {
	...Default.args,
	expandableRows: true,
};

export const WithSortableColumns = Template.bind({});
WithSortableColumns.args = {
	...Default.args,
	sortableColumns: true,
	onSort: action("Column sorted"),
};

export const AllFeaturesEnabled = Template.bind({});
AllFeaturesEnabled.args = {
	...Default.args,
	selectableRows: true,
	expandableRows: true,
	sortableColumns: true,
	onRowSelect: action("Rows selected"),
	onSort: action("Column sorted"),
};
