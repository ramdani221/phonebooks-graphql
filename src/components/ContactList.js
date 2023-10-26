import ContactData from "./ContactData"
import { Suspense, useCallback, useEffect, useState } from "react";
import { useLazyQuery, useQuery, useSuspenseQuery } from "@apollo/client";
import { GET_PHONEBOOKS } from "../graphql/gql";

export default function ContactList({ filter }) {

    const [contacts, setContacts] = useState({phonebooks: []})

    const [hasMore, setHasMore] = useState(true)

    const [pageNum, setPageNum] = useState(1)

    const [getPhonebooks, { loading, error, fetchMore }] = useLazyQuery(GET_PHONEBOOKS,)

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        if(!hasMore) return;
        setPageNum(pageNum + 1)
        fetchMore({ variables: { page:  pageNum + 1, ...filter } }).then(({ data }) => {
            console.log(data.getPhonebooks.phonebooks.length)
            if (!data.getPhonebooks.phonebooks.length) return setHasMore(false)
            setContacts({ ...data.getPhonebooks, phonebooks: [...contacts.phonebooks, ...data.getPhonebooks.phonebooks] })
        })
        console.log('jalan')
    };

    useEffect(() => {
        getPhonebooks({
            variables: { page: 1, limit: 8, ...filter },
        }).then(({ data }) => {
            setContacts(data.getPhonebooks)
        })
    }, [setContacts, filter])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    if (loading) return <div>Loading...</div>

    if (error) return <div>Error! {error.message}</div>;

    return (
            <div className="contact-list">
                {contacts.phonebooks.map((item, index) => <ContactData contact={item} key={index} />)}
            </div>
    )
}