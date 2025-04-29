import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Progress {
  progress: number;
  id: string;
}

interface UploadState {
  progresses: { [id: string]: Progress };
}

const initialState: UploadState = {
  progresses: {},
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setUploadProgress(state, action: PayloadAction<Progress>) {
      const { id, progress } = action.payload;
      state.progresses[id] = { id, progress };
    },
  },
});

export const { setUploadProgress } = uploadSlice.actions;
export default uploadSlice.reducer;
