import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [error, setError] = useState(false);



    useEffect(() => {
        if (Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        }
    }, [paciente]);






    const generarId = () => {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);
        return random + fecha;
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación del Formulario

        if ([nombre, propietario, email, fecha, sintomas].includes('')) {

            setError(true);
            return;
        }
        setError(false);

        //Objeto de Paciente
        const objetoPaciente = {
            nombre, propietario, email, fecha, sintomas
        }

        if (paciente.id) {
            // Editando el registro
            objetoPaciente.id = paciente.id
            const pacientesActualizados = pacientes.map(
                pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState
            )
            setPacientes(pacientesActualizados)
            setPaciente({})

        } else {
            // Nuevo registro
            objetoPaciente.id = generarId()
            setPacientes([...pacientes, objetoPaciente]);
        }


        //Reiniciar el Form
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');


    }



    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">Añade pacientes y <span className="font-bold text-indigo-600">Administralos</span></p>


            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5" >

                {error && <Error mensaje='Todos los campos son obligatorios' />}

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="nombre-mascota">Nombre Mascota</label>
                    <input className="w-full p-2 border-2 mt-2 placeholder-gray-400 rounded-md" type="text" placeholder="Nombre de la Mascota" id="nombre-mascota" value={nombre} onChange={(e) => setNombre(e.target.value)} />

                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="nombre-propietario">Nombre Propietario</label>
                    <input className="w-full p-2 border-2 mt-2 placeholder-gray-400 rounded-md" type="text" placeholder="Nombre del Propietario" id="nombre-propietario" value={propietario} onChange={(e) => setPropietario(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="email">Email</label>
                    <input className="w-full p-2 border-2 mt-2 placeholder-gray-400 rounded-md" type="email" placeholder="E-mail" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">Alta</label>
                    <input className="w-full p-2 border-2 mt-2 placeholder-gray-400 rounded-md" type="date" id="alta" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">Síntomas</label>
                    <textarea className="w-full p-2 border-2 mt-2 placeholder-gray-400 rounded-md" id="sintomas" placeholder="Describe los síntomas" value={sintomas} onChange={(e) => setSintomas(e.target.value)} />
                </div>
                <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} />
            </form>


        </div>
    )
}

export default Formulario