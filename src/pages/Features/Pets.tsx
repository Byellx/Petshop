import {useState} from 'react'
import Navbar from "@/components/Navbar"
import styles from "@/styles/Pets.module.css"
import PetsRegister from '@/components/petsComponents/PetsRegister'
import PetsSearch from '@/components/petsComponents/PetsSearch'
import PetsTable from '@/components/petsComponents/PetsTable'

interface Pets{
    id: number,
    name: string,
    breed: string,
    owner: string,
    info: any
}

const petList: Pets[] = [
    {
        id: 1,
        name: 'Max',
        breed: 'Caramelo',
        owner: 'João',
        info: ''
    },

    {
        id: 2,
        name: 'Marley',
        breed: 'Labrador',
        owner: 'Owen Wilson',
        info: ''
    },

    {
        id: 3,
        name: 'Pateta',
        breed: 'Viralata',
        owner: 'Mickey',
        info: ''
    },

    {
        id: 4,
        name: 'Chloe',
        breed: 'Chihuahua',
        owner: 'Clotilde',
        info: ''
    },

    {
        id: 5,
        name: 'Max',
        breed: 'Dálmata',
        owner: 'Cruela',
        info: ''
    },

    {
        id: 6,
        name: 'Matilda',
        breed: 'Poodle',
        owner: 'Barbie',
        info: ''
    },

    {
        id: 7,
        name: 'Max',
        breed: 'Pastor Alemão',
        owner: 'Samuel',
        info: ''
    },

    {
        id: 8,
        name: 'Gar',
        breed: 'Pitbull',
        owner: 'The Rock',
        info: ''
    },
]

export default function Pets(){
    const [showInfo, setShowInfo] = useState<boolean>(false)
    const [addPet, setAddPet] = useState<boolean>(false)
    const [petName, setPetName] = useState<string>('')
    const [petBreed, setPetBreed] = useState<string>('')
    const [petOwner, setPetOwner] = useState<string>('')
    const [editPetName, setEditPetName] = useState<string>('')
    const [editPetBreed, setEditPetBreed] = useState<string>('')
    const [editPetOwner, setEditPetOwner] = useState<string>('')
    const [filtered, setFiltered] = useState<any[]>([])

    const addPetfunc = () => {
        setPetName('')
        setPetBreed('')
        setPetOwner('')
        setAddPet(!addPet)
    }

    const troca = () => {
        setShowInfo(!showInfo)
    }

    const addPetForm = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault()
        const randNumber = Math.floor(Math.random()*100)
        const pet: Pets = {
            id: randNumber,
            name: petName,
            breed: petBreed,
            owner: petOwner,
            info: ''
        }
        petList.push(pet)
        setAddPet(false)
    }

    const deletar = () => {

    }

    const handleShowInfo = (info: any) => {
        setEditPetName(info.name)
        setEditPetBreed(info.breed)
        setEditPetOwner(info.owner)
        troca()
    }

    const handleSearch = (searching: any[]) => {
        console.log(searching)
        setFiltered(searching)
    }

    return(
        <>
        <Navbar/>
        <main className={styles.bigBox}>
            <section className={styles.principal}>
                <div className={styles.searchbox}>
                    <PetsSearch
                        list={petList}
                        fill={handleSearch}
                    />
                </div>
                <div className={styles.tableBox}>
                    <PetsTable
                        list={filtered.length > 0?filtered:petList}
                        about={handleShowInfo}
                        style={styles.edit}
                    />
                </div>
                <div className={styles.addPet}>
                    <div className={styles.add} onClick={addPetfunc}></div>
                    <div className={styles.del}></div>
                </div>
                {
                    addPet && <>
                        <div className={styles.addPetFormsBox} onClick={addPetfunc}/>
                        <PetsRegister
                            petName={petName}
                            setPetName={setPetName}
                            petBreed={petBreed}
                            setPetBreed={setPetBreed}
                            petOwner={petOwner}
                            setPetOwner={setPetOwner}
                            style={styles.addPetForms}
                            petForm={addPetForm}
                        />
                        
                    </>
                }
            </section>
            <aside className={showInfo?styles.extraInfo:styles.extraInfoHide}>
                <div onClick={troca}></div>
                <div className={styles.excluir} onClick={deletar}></div>
                <article className={styles.petCard}>
                    <h2>{editPetName}</h2>
                    <label>Raça: {editPetBreed}</label>
                    <label>Dono: {editPetOwner}</label>
                </article>
            </aside>
        </main>
        </>
    )
}