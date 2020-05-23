import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories,setRepositories] = useState([]);
  const titles = ['Repo Bootcamp','Training Repo','Github Rocketseat','Api Nodejs', 'React on frontend']
  const techs = ['React','React-Native','Nodejs','HTML5','CSS','PHP','SASS','Python','Java','C++']

  useEffect(()=>{
    api.get('repositories').then(response =>{
      setRepositories(response.data);
    })
  },[]);

  async function handleAddRepository() {
    
    const data = {
      title:`${titles[Math.floor(Math.random()*titles.length)]} -created-at-${Date.now()}`,
      url:`http://github.com/repo-created-at-${Date.now()}`,
      techs:[techs[Math.floor(Math.random() * techs.length)],techs[Math.floor(Math.random() * techs.length)]]
    }

    const response = await api.post('repositories',data);
    const repository = response.data;
    setRepositories([...repositories,repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if(parseInt(response.status) === 204){
      const newRepo = repositories.filter(repository=> repository.id!= id);
      setRepositories(newRepo);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
           <li key={repository.id}>
           {repository.title}
           <button onClick={() => handleRemoveRepository(repository.id)}>
             Remover
           </button>
         </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
