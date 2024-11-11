import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
const Card = ({ contact, handleDelete, handleEdit }) => {
    //  isim soyisim ayrı degişkenlere atıyoruz
    const [name, surname = ""] = contact.name.split(" ");

    return (
        <div className="card">
            <div className="buttons">
                <button onClick={() => handleDelete(contact.id)}><FaTrashAlt /></button>

                <button onClick={() => handleEdit(contact)}>< RiEdit2Fill /></button>
            </div>
            <h1>
                {name[0]} {surname[0]}
            </h1>
            <h3>{contact.name}</h3>
            <p>{contact.position}</p>
            <p>{contact.company}</p>


            <div className="bottom">
                <div>
                    <span>
                        <FaPhone />
                    </span>
                    <span>
                        {contact.phone}
                    </span>
                </div>

                <div>
                    <span>
                        <MdEmail />
                    </span>
                    <span>
                        {contact.email}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Card