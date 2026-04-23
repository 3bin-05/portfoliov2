import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "../assets/css/GitHubHeatmap.css";

const GitHubHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const username = "3bin-05";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
        const data = await response.json();
        
        // Flatten the contributions array and map levels
        const flattened = data.contributions.flat().map(day => {
          let level = 0;
          switch (day.contributionLevel) {
            case 'FIRST_QUARTILE': level = 1; break;
            case 'SECOND_QUARTILE': level = 2; break;
            case 'THIRD_QUARTILE': level = 3; break;
            case 'FOURTH_QUARTILE': level = 4; break;
            default: level = 0;
          }

          return {
            date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            count: day.contributionCount,
            level,
            month: new Date(day.date).getMonth()
          };
        });

        setHeatmapData(flattened);
        setTotalContributions(data.totalContributions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  // Identify where months start to place labels
  const monthLabels = useMemo(() => {
    if (!heatmapData.length) return [];
    const labels = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let lastMonth = -1;

    heatmapData.forEach((day, index) => {
      if (index % 7 === 0) { // Only check start of weeks
        const currentMonth = day.month;
        if (currentMonth !== lastMonth) {
          labels.push({ name: months[currentMonth], index: Math.floor(index / 7) });
          lastMonth = currentMonth;
        }
      }
    });
    return labels;
  }, [heatmapData]);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  if (loading) {
    return (
      <div className="heatmap-section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '150px' }}>
        <div style={{ color: 'var(--color-text-light)', fontSize: '1.4rem' }}>Loading contributions...</div>
      </div>
    );
  }

  return (
    <div className="heatmap-section">
      <div className="heatmap-container" onMouseMove={handleMouseMove}>
        <div className="heatmap-wrapper">
          {/* Month Labels */}
          <div className="heatmap-months">
            {monthLabels.map((label, i) => (
              <div 
                key={i} 
                className="month-label" 
                style={{ marginLeft: i === 0 ? '0' : 'auto' }}
              >
                {label.name}
              </div>
            ))}
          </div>

          <div className="heatmap-main">
            {/* Day Labels */}
            <div className="heatmap-days-labels">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Grid */}
            <div className="heatmap-grid">
              {heatmapData.map((day, i) => (
                <div
                  key={i}
                  className={`heatmap-cell level-${day.level}`}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                />
              ))}
            </div>
          </div>

          <div className="heatmap-footer">
            <div className="heatmap-stats">
              <span>{totalContributions.toLocaleString()}</span> contributions in the last year
            </div>
            
            <div className="heatmap-legend">
              <span>Less</span>
              <div className="legend-cells">
                <div className="legend-cell level-0"></div>
                <div className="legend-cell level-1"></div>
                <div className="legend-cell level-2"></div>
                <div className="legend-cell level-3"></div>
                <div className="legend-cell level-4"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredDay && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="heatmap-tooltip"
            style={{
              position: 'fixed',
              left: mousePos.x + 15,
              top: mousePos.y - 40,
            }}
          >
            <strong>{hoveredDay.count} contributions</strong> on {hoveredDay.date}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GitHubHeatmap;
