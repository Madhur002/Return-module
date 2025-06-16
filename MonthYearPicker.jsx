import React from 'react';
import {Box,Typography,IconButton,Grid} from '@mui/material';
import { ChevronLeft,ChevronRight } from '@mui/icons-material';
 
const months=[
    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"
];
const MonthYearPicker =({selectedMonth,selectedYear,setSelectedMonth,setYear,onMonthChange,onYearChange}) => {
    const year =selectedYear;
    const month=selectedMonth;
 
    const handlePrevYear = () => {setYear((prev) =>{
      const newYear= prev-1;
      onYearChange?.(newYear);
      return newYear;
    });
  };
    const handleNextYear = () => {setYear((prev) =>{
      const newYear= prev + 1;
      onYearChange?.(newYear);
      return newYear;
    });
  };
 
    const handleMonthClick =(index) => {
        setSelectedMonth(index);
        onMonthChange(selectedYear,index);
    };
  return(
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            p:2,
            borderRadius:2,
            boxShadow:1,
            width:"100%",
          }}
        >
            <Box
              sx={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                mb:2,
              }}
            >
                <IconButton onClick={handlePrevYear}>
                    <ChevronLeft/>
                </IconButton>
                <Typography variant="h6">{year}</Typography>
                <IconButton onClick={handleNextYear}>
                    <ChevronRight/>
                </IconButton>
            </Box>
            <Grid container spacing={1}>
                {months.map((monthName,index)=>(
                    <Grid item xs={3} key={monthName}>
                        <Box
                          onClick={()=> handleMonthClick(index)}
                          sx={{
                            cursor:"pointer",
                            textAlign:"center",
                            p:1,
                            borderRadius:1,
                            backgroundColor:
                              month ===index  ? "#1976d2" :"ffffff",
                            color:
                              month === index  ? "#ffffff" : "#000000",
                            border:"1px solid #ccc",
                            fontSize:"0.9rem",
                            fontWeight:500,
                            "&:hover":{
                                backgroundColor:"#e0e0e0",
                            },
                          }}
                        >
                            {monthName}
                        </Box>
                    </Grid>
                ))}
            </Grid>  
         </Box>
      );
    };
 
export default MonthYearPicker;
