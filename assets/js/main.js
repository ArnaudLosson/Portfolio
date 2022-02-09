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
                <router-link to="/contact">Contact</router-link>
                <br>
                <br>
                <a :href="linkedInLink" target="_blank">LinkedIn
                    <i class="fab fa-linkedin fa-lg fa-fw"></i>
                </a> 
                ||
                <a :href="gitHubLink" target="_blank">GitHub
                    <i class="fab fa-github fa-lg fa-fw"></i>
                </a>
                <br>
                <a href="mailto:arnaudlosson3@gmail.com">arnaudlosson3@gmail.com</a>
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
                    required
                    >
                    <label>Email</label>
                    <input
                    type="email"
                    v-model="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    >
                    <label>Message</labeL>
                    <textarea
                    name="message"
                    v-model="message"
                    cols="60" rows="5"
                    placeholder="Message"
                    required>
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
        test(options) {
            let args = options.args || [];
            args.unshift(null);
            if (options.error) {
                options.error.forEach((error) => {
                args[0] = error;
                try {
                    assert.throws(() => validator[options.validator](...args));
                } catch (err) {
                    let warning = format(
                    'validator.%s(%s) passed but should error',
                    options.validator, args.join(', ')
                    );
                    throw new Error(warning);
                }
                });
            }
            if (options.valid) {
                options.valid.forEach((valid) => {
                    args[0] = valid;
                    if (validator[options.validator](...args) !== true) {
                        let warning = format(
                            'validator.%s(%s) failed but should have passed',
                            options.validator, args.join(', ')
                        );
                        throw new Error(warning);
                    }
                });
            }
            if (options.invalid) {
                options.invalid.forEach((invalid) => {
                    args[0] = invalid;
                    if (validator[options.validator](...args) !== false) {
                        let warnings = format(
                            'validator.%s(%s) passed but should have failed',
                            options.validator, args.join(', ')
                        );
                        throw new Error(warning);
                    }
                });
            }
        },
        repeat(str, count) {
            let result ='';
            for (; count; count--) {
                result += str;
            }
            return result;
        },
        // describe('Validators', ) => {
        //     it('should validate email addresses', () => {
        //       test({
        //         validator: 'isEmail',
        //         valid: [
        //           'foo@bar.com',
        //           'x@x.au',
        //           'foo@bar.com.au',
        //           'foo+bar@bar.com',
        //           'hans.m端ller@test.com',
        //           'hans@m端ller.com',
        //           'test|123@m端ller.com',
        //           'test123+ext@gmail.com',
        //           'some.name.midd.leNa.me.and.locality+extension@GoogleMail.com',
        //           '"foobar"@example.com',
        //           '"  foo  m端ller "@example.com',
        //           '"foo\\@bar"@example.com',
        //           `${repeat('a', 64)}@${repeat('a', 63)}.com`,
        //           `${repeat('a', 64)}@${repeat('a', 63)}.com`,
        //           `${repeat('a', 31)}@gmail.com`,
        //           'test@gmail.com',
        //           'test.1@gmail.com',
        //           'test@1337.com',
        //         ],
        //         invalid: [
        //           'invalidemail@',
        //           'invalid.com',
        //           '@invalid.com',
        //           'foo@bar.com.',
        //           'somename@ｇｍａｉｌ.com',
        //           'foo@bar.co.uk.',
        //           'z@co.c',
        //           'ｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌ@gmail.com',
        //           `${repeat('a', 64)}@${repeat('a', 251)}.com`,
        //           `${repeat('a', 65)}@${repeat('a', 250)}.com`,
        //           `${repeat('a', 64)}@${repeat('a', 64)}.com`,
        //           `${repeat('a', 64)}@${repeat('a', 63)}.${repeat('a', 63)}.${repeat('a', 63)}.${repeat('a', 58)}.com`,
        //           'test1@invalid.co m',
        //           'test2@invalid.co m',
        //           'test3@invalid.co m',
        //           'test4@invalid.co m',
        //           'test5@invalid.co m',
        //           'test6@invalid.co m',
        //           'test7@invalid.co m',
        //           'test8@invalid.co m',
        //           'test9@invalid.co m',
        //           'test10@invalid.co m',
        //           'test11@invalid.co m',
        //           'test12@invalid.co　m',
        //           'test13@invalid.co　m',
        //           'multiple..dots@stillinvalid.com',
        //           'test123+invalid! sub_address@gmail.com',
        //           'gmail...ignores...dots...@gmail.com',
        //           'ends.with.dot.@gmail.com',
        //           'multiple..dots@gmail.com',
        //           'wrong()[]",:;<>@@gmail.com',
        //           '"wrong()[]",:;<>@@gmail.com',
        //           'username@domain.com�',
        //           'username@domain.com©',
        //         ],
        //       });
        //     });
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