import { faFloppyDisk, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteContact, updateContact } from "../actions/contacts";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_PHONEBOOK, GET_PHONEBOOKS, UPDATE_PHONEBOOK } from "../graphql/gql";


export default function ContactData({ contact }) {

    const navigate = useNavigate()
    const [isEdite, setIsEdite] = useState(false);
    const dispatch = useDispatch();
    const [newData, setNewData] = useState({ name: contact.name, phone: contact.phone });

    const [updatePhonebook, {data, loading, error}] = useMutation(UPDATE_PHONEBOOK);
    const [deletePhonebook, {data: dataDelete, loading: loadingDelete, error: errorDelete}] = useMutation(DELETE_PHONEBOOK)

    const submit = (e) => {
        e.preventDefault();
        updatePhonebook({variables: {_id: contact._id, input: newData}, refetchQueries: [GET_PHONEBOOKS]})
        setIsEdite(!isEdite);
    }

    const toAvatar = () => {
        navigate('/avatar', { state: { id: contact.id, avatar: contact.avatar } })
    }

    if (isEdite) {
        return (
            <div className="contact-data">
                <div className="btn-image">
                    <button className="btn-avatar">
                        <img src={"http://localhost:3000/images/" +
                            (contact.avatar ? contact.avatar : "user-tie-solid.svg")}
                            alt="avatar" />
                    </button>
                </div>
                <div className="identity">
                    <form onSubmit={submit}>
                        <input type="text" name="name"
                            value={newData.name}
                            onChange={e => setNewData({ ...newData, name: e.target.value })} />
                        <input type="text" name="phone"
                            value={newData.phone}
                            onChange={e => setNewData({ ...newData, phone: e.target.value })} />
                        <div className="btn-identity">
                            <button type="submit"><FontAwesomeIcon icon={faFloppyDisk} /></button>
                        </div>
                    </form>
                </div>
            </div>)
    } else {
        return (
            <div className="contact-data">
                <div className="btn-image">
                    <button className="btn-avatar" onClick={toAvatar}>
                        <img src={"http://localhost:3000/images/" +
                            (contact.avatar ? contact.avatar : "user-tie-solid.svg")}
                            alt="avatar" />
                    </button>
                </div>
                <div className="identity">
                    <p>{contact.name}</p>
                    <p>{contact.phone}</p>
                    <div className="btn-identity">
                        <button onClick={() => setIsEdite(!isEdite)}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button type="button" onClick={() => {deletePhonebook({variables: {_id: contact._id}}).then(({data}) => {
                            dispatch(deleteContact(data))
                        })
                            dispatch(deleteContact(contact.id))}}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}