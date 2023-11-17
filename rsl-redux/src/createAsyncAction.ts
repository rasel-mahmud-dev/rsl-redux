const createAsyncThunkWrapper = (() => {
    function createAsyncThunk(
        typePrefix,
        payloadCreator
    ) {
        function actionCreator(arg) {
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

    return createAsyncThunk;
})();

export default createAsyncThunkWrapper;


