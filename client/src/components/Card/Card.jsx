import './Card.css'

const Card=({props})=>{
    const { id, image , name, teams} = props

    return(
        <>
            <div key={id} className={"cardBox"}>    
                <div className='card__content'>
                    <h3 className={"title"}>{name}</h3>
                    {<img src={image} alt="" />}
                    <p>{teams}</p>
                </div>
            </div>
        </>
    )

}

export default Card;