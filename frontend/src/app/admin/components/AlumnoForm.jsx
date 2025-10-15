'use client';
import { useEffect } from 'react';

export default function AlumnoForm({ formData, setFormData, estados, municipios }) {

  // Resetear municipio cuando cambia el estado
  useEffect(() => {
    setFormData(prev => ({ ...prev, idMunicipio: '' }));
  }, [formData.idEstado]);

  return (
    <>
      {/* Select de Estados */}
      <select
        value={formData.idEstado || ''}
        onChange={(e) => setFormData({ ...formData, idEstado: Number(e.target.value) })}
        className="p-2 border rounded w-full mb-2"
      >
        <option value="">Selecciona un estado</option>
        {estados.map((estado) => (
          <option key={estado.idEstado} value={estado.idEstado}>
            {estado.estado}
          </option>
        ))}
      </select>

      {/* Select de Municipios */}
      <select
        value={formData.idMunicipio || ''}
        onChange={(e) => setFormData({ ...formData, idMunicipio: Number(e.target.value) })}
        className="p-2 border rounded w-full mb-2"
        disabled={!municipios.length} // deshabilitado si no hay municipios
      >
        <option value="">Selecciona un municipio</option>
        {municipios.map((mun) => (
          <option key={mun.idMunicipio} value={mun.idMunicipio}>
            {mun.municipio}
          </option>
        ))}
      </select>
    </>
  );
}
