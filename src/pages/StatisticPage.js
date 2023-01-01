import React from 'react';
import ThingSpeakTemperatureGraph from "../components/ThingSpeakTemperatureGraph"
import ThingsSpeakHumidutyGraph from "../components/ThingsSpeakHumidutyGraph";
import ThingSpeakPressureGraph from "../components/ThingSpeakPressureGraph";
import SIdebar from "../components/SIdebar";
const EmployeePage = ({ isAuthorizetion, languageState, setLanguageState}) => {


    return (
        <div>
            <SIdebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}  isAuthorizetion={isAuthorizetion} languageState={languageState} setLanguageState={setLanguageState}/>
            <div className="employees-table">
                <ThingSpeakTemperatureGraph channelId="1966150" apiKey="0ASNPTOU1P7D8KQQ" languageState={languageState}/>
                <ThingsSpeakHumidutyGraph channelId="1966150" apiKey="0ASNPTOU1P7D8KQQ" languageState={languageState}/>
                <ThingSpeakPressureGraph channelId="1966150" apiKey="0ASNPTOU1P7D8KQQ" languageState={languageState}/>
            </div>
        </div>



);
};

export default EmployeePage;
