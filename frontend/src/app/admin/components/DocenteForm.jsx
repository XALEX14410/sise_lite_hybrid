'use client';
import React from 'react';

export default function DocenteForm({ formData, setFormData, estados, municipios }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Área */}
      <input
        type="text"
        placeholder="Área o Departamento"
        value={formData.area || ''}
        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
        required
        className="p-2 border rounded w-full"
      />

      {/* Fecha de nacimiento */}
      <input
        type="date"
        placeholder="Fecha de Nacimiento"
        value={formData.fechaNacimiento || ''}
        onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
        required
        className="p-2 border rounded w-full"
      />

      {/* Sexo */}
      <select
        value={formData.sexo || ''}
        onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}
        required
        className="p-2 border rounded w-full"
      >
        <option value="">Selecciona un sexo</option>
        <option value="M">Masculino</option>
        <option value="F">Femenino</option>
      </select>

      {/* Estado */}
      <select
        value={formData.idEstado || ''}
        onChange={(e) => setFormData({ ...formData, idEstado: e.target.value })}
        required
        className="p-2 border rounded w-full"
      >
        <option value="">Selecciona un estado</option>
        {estados.map((estado) => (
          <option key={estado.idEstado} value={estado.idEstado}>
            {estado.estado}
          </option>
        ))}
      </select>

      {/* Municipio */}
      <select
        value={formData.idMunicipio || ''}
        onChange={(e) => setFormData({ ...formData, idMunicipio: e.target.value })}
        required
        className="p-2 border rounded w-full"
        disabled={!municipios.length}
      >
        <option value="">Selecciona un municipio</option>
        {municipios.map((mun) => (
          <option key={mun.idMunicipio} value={mun.idMunicipio}>
            {mun.municipio}
          </option>
        ))}
      </select>
    </div>
  );
}
