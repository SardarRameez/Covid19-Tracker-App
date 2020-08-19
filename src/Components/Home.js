import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import img from './../Img/corona.jpg';
import Paper from '@material-ui/core/Paper';
import img2 from './../Img/corona2.gif';
import leftBox1 from './../Img/leftBox1.png';
import leftBox2 from './../Img/leftBox2.png';
import leftBox3 from './../Img/leftBox3.png';
import leftBox4 from './../Img/leftBox4.png';
import rightBox1 from './../Img/rightBox1.png';
import rightBox2 from './../Img/rightBox2.png';
import rightBox3 from './../Img/rightBox3.png';
import rightBox4 from './../Img/rightBox4.png';
import {fetchPakistanData} from './ApiFetch.js';
import {Spinner} from './Spinner.js'
import CountUp from 'react-countup';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color:"#0000CD",
  },
  btn:{
      margin:"20px 20px 10px 20px",
  },
  grd: {
    marginTop:"70px",
  },
  paper: {
    padding:"20px 10px"
  },
  gradient: {
      background: "-webkit-linear-gradient(#17EAD9, #6078EA)",
      WebkitBackgroundClip:"text",
      WebkitTextFillColor:"transparent",
  },
  prevention1: {
    padding: "50px 60px 20px 60px",
    margin:"auto",
    marginBottom:"30px",
    background: "linear-gradient(to right, #fe86a7, #dc624b)",
  },
  prevention2:{
    padding: "50px 60px 20px 60px",
    margin: "auto",
    marginBottom:"30px",
    background: "linear-gradient(to right, #14aff5, #23d0ec)",
  },
  box_heading: {
    textAlign:"center",
    color:"white",
  },
  unstyled: {
    listStyle:"none"
  },
  icon: {
    // position:"relative",
    float:"left"
  },
  disc:{
    paddingLeft:"120px"
  }
}));

