import React, { useEffect, useState } from 'react';
import {  Link} from 'react-router-dom';

import  {Amplify, API, graphqlOperation, Hub } from 'aws-amplify'
import { createAlinda } from '../graphql/mutations'
import { listAlindas } from '../graphql/queries'

import awsExports from "../aws-exports";
import { Authenticator } from '@aws-amplify/ui-react';



// https://www.sufle.io/blog/aws-amplify-authentication-part-2

Amplify.configure(awsExports);
// import {
// Nav,
// NavLink,
// Bars,
// NavMenu,
// NavBtn,
// NavBtnLink,
// } from './NavbarElements';

const initialState = { T_PK: '', T_SK: '', userName: '', userEmail: '',  isAdmin: false }
let alinda = { T_PK: '', T_SK: '', userName: '', userEmail: '',  isAdmin: false }
let isAdmin = false;
let userName = "";
let userEmail = "";


const Navbar = () => {


	const [user, setUser] = useState(null);
	const [userState, setFormState] = useState(initialState)
	const [alindas, setAlindas] = useState([])


	function setInput(key, value) {
		setFormState({ ...userState, [key]: value })
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
		 // if (!userState.T_PK || !userState.T_SK) return
	if(alinda && alinda.T_PK && alinda.T_SK) {
		//   setInput('userName', userState.T_SK)
		//   userState.userName = userState.T_SK;
		 // const alinda = { ...userState }
		  alert("stri: " + JSON.stringify(alinda));
		//   setAlindas([...alindas, alinda])
		//   setFormState(initialState)
	
		//   alert(JSON.stringify(alinda));
	
		  await API.graphql(graphqlOperation(createAlinda, {input: alinda}))
	}
		} catch (err) {
		  console.log('error creating alinda:', err)
		}
	  }

	//   {
    //     alindas.map((alinda, index) => (
    //       <div key={alinda.T_SK ? alinda.T_SK : index} style={styles.todo}>
    //         <p style={styles.todoName}>{alinda.T_PK}</p>
    //         <p style={styles.todoDescription}>{alinda.T_SK}</p>
    //       </div>
    //     ))
    //   }
	

  
	useEffect(() => {
	  const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
		switch (event) {
		  case "signIn":
			setUser(data);

			if(data){
			  var cognitoObj = JSON.parse( JSON.stringify(data));


			  setInput('T_PK', "USER");
			  alinda.T_PK = "USER";

			  if(cognitoObj.username){
				userName = cognitoObj.username;
				setInput('T_SK', "USER#" + cognitoObj.username);
				setInput('userName', "USER#" + cognitoObj.username);
				
				alinda.T_SK = "USER#" + cognitoObj.username;
				alinda.userName = userName;
				  alert("alinda.T_SK: " + alinda.T_SK)
			  }



			  if(cognitoObj.signInUserSession.accessToken.payload["cognito:groups"].filter(x => x === 'Admins')){
				isAdmin = true;
				setInput('isAdmin', true);
				alinda.isAdmin = true;
				alert("NAV: is admin: " + isAdmin)
			  }


			  //const groups = cognitoObj.signInUserSession.accessToken.payload["cognito:groups"];

			  if(cognitoObj.attributes.email){
				userEmail = cognitoObj.attributes.email;
				setInput('userEmail', cognitoObj.attributes.email);
				alinda.userEmail = userEmail;
				  alert("userEmail: " + userEmail)
			  }


			  //if get alinda doesn't exist add, otherwise update

			   addAlinda();
			  alert("after add alinda");
			 
			}

			break;
		  case "signOut":
			setUser(null);
;
			break;
		  case "customOAuthState":
			
		}
	  });
  
	//   Auth.currentAuthenticatedUser()
	// 	.then(currentUser => setUser(currentUser))
	// 	.catch(() => console.log("Not signed in"));

	  return unsubscribe;
	}, []);





	
return(



      <div className='navbar'>
        {user ? (
          <>

            <Link to='events'> events</Link>
			<Link to='/about'> About</Link>
		<Link to='events'> events</Link>
		<Link to='/team'> team</Link>
		<Link to='/annual'> annual</Link>
		<Link to='/blogs'> blogs</Link>
		<Link to='/sign-up'> Log-Out</Link>
		<span style={{marginRight: "5px"}}>Welcome <b>{user ? user.attributes.email + " - " + user.username: null}</b></span>

          </>
        ) : (
          <>
 		<Link to='/about'> About</Link>
		<Link to='events'> events</Link>
		<Link to='/team'> team</Link>
		<Link to='/annual'> annual</Link>
		<Link to='/blogs'> blogs</Link>
		<Link to='/sign-up'> Log-In</Link>
          </>
        )}
</div>
  );













		// <div className='navbar'>

		// <Link to='/about'> About</Link>
		// <Link to='events'> events</Link>
		// <Link to='/team'> team</Link>
		// <Link to='/annual'> annual</Link>
		// <Link to='/blogs'> blogs</Link>
		// <Link to='/sign-up'> signed-In</Link>
		
		// </div>



};
export default Navbar;


// <Nav>
// 		<Bars />

// 		<NavMenu>
// 		<NavLink to='/about' activeStyle>
// 			About
// 		</NavLink>
// 		<NavLink to='/events' activeStyle>
// 			Events
// 		</NavLink>
// 		<NavLink to='/annual' activeStyle>
// 			Annual Report
// 		</NavLink>
// 		<NavLink to='/team' activeStyle>
// 			Teams
// 		</NavLink>
// 		<NavLink to='/blogs' activeStyle>
// 			Blogs
// 		</NavLink>
// 		<NavLink to='/sign-up' activeStyle>
// 			Sign Up
// 		</NavLink>
// 		{/* Second Nav */}
// 		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
// 		</NavMenu>
// 		<NavBtn>
// 		<NavBtnLink to='/signin'>Sign In</NavBtnLink>
// 		</NavBtn>
// 	</Nav>