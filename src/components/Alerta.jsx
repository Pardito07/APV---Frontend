const Alerta = ({alerta}) => {
    return (
        <div className={`p-2 mb-5 uppercase font-bold text-sm rounded-xl ${alerta.error ? 'border border-red-600 text-red-600' : 'border border-green-600 text-green-600'} text-center`}>
            { alerta.msg }
        </div>
    )
}

export default Alerta