
import Persona from "../models/modelPersona.js";
import path from 'path';
import fs from "fs"

    
const crearPersona = async (req, res) => {
    
    const { nombre } = req.body;
    const fotografia = req.file.buffer;
    
    try {
      const persona = await Persona.create({ nombre, fotografia });
      res.json(persona);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const obtenerPersonas = async(req, res) => {
  try {
    const personas = await Persona.findAll();
    const personasConImagen = personas.map(persona => {
      const personaJSON = persona.toJSON();
      if (personaJSON.fotografia) {
        personaJSON.fotografia = personaJSON.fotografia.toString('base64');
      }
      return personaJSON;
    });
    res.json(personasConImagen);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inesperado, vuelve a intentar');
  }
}

const eliminarPersona = async (req,res) => {
  const {idPersona} = req.params;
  const persona = await Persona.findByPk(idPersona);
  
  if(persona){
    try {
      await persona.destroy();
      res.json('Persona eliminada de la BD exitosamente');
    } catch (error) {
      console.log(error)
    }
  }else{
    return;
  }

}

const actualizarPersona = async (req, res) =>{
  const {idPersona} = req.params;
  const persona = await Persona.findByPk(idPersona);
  
  
  if(persona){
    try {
      
      persona.nombre = req.body.nombre || persona.nombre
      persona.fotografia = req.file ? req.file.buffer : persona.fotografia;

      await persona.save();
      res.json('Datos actualizados correctamente')
    } catch (error) {
      console.log(error)
    }
    
  }
}

export {crearPersona, obtenerPersonas, eliminarPersona, actualizarPersona}