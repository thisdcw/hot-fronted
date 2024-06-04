import Welcome from '../pages/WelcomePage.vue'
import User from '../pages/UserPage.vue'
import Apartment from '../pages/ApartmentPage.vue'

const routes = [
    {path: '/', component: Welcome},
    {path: '/hot/user', component: User},
    {path: '/hot/apartment', component: Apartment},
]

export default routes;