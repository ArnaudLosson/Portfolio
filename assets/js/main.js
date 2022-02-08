// Homepage Component
const Home = {
    template: `

    <main id='home'>
        <div class="about__me">
            <img src="./assets/img/avatar.jpeg" width="150px" alt="user avatar">
            <h1>Arnaud Losson</h1>
            <h3>Junior Web Dev</h3>
            <br>
            <div class="skills_projects_link">
                <router-link to="/projects"> Projects / Skills </router-link>
                <br>
                <br>
                <router-link to="/contact">Contact:</router-link>
                <br>
                <a :href="linkedInLink" target="_blank">LinkedIn
                    <i class="fab fa-linkedin fa-lg fa-fw"></i>
                </a> 
                ||
                <a :href="gitHubLink" target="_blank">GitHub
                    <i class="fab fa-github fa-lg fa-fw"></i>
                </a>
            </div>
        </div>
    </main>
    `,
    data() {
        return {
            gitHubLink: 'https://github.com/ArnaudLosson',
            linkedInLink: 'https://www.linkedin.com/in/arnaud-losson/'
        }
    }
}
const Projects = {
    template: `
    <div>
        
        <header id="site_header" class="container d_flex">
            <div class="bio__media">
                <img src="./assets/img/avatar.jpeg" alt="user avatar">
                <div class="bio__media__text">
                    <h1>Arnaud Losson</h1>
                    <h3>Junior Web Dev</h3>
                    <a :href="linkedInLink" target="_blank">LinkedIn
                    <i class="fab fa-linkedin fa-lg fa-fw"></i>
                </a> 
                ||
                <a :href="gitHubLink" target="_blank">GitHub
                    <i class="fab fa-github fa-lg fa-fw"></i>
                </a>
                </div>
            </div> 
            <nav>
                <router-link to="/" class="p_2">Home</router-link>
                <router-link to="/projects" class="p_2">Projects</router-link>
                <router-link to="/contact" class="p_2">Contact</router-link>
                <a :href="gitHubLink" target="_blank">
                    <i class="fab fa-github fa-lg fa-fw"></i>
                </a>
            </nav>
        </header>
        
        <main class="container">
        
            <!-- Show an error message if the REST API doesn't work -->
            <div class="error" v-if="errors">
                Sorry! It seems we can't fetch data righ now 
            </div>
            <!-- Otherwise show a section for our portfolio projects and skills section-->
            <section id="portfolio" v-else>
                <!-- loading message -->
                <div class="loading" v-if="loading">
                    Loading ...
                </div>
                
                <!-- show the projects -->
                <div class="projects" v-else>
                
                    <div v-for="project in projectsList" class="card__custom" >
                        <div class="card__custom__text"> 
                            <div> 
                                <h3>{{trimTitle(project.name)}}</h3>
                                <p>{{trimText(project.description)}}</p>
                            </div>

                            <div class="meta__data d_flex">
                                <div class="date">
                                    <h5>Update at</h5>
                                    <div> {{ new Date(project.updated_at).toDateString()}}</div>
                                </div>
                                <img class="avatar" :src="project.owner.avatar_url">
                            </div>
                        </div>
                        

                        <div class="card__custom__img"></div>
                        <div class="card_custom__button">
                            <a :href="project.html_url" target="_blank">
                                Code
                            </a>
                        </div>
                    
                    </div>

                    <div v-if="!loading" style="text-align:center; width: 100%" >
                        <div v-if="projectsList.length < projects.length"> 
                            <button class="btn_load_more" v-on:click="loadMore()">Load More</button>
                        </div>
                        <div v-else>
                            <a :href="gitHubLink" target="_blank">Visit My GitHub</a>
                        </div>

                    </div>
                    
                    <div id="skills_section">
                        <h2>Development Skills</h2>
                        <ul class="skills"> 
                            <li v-for="skill in skills">{{skill}}</li>
                        </ul>
                    </div>

                </div>

                

            </section>
        
        </main>

    </div>
    `,
    data() { 
        return {
            projects: [],
            projectsList: null,
            skills: [],
            projectsCount: 5,
            perPage: 20,
            page: 1,
            loading : true,
            errors: false,
            gitHubLink: 'https://github.com/ArnaudLosson',
            linkedInLink: 'https://www.linkedin.com/in/arnaud-losson/'
            }
    },
    methods:{
        fetchData: function () {
            axios.get(`https://api.github.com/users/ArnaudLosson/repos?per_page=${this.perPage}&page=${this.page}`)
                .then(response => { 
                    console.log(response);
                    this.projects = response.data;
                    this.projects.forEach( project => {
                        if(project.language !== null && !this.skills.includes(project.language)) {
                            this.skills.push(project.language)
                        }
                    })

                })
                .catch(error => { 
                    console.log(error);
                    this.errors = true;
            }).finally( ()=> {
                this.loading = false;
                this.getProjects();
            })
        }, 
        getProjects(){
            this.projectsList = this.projects.slice(0, this.projectsCount);
            return this.projectsList;
        },
        loadMore(){
            if(this.projectsList.length <= this.projects.length ) {
                this.projectsCount += 5;
                this.getProjects();
                // this.projectsList = this.projects.slice(0, this.projectsCount);
            }
        },
        trimTitle(text){
            const title = text.replaceAll("-", " ").replaceAll("_", " ");
            if(title.length > 15) {
                return title.slice(0, 12) + ' ...';
            } 
            return title
        },
        trimText(text){
            
            if(text === null) {
                return 'This project has no description yet!'
            } else if(text.length > 100) {
                 return text.slice(0, 100) + ' ...'
            } 
            return text;
        }
    },
    mounted(){
      //this.fetchData();  
      setTimeout(this.fetchData, 2000);
    }
}
const Contact = {
    
    template: `
        <div>

            <header id="site_header" class="container d_flex">
            <div class="bio__media">
                <img src="./assets/img/avatar.jpeg" alt="user avatar">
                <div class="bio__media__text">
                    <h1>Arnaud Losson</h1>
                    <h3>Junior Web Dev</h3>
                    <a :href="linkedInLink" target="_blank">LinkedIn
                    <i class="fab fa-linkedin fa-lg fa-fw"></i>
                </a> 
                ||
                <a :href="gitHubLink" target="_blank">GitHub
                    <i class="fab fa-github fa-lg fa-fw"></i>
                </a>
                </div>
            </div> 
            <nav>
                <router-link to="/" class="p_2">Home</router-link>
                <router-link to="/projects" class="p_2">Projects</router-link>
                <router-link to="/contact" class="p_2">Contact</router-link>
                <a :href="gitHubLink" target="_blank">
                    <i class="fab fa-github fa-lg fa-fw"></i>
                </a>
            </nav>
            </header>
            <main class="container">
                <form @submit.prevent="sendEmail">
                    <label>Name</label>
                    <input
                    type="text"
                    v-model="name"
                    name="name"
                    placeholder="Your Name"
                    >
                    <label>Email</label>
                    <input
                    type="email"
                    v-model="email"
                    name="email"
                    placeholder="Your Email"
                    >
                    <label>Message</labeL>
                    <textarea
                    name="message"
                    v-model="message"
                    cols="60" rows="5"
                    placeholder="Message">
                    </textarea>

                    <input type="submit" value="Send">
                </form>
            </main>
        </div>
    `,
    data () {
        return {
            name:"",
            email:"",
            message:"",
            gitHubLink: 'https://github.com/ArnaudLosson',
            linkedInLink: 'https://www.linkedin.com/in/arnaud-losson/'
        }
    },
    methods: {
        sendEmail(e) {
            try {
                emailjs.sendForm('service_7t0pcdn', 'template_0bx8nho', e.target,'user_8uzRHWLCaiyIRZoOJrGtX', {
                    name: this.name,
                    email: this.email,
                    message: this.message
                })
            } catch (error) {
                console.log({error});
            }
            this.name = ''
            this.email = ''
            this.message = ''
        },
    }
}
// Define routes

const routes = [
    {path: '/', component: Home},
    {path: '/projects', component: Projects},
    {path: '/contact', component: Contact},
];


// create the router instance
const router = new VueRouter({
    routes
})

// create and mount the vue instance

const app = new Vue({
    router
}).$mount('#app')