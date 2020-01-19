import React, {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

const query = gql`
  query queryPets {
      pets {
        id
        name
        type
        img
      }
    }
`;

const mutation = gql`
  mutation addNewPet($name: String!, $type: PetType!) {
    addPet(input: {name: $name, type: $type}) {
      id
      name
      type
      img
    }
  }
`;

export default function Pets () {
  const [modal, setModal] = useState(false)
  const {loading, error, data} = useQuery(query)
  const [addNewPet, { NewPetData}] = useMutation(mutation);

  const onSubmit = input => {
    setModal(false);
    addNewPet({variables: {type: input.type, name: input.name}});
  };
  
  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  if (loading || error) {
    return <Loader />
  }

  if (data) {
    const { pets } = data;
    console.log(pets);
    return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={pets}/>
      </section>
    </div>
  )}
}
