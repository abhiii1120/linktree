import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useHome } from '../hooks/useHome';
import LinksList from '../ui/components/LinkList';

const Home = () => {

    const {username} = useParams();
    const {fetchLinks,error,links,loading,handleLinkClick} = useHome();

    useEffect(() => {
      fetchLinks({username})
    },[username])

  return (
     <div className="p-6">
      <LinksList links={links} loading={loading} onLinkClick={handleLinkClick} />
    </div>
  )
}

export default Home