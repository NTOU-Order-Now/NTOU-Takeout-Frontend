import PropTypes from "prop-types";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useState, useEffect } from "react";

const StatisticChart = ({ data }) => {
    const [chartWidth, setChartWidth] = useState(Math.min(350, window.innerWidth - 40));
    const [chartRadius, setChartRadius] = useState(Math.max(50, chartWidth / 3));

    useEffect(() => {
        const handleResize = () => {
            const newWidth = Math.min(350, window.innerWidth - 40);
            setChartWidth(newWidth);
            setChartRadius(Math.max(50, newWidth / 4));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const generateColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const hue = (i * 360) / count;
            colors.push(`hsl(${hue}, 55%, 60%)`);
        }
        return colors;
    };

    const COLORS = generateColors(data.length);
    const normalizedData = data.map(item => ({
        ...item,
        value: parseFloat(item.value),
    }));

    return (
        <div className="flex justify-center font-notoTC font-semibold text-sm break-words overflow-hidden">
            <PieChart width={chartWidth} height={chartWidth}>
                <Pie
                    data={normalizedData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={chartRadius}
                    fill="#8884d8"
                    // label={({ name }) => name.length > 6 ? `${name.slice(0, 6)}...` : name}
                >
                    {normalizedData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

StatisticChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // 銷售百分比或數量
        })
    ).isRequired,
};

export default StatisticChart;
