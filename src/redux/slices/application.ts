import { createSlice } from "@reduxjs/toolkit";
import { IApplication } from "./type";

const initialState: IApplication = {
  layout: {
    name: 'Layout A',
    layoutChoosing: 1,
  },
  photos: [ `${process.env.NEXT_PUBLIC_API}/frame_image650x480.png`],
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    dispatchLayoutChoosing: (state, {payload}: {payload: IApplication['layout']}) => {
      const layout = {
        name: payload.name,
        layoutChoosing : payload.layoutChoosing
      }
      state.layout = payload
    },
    dispatchPhotos: (state, {payload}: {payload: string[]}) => {
      state.photos = payload
    }
  },
});

export const {
  dispatchLayoutChoosing,
  dispatchPhotos
} = applicationSlice.actions;

export default applicationSlice.reducer;
