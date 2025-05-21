import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Activity, TrendingUp, DollarSign, BarChart2, AlertCircle } from 'lucide-react';
import './StockPredictionDashboard.css'; // We'll define this CSS file separately

export default function StockPredictionDashboard() {
  const [stockData, setStockData] = useState([]);
  const [predictionData, setPredictionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [predictionDays, setPredictionDays] = useState(7);
  const [modelAccuracy, setModelAccuracy] = useState(0.93);
  const [recentMetrics, setRecentMetrics] = useState({
    rmse: 4.2,
    mae: 3.1,
    r2: 0.93
  });
  const [technicalIndicators, setTechnicalIndicators] = useState({
    rsi: 58.7,
    macd: 2.4,
    sma20: 165.34,
    sma50: 158.92
  });

  // Mock data for demonstration
  useEffect(() => {
    // This would be replaced with actual API calls in a real implementation
    const mockHistoricalData = Array(100).fill().map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (100 - i));
      const basePrice = 160 + Math.sin(i / 10) * 20;
      const volume = Math.floor(Math.random() * 50000000) + 30000000;

      return {
        date: date.toISOString().split('T')[0],
        actual: parseFloat((basePrice + Math.random() * 5 - 2.5).toFixed(2)),
        open: parseFloat((basePrice - 1 + Math.random() * 2).toFixed(2)),
        high: parseFloat((basePrice + 1.5 + Math.random() * 2).toFixed(2)),
        low: parseFloat((basePrice - 2 + Math.random() * 2).toFixed(2)),
        volume
      };
    });

    const mockPredictions = Array(predictionDays).fill().map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i + 1);
      const lastActual = mockHistoricalData[mockHistoricalData.length - 1].actual;
      const predictedPrice = parseFloat((lastActual + (Math.random() * 10 - 5) + i * 0.5).toFixed(2));
      const confidenceLow = parseFloat((predictedPrice - predictedPrice * 0.03).toFixed(2));
      const confidenceHigh = parseFloat((predictedPrice + predictedPrice * 0.03).toFixed(2));

      return {
        date: date.toISOString().split('T')[0],
        predicted: predictedPrice,
        confidenceLow,
        confidenceHigh
      };
    });

    // Add predictions to the last few points of historical data for visualization
    const lastFiveHistorical = mockHistoricalData.slice(-5).map((point, i) => ({
      ...point,
      predicted: parseFloat((point.actual + (Math.random() * 4 - 2)).toFixed(2))
    }));

    // Update the last 5 points with predictions
    mockHistoricalData.splice(-5, 5, ...lastFiveHistorical);

    setTimeout(() => {
      setStockData(mockHistoricalData);
      setPredictionData(mockPredictions);
      setLoading(false);
    }, 1000);
  }, [predictionDays, selectedStock]);

  const combinedChartData = [
    ...stockData.slice(-30),  // Last 30 days of historical data
    ...predictionData         // Future predictions
  ];

  const handleStockChange = (e) => {
    setLoading(true);
    setSelectedStock(e.target.value);
    // In a real app, this would trigger an API call to get data for the selected stock
    setTimeout(() => setLoading(false), 1000);
  };

  const handlePredictionDaysChange = (e) => {
    setPredictionDays(parseInt(e.target.value));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading stock data...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <TrendingUp className="icon" />
            Stock Price Prediction
          </h1>
          <div className="header-controls">
            <div className="control-group">
              <label htmlFor="stock" className="control-label">Stock</label>
              <select
                id="stock"
                name="stock"
                className="control-select"
                value={selectedStock}
                onChange={handleStockChange}
              >
                <option value="AAPL">AAPL (Apple)</option>

              </select>
            </div>
            <div className="control-group">
              <label htmlFor="prediction-days" className="control-label">Prediction Days</label>
              <select
                id="prediction-days"
                name="prediction-days"
                className="control-select"
                value={predictionDays}
                onChange={handlePredictionDaysChange}
              >
                <option value="3">3 Days</option>
                <option value="7">7 Days</option>
                <option value="14">14 Days</option>
                <option value="30">30 Days</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* Dashboard Overview */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon-container blue">
                <DollarSign className="stat-icon" />
              </div>
              <div className="stat-details">
                <div className="stat-title">Current Price</div>
                <div className="stat-value">
                  ${stockData[stockData.length - 1]?.actual}
                  <span className="stat-change positive">+2.3%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon-container green">
                <Activity className="stat-icon" />
              </div>
              <div className="stat-details">
                <div className="stat-title">Predicted Price (Next Day)</div>
                <div className="stat-value">
                  ${predictionData[0]?.predicted}
                  <span className="stat-change positive">+1.8%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon-container yellow">
                <AlertCircle className="stat-icon" />
              </div>
              <div className="stat-details">
                <div className="stat-title">Model Accuracy</div>
                <div className="stat-value">
                  {(modelAccuracy * 100).toFixed(1)}%
                  <span className="stat-subtitle">RMSE: {recentMetrics.rmse}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon-container purple">
                <Calendar className="stat-icon" />
              </div>
              <div className="stat-details">
                <div className="stat-title">Volume (Last Trading Day)</div>
                <div className="stat-value">
                  {(stockData[stockData.length - 1]?.volume / 1000000).toFixed(1)}M
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="chart-container">
          <h2 className="section-title">Price Forecast ({selectedStock})</h2>
          <div className="chart">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={combinedChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(tick) => {
                    const date = new Date(tick);
                    return `${date.getDate()}/${date.getMonth() + 1}`;
                  }}
                />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip
                  formatter={(value) => [`$${value}`, '']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                  name="Historical Price"
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#10B981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                  name="Predicted Price"
                />
                <Line
                  type="monotone"
                  dataKey="confidenceHigh"
                  stroke="#D1D5DB"
                  strokeWidth={1}
                  dot={false}
                  name="Confidence Upper"
                />
                <Line
                  type="monotone"
                  dataKey="confidenceLow"
                  stroke="#D1D5DB"
                  strokeWidth={1}
                  dot={false}
                  name="Confidence Lower"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metrics and Technical Indicators */}
        <div className="metrics-grid">
          <div className="metrics-card">
            <h2 className="metrics-title">
              <BarChart2 className="metrics-icon" />
              Model Performance Metrics
            </h2>
            <div className="metrics-grid-container">
              <div className="metric-item">
                <h3 className="metric-name">RMSE</h3>
                <p className="metric-value">{recentMetrics.rmse}</p>
                <p className="metric-description">Root Mean Squared Error</p>
              </div>
              <div className="metric-item">
                <h3 className="metric-name">MAE</h3>
                <p className="metric-value">{recentMetrics.mae}</p>
                <p className="metric-description">Mean Absolute Error</p>
              </div>
              <div className="metric-item">
                <h3 className="metric-name">R²</h3>
                <p className="metric-value">{recentMetrics.r2}</p>
                <p className="metric-description">Coefficient of Determination</p>
              </div>
              <div className="metric-item">
                <h3 className="metric-name">Accuracy</h3>
                <p className="metric-value">{(modelAccuracy * 100).toFixed(1)}%</p>
                <p className="metric-description">Direction Prediction Accuracy</p>
              </div>
            </div>
          </div>

          <div className="metrics-card">
            <h2 className="metrics-title">
              <Activity className="metrics-icon" />
              Technical Indicators
            </h2>
            <div className="metrics-grid-container">
              <div className="metric-item">
                <h3 className="metric-name">RSI (14-day)</h3>
                <p className="metric-value">{technicalIndicators.rsi}</p>
                <p className="metric-description">
                  {technicalIndicators.rsi > 70 ? 'Overbought' : technicalIndicators.rsi < 30 ? 'Oversold' : 'Neutral'}
                </p>
              </div>
              <div className="metric-item">
                <h3 className="metric-name">MACD</h3>
                <p className="metric-value">{technicalIndicators.macd}</p>
                <p className="metric-description">
                  {technicalIndicators.macd > 0 ? 'Bullish' : 'Bearish'}
                </p>
              </div>
              <div className="metric-item">
                <h3 className="metric-name">SMA (20-day)</h3>
                <p className="metric-value">${technicalIndicators.sma20}</p>
                <p className="metric-description">
                  {stockData[stockData.length - 1]?.actual > technicalIndicators.sma20 ? 'Above' : 'Below'}
                </p>
              </div>
              <div className="metric-item">
                <h3 className="metric-name">SMA (50-day)</h3>
                <p className="metric-value">${technicalIndicators.sma50}</p>
                <p className="metric-description">
                  {stockData[stockData.length - 1]?.actual > technicalIndicators.sma50 ? 'Above' : 'Below'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Prediction Table */}
        <div className="table-container">
          <h2 className="section-title">Forecast Details</h2>
          <div className="table-responsive">
            <table className="prediction-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Predicted Price</th>
                  <th>Lower Bound</th>
                  <th>Upper Bound</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {predictionData.map((prediction, index) => (
                  <tr key={index} className={index === 0 ? "highlight-row" : ""}>
                    <td>{prediction.date}</td>
                    <td className="price-cell">${prediction.predicted}</td>
                    <td>${prediction.confidenceLow}</td>
                    <td>${prediction.confidenceHigh}</td>
                    <td>97%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p className="footer-text">
          AI-Driven Stock Price Prediction using Time Series Analysis | LSTM Model |
          <span className="footer-highlight"> Accuracy: {(modelAccuracy * 100).toFixed(1)}%</span>
        </p>
      </footer>
    </div>
  );
}