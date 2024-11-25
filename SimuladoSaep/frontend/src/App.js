import React, { useState, useEffect } from 'react';
import Curso from './Curso';
import Perfil from './Perfil';
import Botao from './Botao';

function App() {
    const [status, setStatus] = useState(false);
    const [empresa, setEmpresa] = useState({ nome: '', logo: '' });
    const [usuario, setUsuario] = useState({ nome: '', foto: '' });
    const [credentials, setCredentials] = useState({ usuario: '', senha: '' });
    const [cursos, setCursos] = useState([]); // Adicionando estado para cursos

    const entrar = () => {
        setStatus(!status);
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Enviando login:', credentials);  // Verifique os dados antes de enviar
        
        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
    
            const data = await response.json();
            if (response.ok) {
                setUsuario({ nome: data.usuario.nome, foto: data.usuario.foto });
                setEmpresa({ nome: data.empresa.nome, logo: data.empresa.logo });
                setStatus(false);
            } else {
                alert('Usuário ou senha inválidos');
            }
        } catch (error) {
            console.error('Erro ao fazer login', error);
            alert('Erro ao fazer login');
        }
    };

    useEffect(() => {
        const fetchEmpresa = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/empresa');
                const data = await response.json();
                if (data.length > 0) {
                    setEmpresa({ nome: data[0].nome, logo: data[0].logo });
                }
            } catch (error) {
                console.error('Erro ao buscar dados da empresa:', error);
            }
        };
        fetchEmpresa();
    }, []);

    // Carregar cursos da API
    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/cursos');
                const data = await response.json();
                setCursos(data);
            } catch (error) {
                console.error('Erro ao buscar cursos:', error);
            }
        };
        fetchCursos();
    }, []);

    return (
        <div className="App">
            <header>
                <h1>FaculHub - O curso certo para você</h1>
                <div>
                    <img src='instagram.webp' alt='Instagram logo' />
                    <img src='twitter.png' alt='Twitter logo' />
                </div>
            </header>
            <main>
                <div className='perfil'>
                    {!status ? (
                        <Botao click={entrar} text='entrar' className='entrar'/>
                    ) : (
                        <div className='popup'>
                            <div className='caixa'>
                                <h2>LOGIN</h2>
                                <form onSubmit={handleLogin}>
                                    <input 
                                        type='text' 
                                        name='usuario' 
                                        value={credentials.usuario} 
                                        onChange={handleChange} 
                                        placeholder='usuário' 
                                    />
                                    <input 
                                        type='password' 
                                        name='senha' 
                                        value={credentials.senha} 
                                        onChange={handleChange} 
                                        placeholder='senha' 
                                    />
                                    <div>
                                        <Botao click={entrar} text='cancelar' className='sair'/>
                                        <button type='submit' className='enviar'>Entrar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    <div>
                        <Perfil imagemPerfil={usuario.foto || empresa.logo} nome={usuario.nome || empresa.nome} inscricoes='2'/>
                    </div>
                </div>
                <div className='cursos'>
                    <h2>Cursos</h2>
                    {cursos.map((curso) => (
                        <Curso 
                            key={curso.id_curso} 
                            tituloCurso={curso.nome_curso} 
                            escola={curso.instituicao} 
                            imagemCurso={curso.foto} 
                            like='1'
                            comentario='20'
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;