import React from 'react';
import ThingSpeakTemperatureGraph from "../components/ThingSpeakTemperatureGraph"
import ThingsSpeakHumidutyGraph from "../components/ThingsSpeakHumidutyGraph";
import ThingSpeakPressureGraph from "../components/ThingSpeakPressureGraph";
import SIdebar from "../components/SIdebar";
const EmployeePage = (props, isAuthorizetion) => {


    return (
        <div>
            <SIdebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}  isAuthorizetion={isAuthorizetion}/>
            <div className="employees-table">
                <ThingSpeakTemperatureGraph channelId="1966150" apiKey="0ASNPTOU1P7D8KQQ" />
                <ThingsSpeakHumidutyGraph channelId="1966150" apiKey="0ASNPTOU1P7D8KQQ" />
                <ThingSpeakPressureGraph channelId="1966150" apiKey="0ASNPTOU1P7D8KQQ"/>
            </div>
        </div>



);
};

export default EmployeePage;
