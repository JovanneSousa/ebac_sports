import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../../App'

type FavState = {
  items: Produto[]
}

const initialState: FavState = {
  items: []
}

const favSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {
    toggleFav: (state, action: PayloadAction<Produto>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      )

      if (index >= 0) {
        state.items.splice(index, 1)
      } else {
        state.items.push(action.payload)
      }
    }
  }
})

export const { toggleFav } = favSlice.actions

export default favSlice.reducer
