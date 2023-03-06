import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    alarm: false,
    normal: false,
    offline: false,
  },
}

export const networkMonitoringSlice = createSlice({
  name: 'networkMonitoring',
  initialState,
  reducers: {
    setNetworkMonitoring: (state, value) => {
      // Redux Toolkit允许我们在reducers中直接写改变state的逻辑.
      // 由于使用了Immer库,所以并没有真的改变state
      // 而是检测到“草稿state”的更改并根据这些更改生成一个全新的不可变state
      state.value = value.payload
    },
    reset: (state) => {
      state.value = {
        alarm: false,
        normal: false,
        offline: false,
      }
    }
  },
})

// reducer方法的每一个case都会生成一个Action
export const { setNetworkMonitoring, reset } = networkMonitoringSlice.actions

export default networkMonitoringSlice.reducer