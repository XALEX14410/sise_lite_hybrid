'use client';
import { useState, useEffect } from 'react';
import AlumnoForm from './components/AlumnoForm';
import DocenteForm from './components/DocenteForm';
import AdminForm from './components/AdminForm';
import TablaAlumno from './components/TablaAlumno';
import TablaDocente from './components/TablaDocente';
import TablaAdmin from './components/TablaAdmin';

const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL;

export default function AdminPage() {
  const [registros, setRegistros] = useState([]);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);
  const [tipoUsuario, setTipoUsuario] = useState('Alumno');
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [carreras, setCarreras] = useState([]);

  // Cargar estados
  useEffect(() => {
    const cargarEstados = async () => {
      try {
        const res = await fetch(`${BACK_URL}/estados`, { credentials: 'include' });
        const data = await res.json();
        setEstados(data);
      } catch (err) {
        console.error(err);
      }
    };
    cargarEstados();
  }, []);

  useEffect(() => {
    const cargarCarreras = async () => {
      try {
        const res = await fetch(`${BACK_URL}/admin/carreras`, { credentials: 'include' });
        if (!res.ok) throw new Error('Fallo al cargar carreras');
        const data = await res.json();
        setCarreras(data.carreras); 
      } catch (err) {
        console.error(err);
        setCarreras([]); 
      }
    };
    cargarCarreras();
  }, []);

  // Cargar registros según tipo
  useEffect(() => {
    const cargarRegistros = async () => {
      setCargando(true);
      let endpoint = tipoUsuario === 'Alumno' ? '/admin/alumnos' :
                     tipoUsuario === 'Docente' ? '/admin/docentes' : '/admin/administradores';
      try {
        const res = await fetch(`${BACK_URL}${endpoint}`, { credentials: 'include' });
        const data = await res.json();
        setRegistros(tipoUsuario === 'Alumno' ? data.alumnos :
                     tipoUsuario === 'Docente' ? data.docentes : data.admins);
      } catch (err) {
        setError('Error al cargar registros');
      } finally {
        setCargando(false);
      }
    };
    cargarRegistros();
  }, [tipoUsuario]);

  // Cargar municipios según estado seleccionado
  useEffect(() => {
    const cargarMunicipios = async () => {
      if (!formData.idEstado) return setMunicipios([]);
      try {
        const res = await fetch(`${BACK_URL}/municipios/${formData.idEstado}`, { credentials: 'include' });
        const data = await res.json();
        setMunicipios(data.municipios); // Extraer la propiedad municipios
      } catch (err) { console.error(err); }
    };
    cargarMunicipios();
  }, [formData.idEstado]);

  // Crear registro
  const crearRegistro = async (e) => {
    e.preventDefault();
    // 1. URL de REGISTRO (POST)
    const endpointRegistro = tipoUsuario === 'Alumno' ? '/admin/registrar-alumno' :
                     tipoUsuario === 'Docente' ? '/admin/registrar-docente' : '/admin/registrar-admin';

    try {
      // PETICIÓN 1: REGISTRO (POST)
      const res = await fetch(`${BACK_URL}${endpointRegistro}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Error al crear registro');

      setFormData({});
      setError('');

      // 2. URL de LECTURA/OBTENCIÓN (GET)
      const endpointLectura = tipoUsuario === 'Alumno' ? '/admin/alumnos' :
                     tipoUsuario === 'Docente' ? '/admin/docentes' : '/admin/administradores';
      
      // PETICIÓN 2: Recargar registros (GET)
      // Usamos la nueva variable endpointLectura
      const res2 = await fetch(`${BACK_URL}${endpointLectura}`, { credentials: 'include' });
      
      // Añadir una verificación de error para el GET también
      if (!res2.ok) {
          throw new Error(`Error al recargar registros: ${res2.status}`);
      }
      
      const data = await res2.json();
      setRegistros(tipoUsuario === 'Alumno' ? data.alumnos :
                   tipoUsuario === 'Docente' ? data.docentes : data.admins );
      
    } catch (err) {
      setError(err.message);
    }
  };

  // Eliminar registro según tipo de usuario
  const eliminarRegistro = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar este registro?')) return;

    let endpoint = tipoUsuario === 'Alumno' ? `/admin/eliminar-alumno/${id}` :
                   tipoUsuario === 'Docente' ? `/admin/eliminar-docente/${id}` :
                   `/admin/eliminar-admin/${id}`;

    try {
      const res = await fetch(`${BACK_URL}${endpoint}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Error al eliminar');

      setRegistros(registros.filter((r) => {
        if (tipoUsuario === 'Alumno') return r.idAlumno !== id;
        if (tipoUsuario === 'Docente') return r.idDocente !== id;
        return r.idUsuario !== id; 
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  if (cargando) return <p className="text-center mt-10">Cargando registros...</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-center mb-4">Panel de Administración</h1>

        {/* Formulario */}
        <div className="bg-white dark:bg-gray-800 shadow rounded p-6 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold mb-2">Crear Usuario</h2>
          <select
            value={tipoUsuario}
            onChange={(e) => { setTipoUsuario(e.target.value); setFormData({}); }}
            className="mb-4 p-2 border rounded w-64"
          >
            <option value="Alumno">Alumno</option>
            <option value="Docente">Docente</option>
            <option value="Admin">Admin</option>
          </select>

          <form onSubmit={crearRegistro} className="flex flex-col gap-2">
            {/* Campos comunes */}
            <input type="text" placeholder="Nombre" value={formData.nombre || ''} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required className="p-2 border rounded w-full"/>
            <input type="text" placeholder="Apellido Paterno" value={formData.apellido_paterno || ''} onChange={(e) => setFormData({ ...formData, apellido_paterno: e.target.value })} required className="p-2 border rounded w-full"/>
            <input type="text" placeholder="Apellido Materno" value={formData.apellido_materno || ''} onChange={(e) => setFormData({ ...formData, apellido_materno: e.target.value })} required className="p-2 border rounded w-full"/>
            <input type="text" placeholder="Usuario" value={formData.usuario || ''} onChange={(e) => setFormData({ ...formData, usuario: e.target.value })} required className="p-2 border rounded w-full"/>
            <input type="password" placeholder="Contraseña" value={formData.contrasena || ''} onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })} required className="p-2 border rounded w-full"/>
            <input type="email" placeholder="Correo Electrónico" value={formData.correo_electronico || ''} onChange={(e) => setFormData({ ...formData, correo_electronico: e.target.value })} required className="p-2 border rounded w-full"/>
            <input type="text" placeholder="CURP" value={formData.curp || ''} onChange={(e) => setFormData({ ...formData, curp: e.target.value })} required className="p-2 border rounded w-full"/>

            {/* Formulario específico */}
            {tipoUsuario === 'Alumno' && <AlumnoForm formData={formData} setFormData={setFormData} estados={estados} municipios={municipios} carreras={carreras}/>}
            {tipoUsuario === 'Docente' && <DocenteForm formData={formData} setFormData={setFormData} estados={estados} municipios={municipios}/>}
            {tipoUsuario === 'Admin' && <AdminForm formData={formData} setFormData={setFormData} estados={estados} municipios={municipios}/>}

            <button type="submit" className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors">Crear</button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* Tabla dinámica */}
        {tipoUsuario === 'Alumno' && <TablaAlumno alumnos={registros} eliminarRegistro={eliminarRegistro}/>}
        {tipoUsuario === 'Docente' && <TablaDocente docentes={registros} eliminarRegistro={eliminarRegistro}/>}
        {tipoUsuario === 'Admin' && <TablaAdmin admins={registros} eliminarRegistro={eliminarRegistro}/>}
      </div>
    </main>
  );
}
