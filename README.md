# React Common Ui (react-common-ui)

A customizable and feature-rich table layout component built with React and Material-UI, designed to simplify the creation of complex tables with features like selectable rows, expandable rows, sorting, pagination, and more.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Peer Dependencies](#peer-dependencies)
- [Usage](#usage)
  - [Basic Example](#basic-example)
  - [Advanced Example](#advanced-example)
- [Props](#props)
  - [CustomTableLayout Props](#customtablelayout-props)
  - [CellItem Interface](#cellitem-interface)
  - [TableRowData Interface](#tablerowdata-interface)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Customizable Columns**: Define your own column headings and cell content.
- **Selectable Rows**: Enable row selection with checkboxes.
- **Expandable Rows**: Provide additional details with expandable rows.
- **Sortable Columns**: Allow sorting by clicking on column headers.
- **Pagination**: Manage large datasets with built-in pagination.
- **Loading State**: Display a loading indicator while fetching data.
- **Responsive Design**: Optimized for different screen sizes.
- **TypeScript Support**: Fully typed with TypeScript for type safety.

---

## Installation

Install the library using NPM:

```bash
npm install react-common-ui
```

---

## Peer Dependencies

Ensure you have the following peer dependencies installed in your project:

- **React** (version `^17.0.0` or `^18.0.0`):

  ```bash
  npm install react react-dom
  ```

- **Material-UI (MUI)** (version `^5.0.0`):

  ```bash
  npm install @mui/material @emotion/react @emotion/styled
  ```

- **React Icons**:

  ```bash
  npm install react-icons
  ```

---

## Usage

### Basic Example

```tsx
import React from "react";
import CustomTableLayout from "react-common-ui";

const App: React.FC = () => {
	const headings = ["Name", "Category", "Status", "Actions"];
	const tableData = [
		{
			cells: [
				{ value: "Item 1" },
				{ value: "Category A" },
				{ value: "Available" },
				{
					type: "BUTTON",
					text: "Edit",
					onClick: () => console.log("Edit clicked on Item 1"),
				},
			],
		},
		{
			cells: [
				{ value: "Item 2" },
				{ value: "Category B" },
				{ value: "Out of Stock" },
				{
					type: "BUTTON",
					text: "Edit",
					onClick: () => console.log("Edit clicked on Item 2"),
				},
			],
		},
	];

	return (
		<CustomTableLayout
			heading={headings}
			tableData={tableData}
			pageHeading="Product List"
			paginate={{ totalPage: 5, page: 1 }}
			handlePageChange={(event, page) => console.log(`Page changed to ${page}`)}
		/>
	);
};

export default App;
```

### Advanced Example

```tsx
import React from "react";
import CustomTableLayout from "react-common-ui";

const App: React.FC = () => {
	const headings = ["Name", "Category", "Status", "Actions"];
	const tableData = [
		{
			cells: [
				{ value: "Item 1" },
				{ value: "Category A" },
				{ value: "Available" },
				{
					type: "BUTTON",
					text: "Edit",
					onClick: () => console.log("Edit clicked on Item 1"),
				},
			],
			details: (
				<div>
					<p>Additional details about Item 1.</p>
				</div>
			),
		},
		// More rows...
	];

	const handleRowSelect = (selectedRows: number[]) => {
		console.log("Selected rows:", selectedRows);
	};

	const handleSort = (columnIndex: number, order: "asc" | "desc") => {
		console.log(`Sorted column ${columnIndex} in ${order} order`);
	};

	return (
		<CustomTableLayout
			heading={headings}
			tableData={tableData}
			pageHeading="Product List"
			paginate={{ totalPage: 5, page: 1 }}
			handlePageChange={(event, page) => console.log(`Page changed to ${page}`)}
			selectableRows
			expandableRows
			sortableColumns
			onRowSelect={handleRowSelect}
			onSort={handleSort}
		/>
	);
};

export default App;
```

---

## Props

### CustomTableLayout Props

| Prop                 | Type                                                        | Default                     | Description                                                                         |
| -------------------- | ----------------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------- |
| `loading`            | `boolean`                                                   | `false`                     | Indicates whether the table is in a loading state.                                  |
| `tableData`          | `TableRowData[]`                                            | `[]`                        | Array of data to display in the table rows.                                         |
| `heading`            | `string[]`                                                  | **Required**                | Array of column headings.                                                           |
| `paginate`           | `{ totalPage: number; page: number }`                       | `{ totalPage: 1, page: 1 }` | Pagination settings.                                                                |
| `handlePageChange`   | `(event: React.ChangeEvent<unknown>, page: number) => void` | `() => {}`                  | Callback function when the page is changed.                                         |
| `pageHeading`        | `string`                                                    | `''`                        | Heading displayed above the table.                                                  |
| `selectableRows`     | `boolean`                                                   | `false`                     | Enables row selection with checkboxes.                                              |
| `expandableRows`     | `boolean`                                                   | `false`                     | Enables expandable rows to show additional details.                                 |
| `onRowSelect`        | `(selectedRows: number[]) => void`                          | `() => {}`                  | Callback function when rows are selected. Returns an array of selected row indices. |
| `sortableColumns`    | `boolean`                                                   | `false`                     | Enables sorting by clicking on column headers.                                      |
| `onSort`             | `(columnIndex: number, order: 'asc' \| 'desc') => void`     | `() => {}`                  | Callback function when a column is sorted.                                          |
| `handleSwitchChange` | `() => void`                                                | `() => {}`                  | (Optional) Callback for switch changes in `STATUS` type cells.                      |
| `form`               | `boolean`                                                   | `false`                     | (Optional) Indicates whether a form is open.                                        |
| `setForm`            | `() => void`                                                | `() => {}`                  | (Optional) Function to toggle the form state.                                       |
| `handleAdd`          | `() => void`                                                | `() => {}`                  | (Optional) Callback function when the "Add" button is clicked.                      |
| `inputArray`         | `any[]`                                                     | `[]`                        | (Optional) Array of inputs for forms.                                               |

### CellItem Interface

Defines the structure of each cell in a table row.

```typescript
interface CellItem {
	type?: "STATUS" | "BUTTON" | "IMAGE" | "VIEW_LIST" | "INFO" | "STATUS_ENUM";
	value?: string;
	text?: string;
	image?: string;
	style?: React.CSSProperties;
	onClick?: () => void;
	active?: boolean;
	valueArray?: any[];
}
```

### TableRowData Interface

Defines the structure of each row in the table.

```typescript
interface TableRowData {
	cells: CellItem[];
	details?: React.ReactNode; // For expandable rows
}
```

---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and ensure tests pass.
4. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the MIT License.

---

**Note**: This library is built with TypeScript and React. Ensure your project is set up to handle TypeScript files and that you have the necessary dependencies installed.

---

## Support

If you encounter any issues or have questions, feel free to open an issue on the [GitHub repository](https://github.com/kamal-commits/react-common-ui) or contact me at [kkamal714@gmail.com](mailto:kkamal714@gmail.com).

---

Happy coding! 🚀
