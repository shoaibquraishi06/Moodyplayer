import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './FaceialExpresssion.css';
import axios from 'axios'


export default function FacialExpression({setSongs}) {
    const videoRef = useRef();

    const loadModels = async () => {
        const MODEL_URL = '/models';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((err) => console.error("Error accessing webcam: ", err));
    };

    async function detectMood() {

        const detections = await faceapi
            .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();
        let mostProableExpression = 0
        let _expression = '';

        if (!detections || detections.length === 0) {
            console.log("No face detected");
            return;
        }

        for (const expression of Object.keys(detections[ 0 ].expressions)) {
            if (detections[ 0 ].expressions[ expression ] > mostProableExpression) {
                mostProableExpression = detections[ 0 ].expressions[ expression ]
                _expression = expression;
            }
        }

        console.log(_expression)
        axios.get(`http://localhost:3000/songs?mood=${_expression}`)
        .then((response) =>{
            console.log('songs from server', response.data);
            setSongs(response.data.song)
        }).catch((err) =>{
            console.log(err);
        })
    }

    useEffect(() => {




        loadModels().then(startVideo);

    }, []);

    return (
        <div className='mood-element'>
            <video
                ref={videoRef}
                autoPlay
                muted
                className='user-video-feed'
            />
           
             <div className="des-sec">
                  <button className='user-button' onClick={detectMood}>Detect Mood</button>
            <p>This website appears to be a mood-based music recommendation platform that analyzes user emotions through facial detection and suggests personalized songs accordingly. It features a "Detect Mood" button and displays recommended songs. </p>
             </div>
        </div>
    );
}
