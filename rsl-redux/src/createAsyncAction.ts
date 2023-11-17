const createAsyncThunkWrapper = (() => {
    function createAsyncThunk(
        typePrefix,
        payloadCreator
    ) {
        const fulfilled = {
            type: typePrefix + '/fulfilled',
            payloadCreator
        }

        function actionCreator(arg) {
            return (dispatch, getState, extra) => {
                const promise = payloadCreator(arg, {dispatch, getState, extra});
                return Object.assign(promise, {
                    type: typePrefix + '/fulfilled',
                    arg
                });
            };
        }

        return Object.assign(actionCreator, {
            fulfilled,
            typePrefix,
        });
    }

    return createAsyncThunk;
})();

export default createAsyncThunkWrapper;


