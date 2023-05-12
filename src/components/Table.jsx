import { useState ,useEffect } from 'react';
import { API_URL } from '../config/variables'
import axios from 'axios';

import './Table.css'
import { Link } from 'react-router-dom';

const Table = () => {

const [curriculums, setCurriculums] = useState([]);
const [curriculumsToShow, setCurriculumsToShow] = useState([]);
const [search, setSearch] = useState('');

useEffect(() => {
   getData();
}, []);

const getData = async () => {
    try {
        const res = await axios.get(`${API_URL}/todos`);
        setCurriculums(res.data);
    } catch (error) {
        
    }
}

useEffect(() => {
    if(search.length > 0) {
        setCurriculumsToShow( curriculums.filter( c => c.telefono.startsWith(search)));
    } else {
        setCurriculumsToShow(curriculums)
    }
}, [search, curriculums])

    return (
        <div className='contenedor'>
        <div className="barra-busqueda">
            <div className="campo">
                <p>Buscar por número telefónico</p>
                <input type='tel' placeholder='Buscar' onChange={(e) => setSearch(e.target.value)}/>
            </div>
        </div>
            <table>
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Nombre</th>
                        <th>Apellido paterno</th>
                        <th>Apellido materno</th>
                        <th>Fecha de nacimiento</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {curriculumsToShow.map(c => {
                        return (
                            <tr key={c.id}>
                                <td>
                                    <img src={c.foto || 'https://i.pinimg.com/280x280_RS/42/03/a5/4203a57a78f6f1b1cc8ce5750f614656.jpg' } alt="imagen curriculum" />
                                </td>
                                <td>
                                    {c.nombre}    
                                </td>
                                <td>
                                    {c.apellido_paterno}    
                                </td>
                                <td>
                                    {c.apellido_materno}    
                                </td>
                                <td>
                                    {c.fecha_nacimiento ? new Date(c.fecha_nacimiento).toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}    
                                </td>
                                <td>
                                    {c.telefono}    
                                </td>
                                <td>
                                    <Link to={`/ver/${c.id}`}><button className='boton-consultar'><span className="material-symbols-outlined">search</span></button></Link>    
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table;