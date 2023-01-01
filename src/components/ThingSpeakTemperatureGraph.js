import React, {  } from 'react';
import { Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import LocalizedStrings from "react-localization";
import moment from 'moment';

let stringsText = new LocalizedStrings({
    en:{
        Temperature: "Temperature"

    },
    uk: {
        Temperature: "температура"
    }
});

const ThingSpeakFieldsGraph = (props) => {
    stringsText.setLanguage(props.languageState)

    const { channelId, apiKey } = props;
    const [data, setData] = React.useState([]);

    const fetchData = async () => {
        const response = await fetch(
            `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}`
        );
        const json = await response.json();
        setData(
            json.feeds.map((feed) => ({
                temperature: feed.field1,
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


    const maxTemperature = Math.round(Math.max(...data.map(entry => entry.temperature)));
    const minTemperature = Math.round(Math.min(...data.map(entry => entry.temperature)));
console.log(maxTemperature)
    console.log(data)
    return (
        <div>
            <h2>{stringsText.Temperature}</h2>
            <LineChart width={600} height={300} data={data}>
                <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                <XAxis dataKey="timestamp" tickFormatter={date => moment(date).format('DD-MM-YYYY')}/>
                <YAxis domain={[minTemperature, maxTemperature]} />
                <Tooltip />
            </LineChart>
        </div>
    );
};

export default ThingSpeakFieldsGraph;
