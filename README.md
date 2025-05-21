# Stock Prediction Dashboard


![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.10.0-ff6f00)
![Recharts](https://img.shields.io/badge/Recharts-2.7.2-22b5bf)



## 📈 Overview

Stock Prediction Dashboard is a modern React application that uses machine learning (LSTM neural networks) to forecast stock prices. The dashboard provides real-time price predictions, technical indicators, and model performance metrics in an intuitive interface.

### Key Features:

- **AI-Powered Price Forecasting**: Uses TensorFlow.js and LSTM models to predict future stock prices
- **Interactive Charts**: Visualize historical data and predictions with confidence intervals
- **Technical Indicators**: View RSI, MACD, and moving averages at a glance
- **Performance Metrics**: Monitor RMSE, MAE, and R² to evaluate prediction accuracy
- **Responsive Design**: Optimized for both desktop and mobile devices

## 🚀 Demo

Check out the live demo: [Stock Prediction Dashboard]()





## 💻 Technologies Used

- **React**: UI library for building the interface
- **TensorFlow.js**: Machine learning library for in-browser predictions
- **Recharts**: React charting library for data visualization
- **Lucide React**: Icon library for UI elements

## 🧠 ML Model Architecture

The stock price prediction uses an LSTM (Long Short-Term Memory) neural network:

- Input: 100 days of historical price data
- Architecture: 
  - 2 LSTM layers (150 units each)
  - Dropout layers (0.2) to prevent overfitting
  - Dense output layer
- Output: Price predictions for 3-30 days ahead

## 🔍 How It Works

1. **Data Processing**:
   - Historical stock data is normalized using min-max scaling
   - Time series is structured into sequential input-output pairs
   
2. **Prediction**:
   - The TensorFlow.js model runs in the browser
   - Input: Last 100 days of price data
   - Output: Predicted prices with confidence intervals

3. **Visualization**:
   - Interactive charts display historical and predicted values
   - Technical indicators provide additional market context

## 🧪 Known Issues and Limitations

- Performance may vary based on browser and device capabilities
- Model retraining is not yet available in the browser