export default function Home() {
  const classes = useStyles();
  const [data, setData]=useState({})
  useEffect(()=>{
    async function getData(){
      const newData=await fetchPakistanData()
      setData(newData);
    }
    getData()
  },[])

  return (
    <div className={classes.root} style={{padding:"0px 20px"}}>

      <Grid container spacing={0} className={classes.grd}>   
        <Grid item sm={12} lg={8} style={{padding:"0px 20px 0px 0px"}}>
            <h3>
                <span style={{borderLeft:"70px solid #0000CD",display:"inline-block", height:"5px"}}></span>
                Know About Covid-19</h3>
            <h4 style={{color:"gray"}}>See the Realtime Pakistan and Worldwide COVID-19 situation!</h4>
            <p>The coronavirus, or COVID-19, is inciting panic for a number of reasons. It's a new virus, 
                meaning no one has immunity, and there is no vaccine.
                Its novelty means that scientists aren't sure yet how it behaves they have little history to go on.</p>
                <Button variant="outlined" color="primary" className={classes.btn} href="#pakistanCoronaDetail">Pakistan Cases Details</Button>
                <Button variant="outlined" color="primary" className={classes.btn}>International Cases Details</Button>
        </Grid>
        <Grid item sm={12} lg={4}>
            <img src={img} title="Covid-19"  height="300px" width="430px" alt="corona"/>
        </Grid> 
      </Grid>




      {/* Corona Cases Details */}

      <Grid container spacing={0} className={classes.grd}>

        {/* First block */}
        <Grid item xs={8} lg={4} style={{padding:"0px 20px 0px 0px",lineHeight:"20px",marginBottom:"30px"}} id="pakistanCoronaDetail">
            <h3>
                <span style={{borderLeft:"70px solid #0000CD",display:"inline-block", height:"5px"}}></span>
                Covid-19 in Pakistan</h3>
                <Paper className={classes.paper}>
                    <h2>Confirmed Cases</h2>
                    <h2 style={{textAlign:"center",color:"gray"}}>
                      {(!data[data.length-1])?Spinner():<CountUp start={0} end={data[data.length-1].infected} separator="," duration={2.0}></CountUp>}
                      </h2>
                </Paper>
        </Grid>

        {/* Second Block */}
        <Grid item xs={4} lg={1}>
            <img src={img2} width="120px" height="80px" alt="corona"></img>
        </Grid>

        {/* Third Block */}
        <Grid item sm={12} lg={7}>
            <Grid container spacing={3}>
                <Grid item xs>
                  <Paper className={classes.paper}>
                    <h3>Tests (24 Hours)</h3>
                    <h3 style={{textAlign:"center",color:"gray"}}>
                    {(!data[data.length-1])?Spinner():<CountUp start={0} end={data[data.length-1].tested-data[data.length-2].tested} separator="," duration={2.0}></CountUp>}
                      </h3>
                  </Paper>
                </Grid>
                <Grid item xs>
                  <Paper className={classes.paper}>
                    <h3>Cases (24 Hours)</h3>
                    <h3 style={{textAlign:"center",color:"gray"}}>
                    {(!data[data.length-1])?Spinner():<CountUp start={0} end={data[data.length-1].infected-data[data.length-2].infected} separator="," duration={2.0}></CountUp>}
                    </h3>
                  </Paper>
                </Grid>
                <Grid item xs>
                  <Paper className={classes.paper}>
                    <h3>Deaths (24 Hours)</h3>
                    <h3 style={{textAlign:"center",color:"gray"}}>
                    {(!data[data.length-1])?Spinner():<CountUp start={0} end={data[data.length-1].deceased-data[data.length-2].deceased} separator="," duration={2.0}></CountUp>}
                    </h3>
                  </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs>
                  <Paper className={classes.paper}>
                    <h3>Recovered</h3>
                    <h3 style={{textAlign:"center",color:"green"}}>
                    {(!data[data.length-1])?Spinner():<CountUp start={0} end={data[data.length-1].recovered} separator="," duration={2.0}></CountUp>}
                    </h3>
                  </Paper>
                </Grid>
                <Grid item xs>
                  <Paper className={classes.paper}>
                    <h3>Critical</h3>
                    <h3 style={{textAlign:"center",color:"orange"}}>
                    {(!data[data.length-1])?Spinner():<CountUp start={0} end={(data[data.length-1].infected-data[data.length-1].recovered)/27} separator="," duration={2.0}></CountUp>}
                    </h3>
                  </Paper>
                </Grid>
                <Grid item xs>
                  <Paper className={classes.paper}>
                    <h3>Deaths</h3>
                    <h3 style={{textAlign:"center",color:"red"}}>
                    {(!data[data.length-1])?Spinner():<CountUp start={0} end={data[data.length-1].deceased} separator="," duration={2.0}></CountUp>}
                    </h3>
                  </Paper>
                </Grid>
            </Grid>
            <p style={{textAlign:"right"}}>Last Update : {(!data[data.length-1])?Spinner():new Date(data[data.length-1].lastUpdatedAtSource).toDateString()}</p>
        </Grid> 
      </Grid>


      {/* Prevention */}
      <Grid container spacing={0} className={classes.grd} id="prevention">
          <Grid item xs={12} lg={12} style={{padding:"0px 20px 0px 0px",textAlign:"center",marginBottom:"50px"}}>
                      <h3 className={classes.gradient}>HOW TO STAY SAFE</h3>
                      <div style={{color:"black"}}>
                        <h1 style={{color:"black"}}>Important Precautions</h1>
                        <p>Follow these simple precautions to reduce your chances of contracting the new coronavirus, <br></br> which causes the disease known as COVID-19.</p>
                      </div>         
          </Grid>
      </Grid>

      <Grid container spacing={3}>

        {/* Left Box */}
        <Grid item xs={12} sm={12} md={5} className={classes.prevention1}>
          <div className={classes.box_heading}>
            <h2>THINGS NOT TO DO</h2>
          </div>
          <ul className={classes.unstyled}>
            <li>
              <div className={classes.icon}><img src={leftBox1} alt="Prevention Img"></img></div>
              <div className={classes.disc}>
                <h3 style={{color:"white"}}>Do Not Share Eating</h3>
                <p style={{ color: "#eaebfb"}}>Stop having food around those who ask you for it.</p>
              </div>
            </li>
            <li>
              <div className={classes.icon}><img src={leftBox2} alt="Prevention Img"></img></div>
              <div className={classes.disc}>
                <h3 style={{color:"white"}}>Don’t Touch Your Face or Nose</h3>
                <p style={{ color: "#eaebfb"}}>Avoid animals (alive or dead), animal markets, and products that come from animals (such as uncooked meat).</p>
              </div>
            </li>
            <li>
              <div className={classes.icon}><img src={leftBox3} alt="Prevention Img"></img></div>
              <div className={classes.disc}>
                <h3 style={{color:"white"}}>Avoid Contact with Sick People</h3>
                <p style={{ color: "#eaebfb"}}>Avoid close contact with anyone showing symptoms of respiratory illness.</p>
              </div>
            </li>
            <li>
              <div className={classes.icon}><img src={leftBox4} alt="Prevention Img"></img></div>
              <div className={classes.disc}>
                <h3 style={{color:"white"}}>Avoid Crowded Places (Social Distancing)</h3>
                <p style={{ color: "#eaebfb"}}>As an individual, you can lower your risk of infection by reducing your rate of contact with other people.</p>
              </div>
            </li>
          </ul>
        </Grid>

        {/* Right box */}
        <Grid item xs={12} sm={12} md={5} className={classes.prevention2}>
          <div className={classes.box_heading}>
            <h2>THINGS YOU SHOULD DO</h2>
          </div>
          <ul className={classes.unstyled}>
            <li>
              <div className={classes.icon}><img src={rightBox1} alt="Prevention Img"></img></div>
              <div className={classes.disc}>
                <h3 style={{color:"white"}}>Wash Your Hands For 20sec</h3>
                <p style={{ color: "#eaebfb"}}>Wash hands often with soap and water for at least 20 seconds.</p>
              </div>
            </li>
            <li>
              <div className={classes.icon}><img src={rightBox2}alt="Prevention Img"></img></div>
              <div className={classes.disc}>
                <h3 style={{color:"white"}}>Wear a Mask if Available</h3>
                <p style={{ color: "#eaebfb"}}>You should continue to use the surgical mask in all public places until you are advised.</p>
              </div>
            </li>
            <li>
              <div className={classes.icon}><img src={rightBox3} alt="Prevention Img"></img></div>
              <div className={classes.disc}>
                <h3 style={{color:"white"}}>Cover Nose When Sneezing</h3>
                <p style={{ color: "#eaebfb"}}>Cover your mouth and nose with a tissue or your sleeve (not your hands) when coughing or sneezing.</p>
              </div>
            </li>
            <li>
              <div className={classes.icon}><img src={rightBox4} alt="Prevention Img"></img></div>
              <div className={classes.disc}>
                <h3 style={{color:"white"}}>Seek Medical Care Regularly</h3>
                <p style={{ color: "#eaebfb"}}>Regular health checks can identify any early signs of health issues</p>
              </div>
            </li>
          </ul>
        </Grid>
      </Grid>
    </div>
 );
}
