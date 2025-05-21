
import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import "./StockPredictor.css";

const StockPredictor = () => {
  const [model, setModel] = useState(null);
  const [inputData, setInputData] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel("/model.json");
        setModel(loadedModel);
        console.log("✅ Model loaded");
      } catch (err) {
        console.error(err);
        setError("Failed to load model.");
      }
    };
    loadModel();
  }, []);


  const handlePredict = async () => {
    if (!model) {
      setError("Model is still loading. Please wait...");
      return;
    }

    try {
      const inputArray = inputData
        .split(",")
        .map((val) => parseFloat(val.trim()))
        .filter((val) => !isNaN(val));

      if (inputArray.length !== 100) {
        setError("Please enter exactly 100 numeric values.");
        return;
      }

      // Convert to Float32Array and reshape
      const floatArray = new Float32Array(inputArray);
      const tensorInput = tf.tensor(floatArray, [1, 100, 1]); // Shape matches InputLayer

      const output = model.predict(tensorInput);
      const result = await output.data();

      setPrediction(result[0]);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error during prediction: " + err.message);
    }
  };


  return (
    <div className="predictor-container">
      <h1>Apple Stock Price Predictor</h1>
      <textarea
        className="input-area"
        rows="6"
        placeholder="Enter 100 prices separated by commas"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <button className="predict-button" onClick={handlePredict}>Predict</button>
      {error && <p className="error">{error}</p>}
      {prediction !== null && (
        <p className="result">Predicted Price: <strong>${prediction.toFixed(2)}</strong></p>
      )}
      {!model && <p style={{ color: "yellow" }}>Loading model...</p>}

    </div>
  );
};

export default StockPredictor;
