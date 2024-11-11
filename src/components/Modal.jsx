import { IoClose } from "react-icons/io5";
import Field from "./Field";
import axios from "axios";
// Editıtem propu varsa yani gülcellenicek eleman propu doluysa modal güncelleme modunda null ise ekleme modunda çalışmalı
const Modal = ({ isModalOpen, close, setContacts, editItem }) => {
  // formgönderince
  const handleSubmit = (e) => {
    e.preventDefault();

    // form bütün inputların verileri birnesene haline getirir
    // formdata class örnek al
    const formData = new FormData(e.target)
    // verileri önce diziye sonra nesneye çevirme
    const newContact = Object.fromEntries(formData.entries())
    // eger güncellenecek eleman yoksa
    if (!editItem) {
      axios.post("http://localhost:3000/contact", newContact)
        // api istegi başarılı olursa
        .then((res) => {
          // stati güncelle (arayüze elemanı eklenmesini saglar)
          setContacts((prev) => [...prev, res.data]);

        })

    } else {
      // güllenecek eleman varsa
      axios.put(`/contact/${editItem.id}`, newContact)
        // state güncelle
        .then((res) => {
          setContacts((prev) =>
            prev.map((contact) =>
              contact.id === editItem.id ? res.data : contact
            )
          )
        })
    }
    // modal kapat
    close();
  };


  return (
    isModalOpen && (
      <div className="Modal">
        <div className="Modal-inner">
          <div className="Modal-head">
            <h2>{editItem ? "Kişiyi Güncelle" : "Yeni Kişi Ekle"}</h2>
            <button onClick={close}>
              <IoClose />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <Field
              label="İsim Soyisim"
              name="name" value={editItem?.name} />

            <Field label="Pozisyon" name="position" Value={editItem?.position} />
            <Field label="Şirket" name="company" value={editItem?.company} />
            <Field label="Telefon" name="phone" value={editItem?.phone} />
            <Field label="Mail" name="email" value={editItem?.email} />


            <div className="buttons">
              <button type="button" onClick={close}>Vazgeç</button>
              <button type="submit">Oluştur</button>

            </div>
          </form>
        </div >
      </div >
    )
  )
}

export default Modal