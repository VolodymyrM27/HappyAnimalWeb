import React, { useEffect, useState } from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const ThingSpeakFieldsGraph = (props) => {
    const { channelId, apiKey } = props;
    const [data, setData] = React.useState([]);

    const fetchData = async () => {
        const response = await fetch(
            `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}`
        );
        const json = await response.json();
        setData(
            json.feeds.map((feed) => ({
                Humidity: feed.field2,
                timestamp: feed.created_at,
            }))

        );
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    React.useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const maxTemperature = Math.max(...data.map(entry => entry.Humidity));
    const minTemperature = Math.min(...data.map(entry => entry.Humidity));
    console.log(maxTemperature)
    console.log(data)
    return (
        <div>
            <h2>Humidity</h2>
            <LineChart width={600} height={300} data={data}>
                <Line type="monotone" dataKey="Humidity" stroke="#8884d8" />
                <XAxis dataKey="timestamp" />
                <YAxis domain={[minTemperature, maxTemperature]} />
                <Tooltip />
            </LineChart>
        </div>
    );
};

export default ThingSpeakFieldsGraph;
