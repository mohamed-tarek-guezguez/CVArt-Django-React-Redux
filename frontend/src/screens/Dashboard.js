import React, {useState, useEffect} from 'react'
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Personal from '../components/DashboardComponents/Personal';
import SocialMedia from '../components/DashboardComponents/SocialMedia';
import About from '../components/DashboardComponents/About';
import Skills from '../components/DashboardComponents/Skills';
import Education from '../components/DashboardComponents/Education';
import Experience from '../components/DashboardComponents/Experience';
import Languages from '../components/DashboardComponents/Languages';

const Dashboard = ({ history, match }) => {

    const [item, setItem] = useState(match.params.str)

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {        
        if (!userInfo) {
            history.push('/signin')
        }
    }, [history, userInfo])

    return (
        <>       
            <div
                style={{ display: 'flex', height: '100vh', overflow: 'scroll initial', width: '100wh'}}
            >
                <CDBSidebar textColor="#fff" backgroundColor="#333">
                    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                        <Link
                            to="/"
                            className="text-decoration-none"
                            style={{ color: 'inherit' }}
                        >
                            CVArt
                        </Link>
                    </CDBSidebarHeader>

                    <CDBSidebarContent className="sidebar-content">
                        <CDBSidebarMenu>
                            <NavLink exact to="/templates" activeClassName="activeClicked" >
                                <CDBSidebarMenuItem icon="home" className="sidebarItems">Home</CDBSidebarMenuItem>
                            </NavLink>

                            <NavLink exact to="/dashboard/personal" activeClassName="activeClicked" onClick={() => setItem('personal')}>
                                <CDBSidebarMenuItem icon="address-book" className="sidebarItems">Personal</CDBSidebarMenuItem>
                            </NavLink>

                            <NavLink exact to="/dashboard/social-media" activeClassName="activeClicked" onClick={() => setItem('social-media')}>
                                <CDBSidebarMenuItem icon="globe" className="sidebarItems">Social Media</CDBSidebarMenuItem>
                            </NavLink>
                            
                            <NavLink exact to="/dashboard/about" activeClassName="activeClicked" onClick={() => setItem('about')}>
                                <CDBSidebarMenuItem icon="user" className="sidebarItems">About</CDBSidebarMenuItem>
                            </NavLink>
                            
                            <NavLink exact to="/dashboard/skills" activeClassName="activeClicked" onClick={() => setItem('skills')}>
                                <CDBSidebarMenuItem icon="cubes" className="sidebarItems">Skills</CDBSidebarMenuItem>
                            </NavLink>
                            
                            <NavLink exact to="/dashboard/education" activeClassName="activeClicked" onClick={() => setItem('education')}>
                                <CDBSidebarMenuItem icon="graduation-cap" className="sidebarItems">Education</CDBSidebarMenuItem>
                            </NavLink>
                            
                            <NavLink exact to="/dashboard/experience" activeClassName="activeClicked" onClick={() => setItem('experience')}>
                                <CDBSidebarMenuItem icon="briefcase" className="sidebarItems">Experience</CDBSidebarMenuItem>
                            </NavLink>
                            
                            <NavLink exact to="/dashboard/languages" activeClassName="activeClicked" onClick={() => setItem('languages')}>
                                <CDBSidebarMenuItem icon="language" className="sidebarItems">Languages</CDBSidebarMenuItem>
                            </NavLink>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>

                    <CDBSidebarFooter>
                        <NavLink exact to="/profile" activeClassName="activeClicked" className="text-decoration-none">
                            <CDBSidebarMenuItem icon="user-circle" className="sidebarItems text-decoration-none text-white">Profile</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarFooter>
                </CDBSidebar>
                <div className="w-100">
                    <div className='d-flex align-items-center justify-content-center h-100'>
                        {(() => {
                            switch (item) {
                                case 'personal':
                                    return <Personal />
                                case 'social-media':
                                    return  <SocialMedia />
                                case 'about':
                                    return <About />
                                case 'skills':
                                    return <Skills />
                                case 'education':
                                    return <Education />
                                case 'experience':
                                    return <Experience />
                                case 'languages':
                                    return <Languages />
                                default:
                                    return <Personal />
                            }
                        })()}
                    </div>
                </div>
            </div>                   
        </>
    )
}

export default Dashboard