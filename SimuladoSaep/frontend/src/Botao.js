const Botao = (props) => {
    return(
            <button onClick={props.click} className={props.className}>{props.text}</button>
    )
};

export default Botao;