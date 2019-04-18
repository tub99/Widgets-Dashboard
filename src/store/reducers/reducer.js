/**
 * reducer
 */

import * as actionTypes from '../actions/action';

const initialState = {
    compressorStatus: {
        temperature: 10,
        pressure: 40,
        isRunning: true
    },
    engineStatus: {
        engineHours: 71615,
        oilPressure: 40,
        engineSpeed: 30
    },
    envHealth: {
        temperatureHealth: {
            intTemp: 1,
            gasTemp: 1,
            emgStop: 0,
        },
        pressureHealth: {
            prRatio: 1,
            disPressure: 0,
            sucPressure: 1
        }

    },
    chartData:{
        machineRuntime:{
            label: 'MACHINE RUNTIMES',
            data:[200, 300, 250, 150, 200, 400, 300],
            color:'skyblue'
        },
        tempProfile:{
            label: 'TEMPERATURE PROFILE',
            data:[200, 300, 250, 150, 200, 400, 300],
            color: 'red'
        }
    }
};

const reducer = (state=initialState, action) => {
	switch(action.type) {
		case "LOAD_DATASET":
			return {
				...state,
				dataHasLoaded: true,
				dataset: action.dataset
			}
		default:
		  return state;
	}
}
export default reducer;