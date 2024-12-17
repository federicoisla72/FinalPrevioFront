import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; //despechar las acciones a mi componente, //useselector, nos permite traer items, loading y error (subscribir al store)
import { fetchReservas } from './Redux/reservasSlice';

const formularioReserva = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.reservas); //me quedo con las pripiedades del objeto y me suscribo al stores con state.reservas

  useEffect(() => {
    dispatch(fetchReservas());
  }, [dispatch]); //con el useEffect llamo a fetchReservas (para que llame a la api) a travez del dispach. Con [dispatch] -> solo despacha la accion una sola vez

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar reservas: {error}</p>;

  return (
    <form>
        <h2>Reservas totales SUM</h2>
        {items.map((reserva) => (
        <li>
          id reserva: {reserva.reservaId} - {reserva.residente} - {reserva.fecha} - turno {reserva.turno} dirección: {reserva.direccion}
        </li>
      ))}
    </form>
  );
};

export default formularioReserva;