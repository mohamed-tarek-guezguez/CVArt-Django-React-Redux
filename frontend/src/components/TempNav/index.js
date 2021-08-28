import React from 'react'
import { 
    HeaderContainer, 
    HeaderWrap, 
    HeadLogo, 
    Head, 
    HeadWrap, 
    WebsiteRights, 
    HeadLink,
} from './TempNavElements'
import { useDispatch, useSelector } from 'react-redux'
import { NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../../actions/userActions'
import { BiLogIn } from "react-icons/bi";

const TempNav = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <>
            <HeaderContainer>
                <HeaderWrap>
                    <Head>
                        <HeadWrap>
                            <HeadLogo to='/templates'>CVArt</HeadLogo>

                            <WebsiteRights>
                                {
                                    userInfo
                                        ? (
                                            <NavDropdown title={userInfo.name} id='username' alignRight>
                                                {
                                                    userInfo.isAdmin && (
                                                        <LinkContainer to='/admin'>
                                                            <NavDropdown.Item>
                                                                <i className="fa fa-user-circle" aria-hidden="true"></i>
                                                                &nbsp;&nbsp;Admin
                                                            </NavDropdown.Item>
                                                        </LinkContainer>
                                                    )
                                                }

                                                <LinkContainer to='/templates'>
                                                    <NavDropdown.Item>
                                                        <i className="fa fa-home" aria-hidden="true"></i>
                                                        &nbsp;&nbsp;Home
                                                    </NavDropdown.Item>
                                                </LinkContainer>

                                                <LinkContainer to='/profile'>
                                                    <NavDropdown.Item>
                                                        <i className="fa fa-user" aria-hidden="true"></i>
                                                        &nbsp;&nbsp;Profile
                                                    </NavDropdown.Item>
                                                </LinkContainer>

                                                <LinkContainer to={`/cv/${userInfo.first_name}`}>
                                                    <NavDropdown.Item>
                                                        <i className="fa fa-link" aria-hidden="true"></i>
                                                        &nbsp;&nbsp;Your Link
                                                    </NavDropdown.Item>
                                                </LinkContainer>

                                                <LinkContainer to='/dashboard/personal'>
                                                    <NavDropdown.Item>
                                                        <i className="fa fa-sliders" aria-hidden="true"></i>
                                                        &nbsp;&nbsp;Dashboard
                                                    </NavDropdown.Item>
                                                </LinkContainer>

                                                <NavDropdown.Divider />

                                                <NavDropdown.Item onClick={logoutHandler}>
                                                    <BiLogIn />
                                                    &nbsp;&nbsp;Logout
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        )
                                        : (
                                            <HeadLink to='/signin'>
                                                Sign in
                                            </HeadLink>
                                        )
                                }
                            </WebsiteRights>
                        </HeadWrap>                    
                    </Head>
                </HeaderWrap>
            </HeaderContainer>
        </>
    )
}

export default TempNav