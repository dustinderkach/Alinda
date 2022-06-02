import React, { useEffect, useState } from 'react';
import {  Link} from 'react-router-dom';
import {Auth, Hub} from 'aws-amplify'


import awsExports from "../../aws-exports";
import { Authenticator } from '@aws-amplify/ui-react';
import {Amplify} from 'aws-amplify'


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

const initialState = { Username: '', phone_number: '', email: '', userEmail: '' }

const Navbar = () => {



	const [user, setUser] = useState(null);
	const [userGroups, setUserGroups] = useState(null);


	useEffect(() => {
		Hub.listen("auth", ({ payload: { event, data } }) => {
		  switch (event) {
			case "signIn":
			  getUser().then((userData) => setUser(userData));
			  break;
			case "signOut":
			  setUser(null);
			  setUserGroups(null);
			  break;
			case "signIn_failure":
			  console.log("Sign in failure", data);
			  break;
		  }
		});

		getUser().then((userData) => {
			setUser(userData);
			if (userData) {
			  setUserGroups(
				userData.signInUserSession.accessToken.payload["cognito:groups"]
			  );
			} else {
			  setUserGroups(null);
			}
		  });
		}, []);
	  
		function getUser() {
		  return Auth.currentAuthenticatedUser()
			.then((userData) => userData)
			.catch(() => console.log("Not signed in"));
		}





	// useEffect(() => {
	// 	authListener();
	// }, [])
	// let loginLogOut = "cha"

	// if(true){
	// 	loginLogOut = <Link to='/logout' style={{ float: 'right' }} >NoName Logout</Link>
	// } else {
	// 	loginLogOut = <Link to='/login' style={{float:'right'}} >Login</Link>
	// }


	// Hub.listen('auth', (data) => {
	// 	switch (data.payload.event) {
	// 	  case 'signIn':
	// 		  alert('user signed in');
	// 		  break;
	// 	  case 'signUp':
	// 		alert('user signed up');
	// 		  break;
	// 	  case 'signOut':
	// 		alert('user signed out');
	// 		  break;
	// 	  case 'signIn_failure':
	// 		alert('user sign in failed');
	// 		  break;
	// 	  case 'configured':
	// 		alert('the Auth module is configured');
	// 	}
	//   });



	// onAuthEvent(payload) {
    //     // ... your implementation
	// 	alert("cha: " + JSON.stringify( payload.data))
    // }



	// async function signOut() {
	// 	try {
	// 		await Auth.signOut();
	// 	} catch (error) {
	// 		console.log('error signing out: ', error);
	// 	}
	// }

	// async function authListener() {

	// 	Hub.listen("auth", (data) => {


	// 		switch(data.payload.event){
	// 			case "signIn":
	// 				alert("signIn")
	// 				alert('A new auth event has happened: ', data.payload.data.username + ' has ' + data.payload.event);
	// 				return setSignedUser(true)
	// 			case "signOut":
	// 				alert("signOut")
	// 				alert('A new auth event has happened: ', data.payload.data.username + ' has ' + data.payload.event);
	// 				return setSignedUser(false)
	// 			default:
           
	// 				alert('A new auth event has happened: ', data.payload.data.username + ' has ' + data.payload.event);
	// 				return undefined

	// 		}
	// 	})

	// 	try{
	// 		const authCogUser = await Auth.currentAuthenticatedUser()
			
	// 		alert("cha: " + JSON.stringify(authCogUser))
	// 		console.log("Auth.currentAuthenticatedUser: " + JSON.stringify(authCogUser))
	// 		setSignedUser(true)
			
	// 	}catch (err) {}
	// }




	
return(



      <div className='navbar'>
        {user ? (
          <>
            <span style={{marginRight: "5px"}}>Welcome <b>{user ? user.attributes.email + " - " + user.username: null}</b></span>
            {userGroups &&
            userGroups.filter((f) => f.indexOf("Admins") > -1).length >
              0 ? (
				<Link to='/about'> About</Link>
            ) : null}
            <Link to='events'> events</Link>
            <button onClick={() => Auth.signOut()}>Sign Out</button>
          </>
        ) : (
          <>
 		<Link to='/about'> About</Link>
		<Link to='events'> events</Link>
		<Link to='/team'> team</Link>
		<Link to='/annual'> annual</Link>
		<Link to='/blogs'> blogs</Link>
		<Link to='/sign-up'> signed-In</Link>
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