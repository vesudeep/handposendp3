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

import {RaisedfistGesture} from './RaisedFist';

// Import new stuff
import * as fp from "fingerpose";
import victory from "./victory.png";
import thumbs_up from "./thumbs_up.png";
import i_love_you from "./i_love_you.png";
import raised_first from "./raised_first.png"

import CustomCursor from './CustomCursor';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [emoji, setEmoji] = useState(null);
  const images = {thumbs_up:thumbs_up,victory:victory,i_love_you:i_love_you,raised_first:raised_first};
  var l1;
  var l2;
  var r1;
  var r2;

  // function upxyc(){

  //   xyc.x=l1;
  //   xyc.y=l2;
  // }
  const [xc,upxc] = useState(500);
  const [yc,upyc] = useState(500);


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
      // webcamRef.current.video.width = videoWidth;
      // webcamRef.current.video.height = videoHeight;

      // Set canvas width and height
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      
      // Make detections
      const hand = await net.estimateHands(video);
      
      if(hand.length > 0){
        // console.log(hand[0].annotations.indexFinger[0]);
        // console.log(hand[0].landmarks[8][0]);
        l1 = Math.floor(hand[0].landmarks[9][0]);
        l2 = Math.floor(hand[0].landmarks[9][1]);
        r1 = (l1/640)*1350;
        r2 = (l2/640)*1100;
        document.querySelector('.custom-cursor').style.left=r1+"px";
        document.querySelector('.custom-cursor').style.top=r2+"px";
        // document.elementFromPoint(r1, r2).click();
        // console.log(hand[0].boundingBox);
        const GE = new fp.GestureEstimator([
          // fp.Gestures.VictoryGesture,----------------------------
          // fp.Gestures.ThumbsUpGesture,-------------------------
          loveYouGesture,
          RaisedfistGesture
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        // console.log(gesture);-----------------------
        if(gesture.gestures !== undefined && gesture.gestures.length > 0){
          // ||||console.log(gesture.gestures);
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
          var temp = gesture.gestures[maxConfidence].name;
          if (gesture.gestures[maxConfidence].name === "raised_first"){
            document.elementFromPoint(r1, r2).click();
          }
          // ||||console.log("Hello");raised_first

        }
      }
      
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
      
    }
    
    upxc(l1);
    upyc(l2);
  } 
  // runHandpose();

  useEffect(()=>{runHandpose()},[]);

  return (
    <>
    <div className="App">
        <Webcam ref={webcamRef}
        style={{
          position:"absolute",
          marginLeft:"auto",
          marginRight:"auto",
          left:0,
          right:0,
          zindex:9,
          width:200,
          height:200
          // display: 'none'
        }}/>
        <canvas
          ref={canvasRef}
          style={{
            position:"absolute",
            marginLeft:"auto",
            marginRight:"auto",
            left:50,
            right:500,
            zindex:9,
            width:200,
            height:200,
            // display: 'none'
          }}
        />
        {/* {emoji !==null ? <img src={images[emoji]} style={{
          position:"absolute",
          marginLeft:"auto",
          marginRight:"auto",
          left:0,
          right:0,
          height:100,
          zIndex:9
        }} />:""} */}
      <CustomCursor xx={xc} yy={yc}/>                
      {/* <CustomCursor xx={l1} /> */}
    </div>
    </>
  );
}

export default App;