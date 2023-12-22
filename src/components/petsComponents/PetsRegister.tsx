interface PetsRegisterProps{
    petName: string,
    setPetName: any,
    petBreed: string,
    setPetBreed: any,
    petOwner: string,
    setPetOwner: any,
    style: string,
    petForm: any
}

export default function PetsRegister(props:PetsRegisterProps){
    return(
        <form className={props.style}>
            <h2>Cadastro de Pets</h2>
            <input
                value={props.petName}
                onChange={(e)=>props.setPetName(e.target.value)}
                type='text'
                placeholder='Nome'
            />
            <input
                value={props.petBreed}
                onChange={(e)=>props.setPetBreed(e.target.value)}
                type='text'
                placeholder='Raça'
            />
            <input
                value={props.petOwner}
                onChange={(e)=>props.setPetOwner(e.target.value)}
                type='text'
                placeholder='Dono'
            />
            <button
                onClick={props.petForm}
                type="submit"
            >Registrar</button>
        </form>
    )
}