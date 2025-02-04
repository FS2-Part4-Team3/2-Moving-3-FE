import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MovesListResponse } from '@/interfaces/API/MovesServiceInterface';

interface MovesState {
  page: number;
  pageSize: number;
  keyword: string | undefined;
  orderBy: string;
  serviceType: string;
  serviceArea: 'Active' | 'Inactive';
  designatedRequest: 'Active' | 'Inactive';
  movesList?: MovesListResponse;
  loading: boolean;
  error: string | null;
}

const initialState: MovesState = {
  page: 1,
  pageSize: 10,
  keyword: undefined,
  orderBy: 'UpcomingMoveDate',
  serviceType: '',
  serviceArea: 'Inactive',
  designatedRequest: 'Inactive',
  movesList: undefined,
  loading: false,
  error: null,
};

const movesSlice = createSlice({
  name: 'moves',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
    setOrderBy(state, action: PayloadAction<string>) {
      state.orderBy = action.payload;
    },
    setServiceType(state, action: PayloadAction<string>) {
      state.serviceType = action.payload;
    },
    setServiceArea(state, action: PayloadAction<'Active' | 'Inactive'>) {
      state.serviceArea = action.payload;
    },
    setDesignatedRequest(state, action: PayloadAction<'Active' | 'Inactive'>) {
      state.designatedRequest = action.payload;
    },
    setMovesList(state, action: PayloadAction<MovesListResponse>) {
      state.movesList = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetMovingType(state) {
      state.serviceType = '';
    },
    resetFilter(state) {
      state.serviceArea = 'Inactive';
      state.designatedRequest = 'Inactive';
    },
    setMovesDataInitialization(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setPage,
  setPageSize,
  setKeyword,
  setOrderBy,
  setServiceType,
  setServiceArea,
  setDesignatedRequest,
  setMovesList,
  setLoading,
  setError,
  resetMovingType,
  resetFilter,
  setMovesDataInitialization,
} = movesSlice.actions;
export default movesSlice.reducer;
