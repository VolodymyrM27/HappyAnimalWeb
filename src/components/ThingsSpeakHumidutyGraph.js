import React, {   } from 'react';
import {Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import LocalizedStrings from "react-localization";
import moment from "moment";


let stringsText = new LocalizedStrings({
    en:{
        Humidity: "Humidity"

    },
    uk: {
        Humidity: "вологість"
    }
});

const ThingSpeakFieldsGraph = (props) => {
    stringsText.setLanguage(props.languageState)

    console.log(props)
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

    const maxTemperature = Math.round(Math.max(...data.map(entry => entry.Humidity)));
    const minTemperature = Math.round(Math.min(...data.map(entry => entry.Humidity)));
    console.log(maxTemperature)
    console.log(data)
    return (
        <div>
            <h2>{stringsText.Humidity}</h2>
            <LineChart width={600} height={300} data={data}>
                <Line type="monotone" dataKey="Humidity" stroke="#8884d8" />
                <XAxis dataKey="timestamp" tickFormatter={date => moment(date).format('DD-MM-YYYY')}/>
                <YAxis domain={[minTemperature, maxTemperature]} />
                <Tooltip />
            </LineChart>
        </div>
    );
};

export default ThingSpeakFieldsGraph;
