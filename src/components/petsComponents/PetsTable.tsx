import {useState} from 'react'

interface PetsTableProps{
    list: any,
    about: (info: any) => void,
    style: string
}

export default function PetsTable(props: PetsTableProps){

    return(
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>RAÇA</th>
                    <th>DONO</th>
                    <th>INFO</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.list.map((item: any)=>{
                        return(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.breed}</td>
                                <td>{item.owner}</td>
                                <td
                                    className={props.style}
                                    onClick={()=>props.about(item)}
                                >{item.info}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}