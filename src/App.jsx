import { IoMenu } from "react-icons/io5";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { RiSearch2Line } from "react-icons/ri";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import Modal from "./components/Modal";


// axios temel url ayarı
axios.defaults.baseURL = "http://localhost:3000";


const App = () => {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [editItem, setEditItem] = useState(null)
  // bileşenin ekrana basma anı
  useEffect(() => {
    axios
      .get("/contact")
      .then((res) => setContacts(res.data))
  }, []);

  // form gönderince
  const handleSubmit = (e) => {
    e.preventDefault();

    //  imputtaki metni al
    const text = e.target[1].value;

    // apiye gönderilcek parametre 
    const params = {
      q: text
    };

    // apide aratılan metne uygun verileri al

    axios
      .get("/contact", { params })
      .then((res) => setContacts(res.data));
  };

  // sil butonuna tıklayınca
  const handleDelete = (id) => {
    const res = confirm("Kişiyi silmek istediginizden emin misiniz?");
    if (res) {
      // apiye silme istegi at
      axios.delete(`/contact/${id}`)

        // api istegi başarılı ise stati güncelle
        .then(() => {
          // diziden elemanı kaldır
          const update = contacts.filter((contact) => contact.id
            !== id)
          // state güncelle
          setContacts(update)
        })
    }
  }

  // Düzenle butonuna tıklayınca
  const handleEdit = (contact) => {
    // düzenlenecek elemanı state aktar
    setEditItem(contact)
    // modal açıyor
    setIsModalOpen(true)
  }


  return (
    <div className="app">
      <header>
        <h1>Rehber</h1>


        <div>
          <form onSubmit={handleSubmit}>
            <button >
              <RiSearch2Line />
            </button>
            <input placeholder="kişi aratın..." type="search" />
          </form>


          <button className="ns">
            <IoMenu />
          </button>

          <button className="ns">
            <HiMiniSquares2X2 />
          </button>

          <button className="add" onClick={() => setIsModalOpen(true)}>
            <MdOutlinePersonAddAlt1 />
            <span> Yeni Kişi</span>
          </button>
        </div>
      </header>

      <main>
        {contacts.map((contact) => (
          <Card key={contact.id}
            contact={contact}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </main>

      <Modal
        editItem={editItem}
        isModalOpen={isModalOpen}
        close={() => {
          setIsModalOpen(false)
          setEditItem(null)
        }}
        setContacts={setContacts}
      />

    </div>
  );
};

export default App;