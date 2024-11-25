const Perfil = ({imagemPerfil,nome, inscricoes}) => {
    return (
        <div className="secaoPerfil">
            <img src={imagemPerfil}/>
            <p>{nome}</p>
            <p>Inscrições: {inscricoes}</p>
        </div>
    )
}

export default Perfil;