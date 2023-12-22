import {useState} from 'react'

interface PetsSearchProps{
    list: any,
    fill: any
}

export default function PetsSearch(props:PetsSearchProps){
    const [searchParams, setSearchParams] = useState<string>('')
    const [filter, setFilter] = useState<string>('name')
    const [filteredPets, setFilteredPets] = useState<any[]>([])

    const fPets = () => props.fill(filteredPets)

    const findPets = () => {
        const foundPets = props.list.filter((item: any)=>{
            switch(filter){
                case 'name': return item.name.includes(searchParams)
                case 'breed': return item.breed.includes(searchParams)
                case 'owner': return item.owner.includes(searchParams)
                default: return true
            }
        })

        setFilteredPets(foundPets)
        fPets()
    }

    return(
        <div>
            <select
                value={filter}
                onChange={(e)=>setFilter(e.target.value)}
            >
                <option value='name'>NOME</option>
                <option value='breed'>RAÇA</option>
                <option value='owner'>DONO</option>
            </select>
            <input
                value={searchParams}
                onChange={(e)=>setSearchParams(e.target.value)}
                type="text"
                placeholder='Encontre um pet'
            />
            <button
                onClick={findPets}
                type='submit'
            >Buscar</button>
        </div>
    )
}