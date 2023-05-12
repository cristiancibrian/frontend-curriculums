import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/variables';

import './Consulta.css'

const Consulta = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [informacion, setInformacion] = useState({});
    const [tieneExperiencia, setTieneExperiencia] = useState(false);

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        try {
            const res = await axios.get(`${API_URL}/obtener/${id}`);
            setInformacion(res.data);
        } catch (error) {
            navigate('/');
        }
    }


    useEffect(() => {
        if(Object.keys(informacion).length > 0) {
            if(informacion.Experiencia_Laborals.length > 0) {
                setTieneExperiencia(true);
            }
        }
    }, [informacion]);

    return (
        <div className='contenedor'>
            <div className="grid-row">
                <img className="imagen" src={informacion.foto || 'https://i.pinimg.com/280x280_RS/42/03/a5/4203a57a78f6f1b1cc8ce5750f614656.jpg'} alt="imagen informacion" />
                <div className='informacion'>
                    <fieldset>
                        <legend>Información Personal</legend>
                        <h1 className='nombre'>{informacion?.nombre} {informacion?.apellido_paterno} {informacion?.apellido_materno || ''}</h1>

                        <p className='bold'>Fecha de nacimiento: <span className='no-bold'>{informacion?.fecha_nacimiento ? new Date(informacion.fecha_nacimiento).toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Sin información'}</span></p>
                        <p className='bold'>Teléfono: <span className='no-bold'>{informacion?.telefono}</span></p>
                    </fieldset>

                    <fieldset>
                        <legend>Experiencia Laboral</legend>
                        {tieneExperiencia  ? (
                            <>
                                {informacion?.Experiencia_Laborals.map( ex => {
                                    return (
                                        <div key={ex.id}>
                                            <p className='bold'>Lugar de trabajo: <span className='no-bold'>{ex.lugar_trabajo}</span></p>
                                            <p className='bold'>Puesto: <span className='no-bold'>{ex.puesto || 'Sin información'}</span></p>
                                            <p className='bold'>Sueldo: <span className='no-bold'>{ex.sueldo || 'Sin información'}</span></p>
                                            <p className='bold'>Descripción de actividades: <span className='no-bold'>{ex.descripcion_actividades || 'Sin información'}</span></p>
                                            <hr />
                                        </div>
                                    )
                                })}
                            </>
                        ) : (
                            <p className='bold'>Sin Experiencia Laboral</p>
                        )}
                    </fieldset>
                </div>
            </div>
        </div>
    )

}

export default Consulta;