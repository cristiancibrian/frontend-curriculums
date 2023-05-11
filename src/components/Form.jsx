import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/variables';
import Swal from 'sweetalert2';
import axios from 'axios';

import ReactLoading from 'react-loading'
import './Form.css'


const Form = () => {
  const [foto, setFoto] = useState({});
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [lugarTrabajo, setLugarTrabajo] = useState("");
  const [puesto, setPuesto] = useState("");
  const [sueldo, setSueldo] = useState("");
  const [descripcionActividades, setDescripcionActividades] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleFoto = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("imagen", foto);
    formData.append("nombre", nombre);
    formData.append("apellido_paterno", apellidoPaterno);
    formData.append("apellido_materno", apellidoMaterno);
    formData.append("fecha_nacimiento", fechaNacimiento);
    formData.append("telefono", telefono);
    formData.append("lugar_trabajo", lugarTrabajo);
    formData.append("puesto", puesto);
    formData.append("sueldo", sueldo);
    formData.append("descripcion_actividades", descripcionActividades);
    try {
      const response = await axios.post(
        `${API_URL}/crear`,
        formData
      );
      if(response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.error,
      })
    }

    setIsLoading(false)
  };

  return (
    <div className='formulario'>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>

        <div className="row">
        <fieldset>
          <legend>Información personal</legend>

          <div className="campo">
          <input
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleFoto}
          />
        </div>
        <div className="campo">
          <label htmlFor="nombre">Nombre <span className='obligatorio'>(obligatorio)</span></label>
          <input
            type="text"
            name="nombre"
            id='nombre'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
        <label htmlFor="apellido_paterno">Apellido paterno <span className='obligatorio'>(obligatorio)</span></label>
          <input
            type="text"
            name="apellido_paterno"
            id='apellido_paterno'
            value={apellidoPaterno}
            onChange={(e) => setApellidoPaterno(e.target.value)}
          />
        </div>
        <div className="campo">
        <label htmlFor="apellido_materno">Apellido materno</label>
          <input
            type="text"
            name="apellido_materno"
            id='apellido_materno'
            value={apellidoMaterno}
            onChange={(e) => setApellidoMaterno(e.target.value)}
          />
        </div>
        <div className="campo">
        <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
          <input
            type="date"
            name="fecha_nacimiento"
            id='fecha_nacimiento'
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="telefono">Teléfono <span className='obligatorio'>(obligatorio)</span></label>
          <input
            type="tel"
            name="telefono"
            id='telefono'
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        </fieldset>
        

        <fieldset>
          <legend>Experiencia laboral</legend>

          <div className="campo">
          <label htmlFor="lugar_trabajo">Lugar de trabajo</label>
          <input
            type="text"
            name="lugar_trabajo"
            id='lugar_trabajo'
            value={lugarTrabajo}
            onChange={(e) => setLugarTrabajo(e.target.value)}
          />
        </div>
        <div className="campo">
         <label htmlFor="puesto">Puesto</label>
          <input
            type="text"
            name="puesto"
            id='puesto'
            value={puesto}
            onChange={(e) => setPuesto(e.target.value)}
          />
        </div>
        <div className="campo">
        <label htmlFor="sueldo">Sueldo</label>
          <input
            type="number"
            name="sueldo"
            id='sueldo'
            value={sueldo}
            onChange={(e) => setSueldo(e.target.value)}
          />
        </div>
        <div className="campo">
        <label htmlFor="descripcion_actividades">Descripción de actividades</label>
          <textarea
            name="descripcion_actividades"
            id='descripcion_actividades'
            rows={5}
            value={descripcionActividades}
            onChange={(e) => setDescripcionActividades(e.target.value)}
          ></textarea>
        </div>

        </fieldset>
        </div>
        
        <div className="row">
          {isLoading && <ReactLoading type="spin" color="#000" width={50} />}
          <input type="submit" value="Enviar" disabled={isLoading}/>
        </div>
      </form>
    </div>
  );
};

export default Form;