// src/components/CustomTableLayout.tsx
import React, { useState, memo } from "react";
import {
	Box,
	Dialog,
	Typography,
	IconButton,
	List,
	ListItem,
	Divider,
	TableCell,
	TableRow,
	TableBody,
	styled,
	Pagination,
	TableContainer,
	Table,
	TableHead,
	Checkbox,
	Collapse,
	TableSortLabel,
} from "@mui/material";
import { IoAddCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

import Loader from "./Loader";
import Status from "./Status";
import NoDataFound from "./NoDataFound";
// import CustomAddForm from './CustomAddForm';
import CustomButton from "../Button/Button";

interface Paginate {
	totalPage: number;
	page: number;
}

interface CellItem {
	type?: string;
	value?: string;
	text?: string;
	image?: string;
	style?: React.CSSProperties;
	onClick?: () => void;
	active?: boolean;
	valueArray?: any[];
}

interface TableRowData {
	cells: CellItem[];
	details?: React.ReactNode; // For expandable rows
}

interface CustomTableLayoutProps {
	loading?: boolean;
	tableData?: TableRowData[];
	heading: string[];
	paginate?: Paginate;
	handlePageChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
	handleSwitchChange?: () => void;
	form?: boolean;
	setForm?: () => void;
	handleAdd?: () => void;
	pageHeading?: string;
	inputArray?: any[];
	selectableRows?: boolean;
	expandableRows?: boolean;
	onRowSelect?: (selectedRows: number[]) => void;
	sortableColumns?: boolean;
	onSort?: (columnIndex: number, order: "asc" | "desc") => void;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	"&.MuiTableCell-head": {
		backgroundColor: "#EBEEF0",
		color: "#5E7387",
		fontSize: "12px",
		fontWeight: 500,
		textAlign: "left",
	},
	"&.MuiTableCell-body": {
		fontSize: 14,
		textAlign: "left",
	},
}));

