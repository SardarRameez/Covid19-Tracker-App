import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import {Line, Bar} from 'react-chartjs-2';
import {fetchData} from './ApiFetch'
import {fetchCountries} from './ApiFetch'
import {fetchDailyData} from './ApiFetch'
import CountUp from 'react-countup';
import {Spinner} from './Spinner'
import NativeSelect from '@material-ui/core/NativeSelect';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),

  },
  coronaCards: {
      marginTop:"30px",
      margin:"auto",
  },
  infected: {
    borderBottom:"10px solid rgb(0,0,255,0.7)",
    borderRadius:"10px"
  },
  recovered:{
    borderBottom:"10px solid rgb(0,255,0,0.7)",
    borderRadius:"10px"
  },
  deaths: {
    borderBottom:"10px solid rgb(255,0,0,0.7)",
    borderRadius:"10px"
  },
  formControl: {
    margin: theme.spacing(3),
    minWidth: "200px",
  },
  marginAuto: {
    margin:"auto",
  }
}));

// Function 

export const Stats=()=> {

  const classes = useStyles();
  const [data,setdata]=useState({})
  const [countries, setCountries]=useState({})
  const [country, setCountry]=useState();
  const [dailyData, setDailyData]=useState("");

  useEffect(()=>{
    async function fetchApi(){
      const newData=await fetchData()
      setdata(newData)
    }
    fetchApi()
  },[])
  useEffect(()=>{
    async function fetchCountriesData(){
      const newData=await fetchCountries()
      setCountries(newData)
    }
    fetchCountriesData()
  },[])
  async function fetchCountryData(country){
    const newData=await fetchData(country)
    console.log(newData)
    setCountry(country)
    setdata(newData)
  }
  useEffect(()=>{
    async function getDailyData(){
      const newData=await fetchDailyData()
      setDailyData(newData)
    }
    getDailyData()
  },[])

  // Line and BarCharts
  const LineChart = (dailyData.length?(
  <Line
    data={
      {
        labels:dailyData.map((data)=>data.reportDate),
        datasets:[
          {
            data:dailyData.map((data)=>data.confirmed.total),
            label:"Infected",
            borderColor: '#3333ff',
            fill:true
          },
          {
            data:dailyData.map((data)=>data.deaths.total),
            label:"Deaths",
            borderColor: 'red',
            backgroundColor:'rgb(255,0,0,0.5)',
            fill:true
          }
        ]
      }
    }
  ></Line>
):null)

const BarChart=(data.confirmed?(
  <Bar
    data={{
      labels:["Infected","Recovered","Deaths"],
      datasets:[{
        label:"People",
        backgroundColor:["rgb(0,0,255,0.5)", "rgb(0,255,0,0.5)", "rgb(255,0,0,0.5)"],
        data:[data.confirmed.value,data.recovered.value,data.deaths.value]
      }]
    }}
    options={{
      legend:{display:false},
      title:{display:true,text:"Current State in "+ country}
    }}
  ></Bar>
):null)

  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.coronaCards}>

        {/* Infected */}
        <Grid item xs={10} sm={8} md={3} className={classes.coronaCards+" "+classes.infected}>
          <Paper className={classes.paper}>
             <Typography color="textSecondary" gutterBottom>Infected</Typography>
             <Typography variant="h5">
                  {(!data.confirmed)?Spinner():<CountUp start={0} end={data.confirmed.value} duration={2.5} separator=","></CountUp>}                 
              </Typography>
              <Typography color="textSecondary">{new Date(data.lastUpdate).toDateString()}</Typography>
              <Typography variant="body2">Total Cases</Typography>
          </Paper>
        </Grid>


        {/* Recovered */}
        <Grid item xs={10} sm={8} md={3} className={classes.coronaCards+" "+classes.recovered}>
          <Paper className={classes.paper}>
              <Typography color="textSecondary" gutterBottom>Recovered</Typography>
              <Typography variant="h5">
              {(!data.confirmed)?Spinner():<CountUp start={0} end={data.recovered.value} duration={2.5} separator=","></CountUp>}
              </Typography>
              <Typography color="textSecondary">{new Date(data.lastUpdate).toDateString()}</Typography>
              <Typography variant="body2">Total Recovered Cases</Typography>
          </Paper>
        </Grid>

        {/* Deaths */}
        <Grid item xs={10} sm={8} md={3} className={classes.coronaCards+" "+classes.deaths}>
          <Paper className={classes.paper}>
              <Typography color="textSecondary" gutterBottom>Deaths</Typography>
              <Typography variant="h5">
              {(!data.confirmed)?Spinner():<CountUp start={0} end={data.deaths.value} duration={2.5} separator=","></CountUp>}
              </Typography>
              <Typography color="textSecondary">{new Date(data.lastUpdate).toDateString()}</Typography>
              <Typography variant="body2">Deaths due to Covid19</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Selector */}
      <Grid container>
        <Grid item lg={3} className={classes.marginAuto}>
          <FormControl className={classes.formControl}>
            <NativeSelect defaultValue="" onChange={(e)=>{fetchCountryData(e.target.value)}}>
            {/* <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={country}
              onChange={(e)=>{fetchCountryData(e.target.value)}}
            > */}
              <option value=''>Global</option>
             {(!countries.countries)?Spinner():countries.countries.map((country,i)=><option value={country.name} key={i}>{country.name}</option>)}
            {/* </Select> */}
            </NativeSelect>
            <FormHelperText>Select Country</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={8} lg={8} className={classes.marginAuto}>
      <div>
        <h2>Line Example</h2>
        {country?BarChart:LineChart}
      </div>
      </Grid>
    </Grid>
  </div>
  );
}
