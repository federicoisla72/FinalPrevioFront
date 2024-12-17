import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReserva } from './Redux/reservasSlice';

const formularioReserva = () => {
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state) => state.reservas)
  const { edificios, loadingEdificios, errorEdificios } = useSelector((state) => state.reservas);

  const [formData, setFormData] = useState({
    dni: '',
    residente: '',
    apellido: '',
    direccion: '',
    numDepto: '',
    fecha: '',
    turno: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReserva(formData));
    setFormData({
      dni: '',
      residente: '',
      apellido: '',
      direccion: '',
      numDepto: '',
      fecha: '',
      turno: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="dni" value={formData.dni} onChange={handleChange} placeholder="DNI" required />
      <input name="residente" value={formData.residente} onChange={handleChange} placeholder="Residente" required />
      <input name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" required />
      <select name="direccion" value={formData.direccion} onChange={handleChange} required>
        <option value="">Seleccione un edificio</option>
            {loading ? (
                <option>Carganado...</option>
            ) : (edificios.map((edificios, index) => (
                <option key={index} value={edificios}>
                    {edificios}
                </option>
            )))}
      </select>
      <input name="numDepto" value={formData.numDepto} onChange={handleChange} placeholder="Num. Depto" required />
      <input name="fecha" value={formData.fecha} onChange={handleChange} placeholder="Fecha" required />
      <select name="turno" value={formData.turno} onChange={handleChange}>
        <option value="">Seleccione un turno</option>
        <option value="Tarde">Tarde</option>
        <option value="Noche">Noche</option>
      </select>
      <button type="submit" disabled = {loading}>
        {loading ? 'Creando...' : 'Reservar'}
      </button>
      <p style={{color : 'red'}}>{error}</p>
    </form>
  );
};

export default formularioReserva;