import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { addContact } from "../actions/contacts"
import { useDispatch } from "react-redux"
import { useMutation } from "@apollo/client"
import { CREATE_PHONEBOOK, GET_PHONEBOOKS } from "../graphql/gql"


export default function ContactAdd() {

    const navigate = useNavigate()
    const [newContatc, setNewContatc] = useState({ name: null, phone: null })
    const dispatch = useDispatch()

    const [addPhonebook, { data, loading, error }] = useMutation(CREATE_PHONEBOOK);

    const submit = () => {
        addPhonebook({ variables: {input: newContatc}, refetchQueries: [GET_PHONEBOOKS] }).then(({data}) => {
        dispatch(addContact(data.createPhonebook))
        navigate('/')
        }).catch(error => console.log(error))
    }

    if (loading) return <div>Submitting...</div>;

    if (error) return <div>Submission error! {error.message}</div>;

    return (
        <div className="add-contact">
            <form onSubmit={submit}>
                <input type="text" id="name" name="name" placeholder="name" onChange={(e) => setNewContatc({ ...newContatc, name: e.target.value })} />
                <input type="text" id="phone" name="phone" placeholder="phone" onChange={(e) => setNewContatc({ ...newContatc, phone: e.target.value })} />
                <div className="btn-form-add">
                    <button type="submit">save</button>
                    <Link to="/">cancel</Link>
                </div>
            </form>
        </div>
    )
}