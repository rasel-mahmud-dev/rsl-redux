
type PayloadCreator = (payload: string | null | object | Array<any>, thunkApi: any)=>
    Promise<{ arg: any, type: string }>


function createAsyncThunk(typePrefix: string, payloadCreator: PayloadCreator) {
    function actionCreator(arg?: any) {
        return (dispatch, getState, extra) => {
            const result = payloadCreator(arg, {dispatch, getState, extra});
            return Object.assign(result, {
                type: typePrefix,
                arg
            })
        };
    }

    return Object.assign(actionCreator, {
        fulfilled: {type: typePrefix + "/fulfilled", payloadCreator},
        rejected: {type: typePrefix + "/rejected", payloadCreator},
        typePrefix,
    });
}

export default createAsyncThunk;