const CustomTableLayout: React.FC<CustomTableLayoutProps> = memo(
	({
		loading = false,
		tableData = [],
		heading,
		paginate = { totalPage: 1, page: 1 },
		handlePageChange = () => {},
		// handleSwitchChange = () => {},
		// form = false,
		// setForm = () => {},
		// handleAdd = () => {},
		pageHeading = "",
		// inputArray = [],
		selectableRows = false,
		expandableRows = false,
		onRowSelect = () => {},
		sortableColumns = false,
		onSort = () => {},
	}) => {
		const [image, setImage] = useState<string | null>(null);
		const [dialogOpen, setDialogOpen] = useState<boolean>(false);
		const [viewDialogData, setViewDialogData] = useState<any[] | null>(null);
		const [selectedRows, setSelectedRows] = useState<number[]>([]);
		const [expandedRows, setExpandedRows] = useState<number[]>([]);
		const [order, setOrder] = useState<"asc" | "desc">("asc");
		const [orderBy, setOrderBy] = useState<number | null>(null);

		// Handlers for dialogs
		const openDialog = () => setDialogOpen(true);
		const closeDialog = () => setDialogOpen(false);

		const openViewDialog = (data: any[]) => setViewDialogData(data);
		const closeViewDialog = () => setViewDialogData(null);

		const openImageDialog = (src: string) => setImage(src);
		const closeImageDialog = () => setImage(null);

		const handleSelectRow = (index: number) => {
			const selectedIndex = selectedRows.indexOf(index);
			let newSelected: number[] = [];

			if (selectedIndex === -1) {
				newSelected = newSelected.concat(selectedRows, index);
			} else if (selectedIndex === 0) {
				newSelected = newSelected.concat(selectedRows.slice(1));
			} else if (selectedIndex === selectedRows.length - 1) {
				newSelected = newSelected.concat(selectedRows.slice(0, -1));
			} else if (selectedIndex > 0) {
				newSelected = newSelected.concat(selectedRows.slice(0, selectedIndex), selectedRows.slice(selectedIndex + 1));
			}

			setSelectedRows(newSelected);
			onRowSelect(newSelected);
		};

		const handleExpandRow = (index: number) => {
			const expandedIndex = expandedRows.indexOf(index);
			let newExpanded: number[] = [];

			if (expandedIndex === -1) {
				newExpanded = newExpanded.concat(expandedRows, index);
			} else {
				newExpanded = expandedRows.filter((i) => i !== index);
			}

			setExpandedRows(newExpanded);
		};

		const handleRequestSort = (columnIndex: number) => {
			const isAsc = orderBy === columnIndex && order === "asc";
			setOrder(isAsc ? "desc" : "asc");
			setOrderBy(columnIndex);
			onSort(columnIndex, isAsc ? "desc" : "asc");
		};

		const renderCellContent = (item: CellItem) => {
			switch (item.type) {
				case "STATUS":
					return <Status value={item.active} onClick={item.onClick} />;
				case "BUTTON":
					return <CustomButton text={item.text || ""} onClick={item.onClick} />;
				case "IMAGE":
					return <img src={item.image} alt="thumbnail" style={{ cursor: "pointer" }} onClick={() => openImageDialog(item.image || "")} />;
				case "VIEW_LIST":
					return (
						<IconButton onClick={() => openViewDialog(item.valueArray || [])}>
							<FaEye />
						</IconButton>
					);
				case "INFO":
					return (
						<IconButton onClick={item.onClick}>
							<AiOutlineInfoCircle />
						</IconButton>
					);
				case "STATUS_ENUM":
					return <Status value={item.value === "true"} />;
				default:
					return item.value || "--";
			}
		};

		// Sorting function (if needed)
		const sortedTableData = React.useMemo(() => {
			if (!sortableColumns || orderBy === null) {
				return tableData;
			}
			return [...tableData].sort((a, b) => {
				const aValue = a.cells[orderBy].value || "";
				const bValue = b.cells[orderBy].value || "";
				if (order === "asc") {
					return aValue.localeCompare(bValue);
				} else {
					return bValue.localeCompare(aValue);
				}
			});
		}, [tableData, orderBy, order, sortableColumns]);

		return (
			<>
				{/* Add/Edit Dialog */}
				{/* Uncomment and implement when needed */}
				{/* <Dialog open={dialogOpen} onClose={closeDialog} fullWidth>
          <Box padding={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Add {pageHeading}</Typography>
              <IconButton onClick={closeDialog}>
                <IoCloseCircleOutline />
              </IconButton>
            </Box>
            <CustomAddForm
              form={form}
              setForm={setForm}
              data={inputArray}
              handleAdd={() => {
                handleAdd();
                closeDialog();
              }}
            />
          </Box>
        </Dialog> */}

				{/* Image Dialog */}
				<Dialog open={!!image} onClose={closeImageDialog}>
					{image && <img src={image} alt="Preview" style={{ width: "100%" }} />}
				</Dialog>

				{/* View Dialog */}
				<Dialog open={!!viewDialogData} onClose={closeViewDialog} maxWidth="md">
					<Box padding={3}>
						<Typography variant="h6">Details</Typography>
						<List>
							{viewDialogData?.map((item, index) => (
								<ListItem key={index}>
									<Typography>{item}</Typography>
								</ListItem>
							))}
						</List>
					</Box>
				</Dialog>

				{/* Main Content */}
				<Box
					sx={{
						backgroundColor: "white",
						minHeight: "calc(100% - 64px)",
						boxShadow: 4,
						borderRadius: 2,
						p: 2,
						m: 2,
					}}
				>
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Typography variant="h6">List of {pageHeading}</Typography>
						<CustomButton text={`Add ${pageHeading}`} onClick={openDialog} startIcon={<IoAddCircleOutline />} />
					</Box>
					<Divider sx={{ my: 2 }} />
					{loading && <Loader />}
					{!loading && (
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										{selectableRows && <StyledTableCell padding="checkbox" />}
										{heading.map((headCell, index) => (
											<StyledTableCell key={index}>
												{sortableColumns ? (
													<TableSortLabel active={orderBy === index} direction={orderBy === index ? order : "asc"} onClick={() => handleRequestSort(index)}>
														{headCell}
													</TableSortLabel>
												) : (
													headCell
												)}
											</StyledTableCell>
										))}
									</TableRow>
								</TableHead>

								<TableBody>
									{sortedTableData.length > 0 ? (
										sortedTableData.map((row, rowIndex) => {
											const isItemSelected = selectedRows.indexOf(rowIndex) !== -1;
											const isExpanded = expandedRows.indexOf(rowIndex) !== -1;

											return (
												<React.Fragment key={rowIndex}>
													<TableRow hover>
														{selectableRows && (
															<StyledTableCell padding="checkbox">
																<Checkbox checked={isItemSelected} onChange={() => handleSelectRow(rowIndex)} />
															</StyledTableCell>
														)}
														{row.cells.map((item, colIndex) => (
															<StyledTableCell key={colIndex} style={item.style} onClick={item.onClick}>
																{renderCellContent(item)}
															</StyledTableCell>
														))}
														{expandableRows && (
															<StyledTableCell padding="checkbox">
																<IconButton onClick={() => handleExpandRow(rowIndex)}>{isExpanded ? <IoCloseCircleOutline /> : <FaEye />}</IconButton>
															</StyledTableCell>
														)}
													</TableRow>
													{expandableRows && (
														<TableRow>
															<TableCell colSpan={heading.length + (selectableRows ? 1 : 0)}>
																<Collapse in={isExpanded} timeout="auto" unmountOnExit>
																	{row.details}
																</Collapse>
															</TableCell>
														</TableRow>
													)}
												</React.Fragment>
											);
										})
									) : (
										<TableRow>
											<StyledTableCell colSpan={heading.length + (selectableRows ? 1 : 0)}>
												<NoDataFound />
											</StyledTableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
					)}
					{!loading && tableData.length > 0 && <Pagination count={paginate.totalPage} page={paginate.page} onChange={handlePageChange} />}
				</Box>
			</>
		);
	}
);

export default CustomTableLayout;
