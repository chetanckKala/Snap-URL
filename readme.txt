basic setup
{
    set up react-vite app
    configure shadcn
    configure supabase
    make tables on supabase

    routing using react router dom
    designing components header, landing page...
}

authentication
{
    design login 
    react spinner -> loading animations
    yup npm package -> form input validators
    communicate with supabase 
    useFatch custom hook for data retrivel
    for valid user -> redirect to dashboard by saving user data

    design signup 
    react spinner -> loading animations
    yup npm package -> form input validators
    communicate with supabase, profile pic storage
    for valid user -> redirect to dashboard by saving user data

    protected routes -> routes can only be accessed after login, until redirect to /auth

    ## ui tip
    user logged in -> redirect to home whenever go to auth
    user logged out -> redirect to auth from protected routes
}

dashboard
{
    add dummy data
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> fe91a9afb2b9b1b2c32a14efb2c1a8ae9f8f5156
    url api -> communicate with supabase url
    click api -> communicate with supabase click
    make dashboard ui ->
    {
        url/clicks count
        search query
        link card
        create link -> dialog box -> ui, form logic, api call
    }
<<<<<<< HEAD
}

redirect logic 
{
    get original_url from db
    store clicks info (UA Parser)
    redirect 
}

link stat page
{
    get url by short url
    get clicks data
    build ui
    {
        link details
        locations stats
        device stats
    }
=======
>>>>>>> f3ba86e (added create url feature)
>>>>>>> fe91a9afb2b9b1b2c32a14efb2c1a8ae9f8f5156
}