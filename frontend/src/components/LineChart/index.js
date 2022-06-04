import React from "react";

//Chart
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

//Data
import { data } from "./Data";

//Styles
import "./LineChart.scss";

const LineChart = () => {
    return (
        <div className="transactions">
            <div className="transactions__topblock">
                <div className="transactions__topblock__left">
                    <span>100%</span>
                    <span>0%</span>
                </div>
                <div className="transactions__topblock__graph">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            width={500}
                            height={400}
                            data={data}
                            margin={{
                                top: 10,
                            }}
                        >
                            <defs>
                                <linearGradient
                                    id="colorview"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="30%"
                                        stopColor="#9D69F8"
                                        stopOpacity={1}
                                    />
                                    <stop
                                        offset="85%"
                                        stopColor="#fff"
                                        stopOpacity={0.2}
                                    />
                                </linearGradient>
                            </defs>
                            <Tooltip cursor={false} className="tooltip" />
                            <Area
                                type="monotone"
                                dataKey="Уровень ROI"
                                stroke="transparent"
                                fill="url(#colorview)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="transactions__bottomblock">
                <span>15.08.2022</span>
                <span>15.08.2022</span>
            </div>
        </div>
    );
};

export default LineChart;
