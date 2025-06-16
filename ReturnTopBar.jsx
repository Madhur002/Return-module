import React, { useRef, useState } from "react";
import { Box, Button, TextField, Typography } from '@mui/material';
import MonthYearPicker from "./MonthYearPicker";
import { topBarSearchStyle, topBarStyle, animatedButtonStyle } from '../../../layouts/resuableComponents/styles';
import { SelectDropdown as CustomSelect } from "layouts/resuableComponents/selectDropdown";
import { Popper } from "@mui/material";
import { SearchableDropdown } from "layouts/resuableComponents/searchableDropdown";
import { departments } from "layouts/authentication/sign-up/metadata";
 
const ReturnTopbar = ({
    filters,
    setFilters,
    selectedMonth,
    setSelectedMonth,
    onMonthChange,
    setSelectedYear,
    onYearChange,
    onSearchChange,
    handleFilterApply,
    onClear,
    year,
    setYear,
    handleDownload,
    showFilters,
    setShowFilters, // Fixed prop name and typo
}) => {
    console.log("Filters",filters);
    const frequencyOptions = [
        { id: 1, name: "Weekly" },
        { id: 2, name: "Monthly" },
        { id: 3, name: "Quarterly" },
        { id: 4, name: "Yearly" },
    ];
    const statusOptions = [
        { id: 5, name: "Pending" },
        { id: 6, name: "Approved" },
        { id: 7, name: "Rejected" },
    ];
    const handleChange = (key, value) => {
        const updated = { ...filters, [key]: value };
        setFilters(updated);
        handleFilterApply(updated);
    };
    const generateYearList = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = 0; i <= 15; i++) {
            const year = currentYear - i;
            years.push({
                value: year.toString(),
                label: year.toString()
            });
        }
        return years;
    };
 
    const [yearList] = useState(generateYearList());
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const handleToggleFilters = (Event) => {
        setAnchorEl(Event.currentTarget);
        setOpen((prev) => !prev);
    };
    console.log("year", year);
 
    return (
        <Box sx={topBarStyle}>
            <TextField
                variant="outlined"
                placeholder="Search Returns.."
                value={filters.returnText}
                onChange={onSearchChange}
                sx={topBarSearchStyle}
                size="small"
            />
            <Box display="flex" gap={1} alignItems="center" ml={2}>
                <Button sx={animatedButtonStyle} onClick={(e) => handleToggleFilters(e)}>Filter</Button>
                <Button sx={animatedButtonStyle} onClick={handleDownload}>Download</Button>
                <Button sx={animatedButtonStyle}>Edit</Button>
                <Button sx={animatedButtonStyle} onClick={onClear}>Clear All</Button>
            </Box>
 
            <Popper open={open} anchorEl={anchorEl} placement="bottom-start" style={{ zIndex: 1300 }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
                        gap: 2,
                        width: "100%",
                        backgroundColor: "#fff",
                        padding: "12px",
                        borderRadius: "8px",
                        marginTop: "12px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                >
                    <Box sx={{ width: "150px" }}>
                        <SearchableDropdown
                            label="Department"
                            placeholder="Enter Department"
                            name="department"
                            options={departments}
                            value={filters.departments?.name || ""}
                            onChange={(e)=> handleChange(e.target.name,e.target.value)}
                        />
                    </Box>
                   
                    <Box sx={{ width: "150px" }}>
                        <SearchableDropdown
                            label="Frequency"
                            placeholder="Enter Frequency"
                            name="frequncy"
                            options={frequencyOptions}
                            value={filters.frequency}
                            onChange={handleChange}
                        />
                        {/* <CustomSelect
                            label="Select Frequency:"
                            value={filters?.frequency || ""}
                            onChange={(value) => handleChange("frequency", value)}
                            options={frequencyOptions}
                        /> */}
                    </Box>
                    <Box sx={{ width: "150px" }}>
                        <SearchableDropdown
                            label="Status"
                            placeholder="Enter status"
                            name="status"
                            options={statusOptions}
                            value={filters.status}
                            onChange={handleChange}
                        />
                        {/* <CustomSelect
                            label="Select Status:"
                            value={filters?.status || ""}
                            onChange={(value) => handleChange("status", value)}
                            options={Array.isArray(statusOptions) ? statusOptions : []}
                        /> */}
                    </Box>
                    <MonthYearPicker
                        selectedMonth={selectedMonth}
                        selectedYear={year}
                        setSelectedMonth={setSelectedMonth}
                        setYear={setSelectedYear}
                        onMonthChange={onMonthChange}
                        onYearChange={onYearChange}
                    />
                    <Box sx={{ width: "150px" }}>
                        <CustomSelect
                            placeholder="Select Year"
                            options={yearList}
                            value={filters?.year || ""}
                            onChange={(e) => handleChange("year", e.target.value)}
                        />
                    </Box>
 
                </Box>
            </Popper>
 
 
        </Box>
    );
};
export default ReturnTopbar;
