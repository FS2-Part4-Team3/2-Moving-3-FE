import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface DriverState {
  page: number;
  pageSize: number;
  keyword: string | undefined;
  orderBy: string | undefined;
  area: string | undefined;
  serviceType: string | undefined;
  driverList: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DriverState = {
  page: 1,
  pageSize: 10,
  keyword: undefined,
  orderBy: undefined,
  area: undefined,
  serviceType: undefined,
  driverList: [],
  loading: false,
  error: null,
};

const driverSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setKeyword(state, action: PayloadAction<string | undefined>) {
      state.keyword = action.payload;
    },
    setOrderBy(state, action: PayloadAction<string>) {
      state.orderBy = action.payload;
    },
    setArea(state, action: PayloadAction<string | undefined>) {
      state.area = action.payload;
    },
    setServiceType(state, action: PayloadAction<string | undefined>) {
      state.serviceType = action.payload;
    },
    setDriverList(state, action: PayloadAction<any[]>) {
      state.driverList = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetSelection(state) {
      state.area = undefined;
      state.serviceType = undefined;
    },
  },
});

export const {
  setPage,
  setPageSize,
  setKeyword,
  setOrderBy,
  setArea,
  setServiceType,
  setDriverList,
  setLoading,
  setError,
  resetSelection,
} = driverSlice.actions;
export default driverSlice.reducer;
