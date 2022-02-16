import './SearchX.scss';

import { useQuery } from '@apollo/client';
import { size } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Search } from 'semantic-ui-react';

import AvatarNotFound from '../../../assets/png/avatar.png';
import { SEARCH_USERS } from '../../../gql/user';

export default function SearchX() {
 

    const [search, setSearch] = useState(null);
    const [results, setResults] = useState([]);
    const { data, loading } = useQuery(SEARCH_USERS, {
        variables: { search: search },
    });
   

    useEffect(() => {
        if (size(data?.search) > 0) {
            const users = [];
            data.search.forEach((user, index) => {
                users.push({
                    key: index,
                    title: user.name,
                    username: user.username,
                    avatar: user.avatar,
                });
            });
            setResults(users);
        } else {
            setResults([]);
        }
    }, [data])

    const onChange = (e) => {  
        // solo busca usuarios si el input buscar hay algo
        if (e.target.value) setSearch(e.target.value);
        else setSearch(null);
    }

    const handleResultSelect = () => {
        setSearch(null);
        setResults([]);
    }
    
    return (
        <Search
            className="search-users"
            fluid
            input={{ icon: "search", iconPosition: "left" }}
            loading={loading}
            value={search || ""}
            onSearchChange={onChange}
            onResultSelect={handleResultSelect}
            results={results}
            resultRenderer={(e) => <ResultSearch data={e}></ResultSearch>}
        ></Search>
    );
}



function ResultSearch(props) {
    const { data } = props;
    
    return (
        <Link className='search-users__item' to={`/${data.username}`}>
            <Image src={data.avatar || AvatarNotFound}></Image>
            <div>
                <p>{data.title}</p>
                <p>{data.username}</p>
            </div>
            
        </Link>
    );
}
