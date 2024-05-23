'use server'

import { redirect } from 'next/navigation'

export default async function handleSignOut() {
    console.log('handleSignOut');
    const clientId = process.env.COGNITO_CLIENT_ID;
    const domain = process.env.COGNITO_DOMAIN;
    const logoutUri = process.env.COGNITO_LOGOUT_URI;
    redirect(`${domain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`);
}