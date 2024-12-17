import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Thunks para las solicitudes HTTP
export const fetchReservas = createAsyncThunk('reservas/fetchReservas', async () => {
  const {data} = await axios.get('http://localhost:4002/reservas');
  return data;
}); //defino una accion "fetchReservas" que es una accion asincrona para tener la lista de reservas, ma trae como respuesta una promeesa (tiene 3 posibles resultados: pendiente, exitosa o rechaza)
    //'reservas/fetchReservas' -> me indica que voy a obtener las reservas

export const fetchEdificios = createAsyncThunk('edificios/fetchEdificios', async () => {
  const {data} = await axios.get('http://localhost:4002/reservas/edificios');
    return data;
}); 

export const createReserva = createAsyncThunk('reservas/createReserva', async (nuevaReserva, {rejectWithValue}) => {
  try {
    const {data} = await axios.post('http://localhost:4002/reservas', nuevaReserva);
    return data;
  } catch (error) {
    if(error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue({message: "error desconocido..."});
  }
});

const postSlice = createSlice({
  name: "reservas",
  initialState: {
    items: [], // si las promesas se resuelven bien voy a almacenar los datos aca
    loading: false, //en caso de que este cargando, ledigo que inicialice en false
    error: null, //en caso de que de error, le digo que inicialice en null
    edificios: []
  }, //estado inicial maneja todos los estados de mi promesa
  reducers: {}, //contienen funciones que permiten actualizar el estado de forma sincronica, e}
  extraReducers: (builder) => {
    builder
    .addCase(fetchReservas.pending, (state) => {
      state.pending = true;
      state.error = null;
    })
    .addCase(fetchReservas.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    })
    .addCase(fetchReservas.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    })
    .addCase(createReserva.pending, (state) => {
      state.pending = true;
    })
    .addCase(createReserva.fulfilled, (state, action) => {
      state.loading = false;
      state.items.push(action.payload);
    })
    .addCase(createReserva.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload?.message || 'Error desconocido...';
    })
    .addCase(fetchEdificios.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchEdificios.fulfilled, (state, action) => {
      state.loading = false;
      state.edificios = action.payload;
    })
    .addCase(fetchEdificios.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }, // se usan para como van a reaccionar las slices cuando desde un componente llame a los fetch o create
});

export default postSlice.reducer