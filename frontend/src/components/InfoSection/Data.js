import img1 from '../../images/svg.svg'
import img2 from '../../images/svg-2.svg'
import img3 from '../../images/svg-3.svg'

export const homeObjOne = {
    id: 'about',
    lightBg: false,
    lightText: true,
    lightTextDesc: true, 
    topLine: 'Change your life.',
    headline: 'CVArt More like a personal career expert.',
    description: 'Your CV is underwhelming and you deserve better. Get that fresh look with our CV templates. Click on ready-to-use expert suggestions to build your CV in minutes.',
    buttonLabel: 'Start Now',
    imgStart: false,
    img: img1,
    alt: 'Error!',
    dark: true,
    primary: true,
    darkText: false,
    to: '/signin'
}

export const homeObjTwo = {
    id: 'discover',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Unlimited Access',
    headline: 'Free resume & CV resources and support',
    description: 'Check out our free CV guides, resources, and blog to make the most of your job search, and reach out to our all-star support team for answers to all of your burning CV questions.',
    buttonLabel: 'Get Started',
    imgStart: true,
    img: img2,
    alt: 'Error!',
    dark: false,
    primary: false,
    darkText: true,
    to: '/signin'
}

export const homeObjThree = {
    id: 'signup',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'See for yourself',
    headline: 'CVArt Builder',
    description: "Don’t let opportunities pass you by. You’ll be skeptical at first. Just like millions of users who landed their dream jobs with help from our CV editor.",
    buttonLabel: 'Sign up',
    imgStart: false,
    img: img3,
    alt: 'Error!',
    dark: false,
    primary: false,
    darkText: true,
    to: '/signup'
}