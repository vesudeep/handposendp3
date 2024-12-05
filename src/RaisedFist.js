// Import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const RaisedfistGesture = new GestureDescription('raised_first'); 

// Thumb 
RaisedfistGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
RaisedfistGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.95);
RaisedfistGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.95);

// Index
RaisedfistGesture.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
RaisedfistGesture.addDirection(Finger.Index, FingerDirection.VerticalDown, 0.85);

//Middle
RaisedfistGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0); 
RaisedfistGesture.addDirection(Finger.Middle, FingerDirection.VerticalDown, 0.85);

//Ring
RaisedfistGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0); 
RaisedfistGesture.addDirection(Finger.Ring, FingerDirection.VerticalDown, 0.85);

// Pinky
RaisedfistGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
RaisedfistGesture.addDirection(Finger.Pinky, FingerDirection.VerticalDown, 0.85);

// for(let finger of [Finger.Middle, Finger.Ring]){
//     loveYouGesture.addCurl(finger, FingerCurl.FullCurl, 0.75); 
//     loveYouGesture.addDirection(finger, FingerDirection.VerticalDown, 0.25);
// }



