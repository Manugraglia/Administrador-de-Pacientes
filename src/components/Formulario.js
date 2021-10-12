import React, { Fragment, useState } from "react";
import uuid from "uuid/dist/v4";
import PropTypes from "prop-types";

const Formulario = ({ crearCita }) => {
  // Crear State de Citas
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    hora: "",
    fecha: "",
    sintomas: "",
  });
  const [error, actualizarError] = useState(false);

  // Funcion que se ejecuta cada vez que el usuario escribe en un input
  const actualizarState = (e) => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  // Extraer los valores
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // Cuando el usuario preciona agregar cita
  const submitCita = (e) => {
    e.preventDefault();

    // Validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      actualizarError(true);
      return;
    }

    // Eliminar el mensaje previo
    actualizarError(false);

    // Asignar ID
    cita.id = uuid();

    // Crear la Cita
    crearCita(cita);

    // Reiniciar el Form
    actualizarCita({
      mascota: "",
      propietario: "",
      hora: "",
      fecha: "",
      sintomas: "",
    });
  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>

      {error ? (
        <p className="alerta-error">Todos los campos son Obligatorios</p>
      ) : null}

      <form onSubmit={submitCita}>
        <label>Nombre Mascotas</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={mascota}
        />
        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre de Dueño de la Mascota"
          onChange={actualizarState}
          value={propietario}
        />
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />
        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />
        <label>Sintomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};

export default Formulario;
