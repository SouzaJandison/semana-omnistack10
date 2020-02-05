import React from 'react';
import './style.css'
function DevItem({ dev }){
    return (
        <li className="dev-item">
            <header>
            <img src={dev.avatar_url} alt={dev.name}/>
            <div className="user-info">
                <strong>{dev.name}</strong>
                <samp>{dev.techs.join(', ')}</samp>
            </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Git</a>
        </li>
    );
}
export default DevItem;