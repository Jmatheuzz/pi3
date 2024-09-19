import React, {useEffect, useState} from 'react';
import { Header, ProfileCard, Post, Suggestion } from '../../components';
import './Home.css';
import {getUserInfo} from "../../services/user-service.js";
import {createFollow, getRecomendedFollow} from "../../services/follow-service.js";

const Home = () => {
  const [userName, setUserName] = useState('Nome de usuario');
  const [userInfo, setUserInfo] = useState('Desenvolvedor Front-end | Bacharel em Ciência da Computação | Empresa XYZ');
  const [aboutMe, setAboutMe] = useState('Aqui você pode escrever algo sobre você.');
  const [recomended, setRecomended] = useState([]);
  const [graus, setGraus] = useState([]);

  const posts = [
    {
      avatar: 'https://via.placeholder.com/40?text=JD',
      name: 'John Doe',
      info: '@johndoe • 5m ago',
      postContent: 'Este é um exemplo de postagem de usuário. Aqui você pode adicionar o conteúdo da postagem.',
    },
    {
      avatar: 'https://via.placeholder.com/40?text=AS',
      name: 'Alice Smith',
      info: '@alicesmith • 10m ago',
      postContent: 'Outro exemplo de postagem. Adicione mais conteúdo aqui.',
    },
  ];
  const createFollowCall = async (userFollowedId) => {
    await createFollow({
      user1: Number(window.localStorage.getItem('id')),
      user2: userFollowedId
    })
    const recomend = [...recomended.filter(user => user.userId !== userFollowedId)]
    console.log(recomend)
    setRecomended(recomend)

  }
  useEffect(() => {
    if (!(window.localStorage.getItem('token') && window.localStorage.getItem('id'))) window.location.href = '/login';
    getUserInfo().then(({data}) => {
      setAboutMe(data.about)
      setUserName(data.username)
      setUserInfo(data.position)
    })
    getRecomendedFollow().then(({data}) => {
      setRecomended(data.recomended)
      setGraus(data.graus)
    })

  }, []);
  return (
    <div className="home">
      <Header />
      <div className="home-container">
        <div className="left-container">
          <ProfileCard
              userName={userName}
              userInfo={userInfo}
          />
        </div>
        <div className="center-container">
          {posts.map((post, index) => (
            <Post key={index} user={post} />
          ))}
          {/* Add postagens aqui */}
        </div>
        <div className="right-container">
          {recomended && <Suggestion suggestions={recomended} graus={graus} createFollowCall={createFollowCall}/>}
        </div>
      </div>
    </div>
  );
};
 
export default Home;