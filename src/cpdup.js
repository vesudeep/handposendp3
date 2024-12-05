//1. Install Dependencies Done
//2. Import dependencies Done
//3. Setup webcam and canvas Done
//4. Define references to those Done
//5. Load handpose Done
//6. Detect function Done
//7. Drawing utilities from tensorflow
//8. Draw functions

// 0. install fingerpose npm install fingerpose DONE
// 1. add use state DONE
// 2. import emojis and finger pose import * as fp from "fingerpose"; DONE
// 3. update detect function for gesture handling
// 4. setup hook and emoji object
// 5. add emoji display to the screen

// 0. Clone the gestures repo Done
// 0. Install packages Done
// 1. create new gesture defenition Done
// Import the gesture into handpose Done

import React, {useRef, useState, useEffect} from 'react';
// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from 'react-webcam';
import './App.css';
import { drawHand } from './utilities';

import {loveYouGesture} from './LoveYou';

// Import new stuff
import * as fp from "fingerpose";
import victory from "./victory.png";
import thumbs_up from "./thumbs_up.png";
import i_love_you from "./i_love_you.png";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [emoji, setEmoji] = useState(null);
  const images = {thumbs_up:thumbs_up,victory:victory,i_love_you:i_love_you};

  const runHandpose = async() =>{
    const net = await handpose.load();
    console.log('Handpose model loaded.');
    // Loop and detect hands
    setInterval(() => {
      detect(net);
    },100);
  };

  const detect = async(net) =>{
    // Check data is available
    if(
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ){
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      
      // Set video width and height
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width and height
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      
      // Make detections
      const hand = await net.estimateHands(video);
      console.log(hand);
      if(hand.length > 0){
        // console.log(hand[0].boundingBox);
        const GE = new fp.GestureEstimator([
          // fp.Gestures.VictoryGesture,----------------------------
          // fp.Gestures.ThumbsUpGesture,-------------------------
          loveYouGesture
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        // console.log(gesture);-----------------------
        if(gesture.gestures !== undefined && gesture.gestures.length > 0){
          console.log(gesture.gestures);
          const confidence = gesture.gestures.map(
            (prediction) => prediction.score 
          );

          // const dem=Object.getOwnPropertyNames(confidence);------------------------
          // console.log(dem);--------------------------------
          // const len=Object.keys(dem).length-1;-----------------------------
          // console.log(dem[len-1]);--------------------------

          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence) 
          );
          setEmoji(gesture.gestures[maxConfidence].name); 
          console.log(gesture.gestures[maxConfidence].name);
          console.log("Hello");
        }
      }
      
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  } 
  runHandpose();

  // useEffect(()=>{runHandpose()},[]);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <Webcam ref={webcamRef}
        style={{
          position:"absolute",
          marginLeft:"auto",
          marginRight:"auto",
          left:0,
          right:0,
          textAlign:"center",
          zindex:9,
          width:640,
          height:480
        }}/>
        <canvas
          ref={canvasRef}
          style={{
            position:"absolute",
            marginLeft:"auto",
            marginRight:"auto",
            left:0,
            right:0,
            textAlign:"center",
            zindex:9,
            width:640,
            height:480
          }}
        />
        {emoji !==null ? <img src={images[emoji]} style={{
          position:"absolute",
          marginLeft:"auto",
          marginRight:"auto",
          left:400,
          bottom:500,
          right:0,
          textAlign:"center",
          height:100,
        }} />:""}
      </header>
    </div>
  );
}

export default App;