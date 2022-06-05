import React, { useEffect, useState } from 'react';
import {  Link} from 'react-router-dom';

import  {Amplify, API, graphqlOperation, Hub } from 'aws-amplify'
import { createAlinda } from '../graphql/mutations'
import { listAlindas } from '../graphql/queries'

import awsExports from "../aws-exports";


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

const initialState = { T_PK: '', T_SK: '', userName: '', userEmail: '', isAdmin: false, email_verified: '' }
//This is so I can update the user from the event to the database without waiting for a state change
let userVar = initialState



const Navbar = () => {


	const [user, setUser] = useState(null);

	//not to user here
	const [alindasUsers, setAlindas] = useState([])	
	  async function fetchAlindas() {
		try {
		  const alindaData = await API.graphql(graphqlOperation(listAlindas))
		  const alindas = alindaData.data.listAlindas.items
		  setAlindas(alindas)
		} catch (err) { console.log('error fetching alindas') }
	  }
	
	
	  async function updateUserDB() {
		try {

			alert("addAlinda: " + JSON.stringify(userVar))

		if(userVar && userVar.T_PK && userVar.T_SK) {
	
		  await API.graphql(graphqlOperation(createAlinda, {input: userVar}))
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

			if(data){
			  var cognitoObj = JSON.parse( JSON.stringify(data));
				//console.log("The Cog jwtToken: " + cognitoObj.signInUserSession.accessToken.jwtToken);
				
			  userVar.T_PK = "USER";
			  if(cognitoObj.username){
		
				userVar.T_SK = "USER#" + cognitoObj.username;
				userVar.userName = cognitoObj.username;
		
			  }
			  	

				const grpArray =  [] || cognitoObj.signInUserSession.accessToken.payload["cognito:groups"];
			  	const adminGroup = grpArray ? grpArray.filter(x => x === 'Admins') : []

			  if(adminGroup.length > 0){
				userVar.isAdmin = true;
			  } 
			

			  if(cognitoObj.attributes.email){
				userVar.userEmail = cognitoObj.attributes.email;
		
			  }
			  if(cognitoObj.attributes.email_verified){
				userVar.email_verified = cognitoObj.attributes.email_verified;
		
			  }

			  //if get alinda doesn't exist add, otherwise update
			  setUser(userVar);
			   updateUserDB();
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
		<span style={{marginRight: "5px"}}>Welcome <b>{user ? user.userEmail + " - " + user.userName: null}</b></span>

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