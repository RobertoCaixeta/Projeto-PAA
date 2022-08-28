import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import Table from '../Table';


export default function News() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        api.get(`/news`).then(({ data }) => {
            setNews(data)
        })
    }, []);
    return (
        <>
        <Table props={news}/>
        </>
    )
}
