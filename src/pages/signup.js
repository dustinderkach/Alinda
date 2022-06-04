
/* src/App.js */
import React, { useEffect, useState } from 'react'
import  {Amplify, API, graphqlOperation } from 'aws-amplify'
import { createAlinda } from '../graphql/mutations'
import { listAlindas } from '../graphql/queries'
import {  Link} from 'react-router-dom';

import awsExports from "../aws-exports";
import {Auth, Hub} from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css';


import '../App.css';

import { Authenticator } from '@aws-amplify/ui-react';


Amplify.configure(awsExports);



//https://aws.amazon.com/blogs/mobile/amplify-uis-new-authenticator-component-makes-it-easy-to-add-customizable-login-pages-to-your-react-angular-or-vue-app/

const initialState = { T_PK: '', T_SK: '', userName: '', userEmail: '' }




const SignUp = () => {
  const [formState, setFormState] = useState(initialState)
  const [alindas, setAlindas] = useState([])



	async function signOut() {
		try {
			await Auth.signOut();
		} catch (error) {
			console.log('error signing out: ', error);
		}
	}

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchAlindas() {
    try {
      const alindaData = await API.graphql(graphqlOperation(listAlindas))
      const alindas = alindaData.data.listAlindas.items
      setAlindas(alindas)
    } catch (err) { console.log('error fetching alindas') }
  }


  async function addAlinda() {
    try {
      if (!formState.T_PK || !formState.T_SK) return

      setInput('userName', formState.T_SK)
      formState.userName = formState.T_SK;
      const alinda = { ...formState }
      setAlindas([...alindas, alinda])
      setFormState(initialState)

      alert(JSON.stringify(alinda));

      await API.graphql(graphqlOperation(createAlinda, {input: alinda}))
    } catch (err) {
      console.log('error creating alinda:', err)
    }
  }




  return (
    <Authenticator>
    {({ signOut, user }) => (
    <div style={styles.container}>
      <h2>Amplify Alindas</h2>
      <button onClick={signOut}>signOut</button><br/>

      {/* <input
        onChange={event => setInput('T_PK', event.target.value)}
        style={styles.input}
        value={formState.T_PK}
        placeholder="T_PK"
      />
      <input
        onChange={event => setInput('T_SK', event.target.value)}
        style={styles.input}
        value={formState.T_SK}
        placeholder="T_SK"
      />
     <input
        onChange={event => setInput('userEmail', event.target.value)}
        style={styles.input}
        value={formState.userEmail}
        placeholder="userEmail"
      /> */}
      <button style={styles.button} onClick={addAlinda}>Create Alinda</button>
      {
        alindas.map((alinda, index) => (
          <div key={alinda.T_SK ? alinda.T_SK : index} style={styles.todo}>
            <p style={styles.todoName}>{alinda.T_PK}</p>
            <p style={styles.todoDescription}>{alinda.T_SK}</p>
          </div>
        ))
      }
    </div>
	)}
	</Authenticator>
);
  
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}
export default SignUp;
