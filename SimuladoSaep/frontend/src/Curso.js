const Curso = ({ tituloCurso, escola, imagemCurso, like, comentario }) => {
    return (
        <div className="cursos">
            <div className="cabecalhoCurso">
                <h3>{tituloCurso}</h3>
                <p>{escola}</p>
            </div>
            <img src={imagemCurso} alt={tituloCurso} />
            <div className="like">
                <p><img src='flecha_cima_vazia.svg' alt='like'/>{like}</p>
                <p><img src='chat.svg' alt='comentario'/>{comentario}</p>
            </div>
        </div>
    );
}

export default Curso;